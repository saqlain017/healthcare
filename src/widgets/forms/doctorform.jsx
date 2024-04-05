import { Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { addDoctor, fetchAllDoctors, editDoctor, fetchDoctorById } from "@/features";
import { useEffect, useState } from "react";

export function DoctorFormDialog({ open, onClose, resetForm, id }) {
  const dispatch = useDispatch();
  const { isEdit } = useSelector((state) => state.doctor);
  const { categories } = useSelector((state) => state.category);

  const [isSuccess, setIsSuccess] = useState(false);

  const schema = yup.object().shape({
    dc_id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    contact: yup.string().required()
  });

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    if (id) {
      dispatch(editDoctor({ doctor: data, id }))
        .then(() => setIsSuccess(true));
    } else {
      dispatch(addDoctor(data))
        .then(() => setIsSuccess(true));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (resetForm) {
        reset({
          dc_id: '',
          name: '',
          email: '',
          contact: ''
        });
      }
      onClose();
      dispatch(fetchAllDoctors());
      setIsSuccess(false);
    }
  }, [isSuccess, onClose, dispatch, resetForm, reset]);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchDoctorById(id)).then((fetchedData) => {
        reset(fetchedData.payload);
      }).catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
    }
  }, [id, isEdit, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>
        <Typography variant="h4" color="blue-gray">
          {id ? "Edit Doctor" : "Add Doctor"}
        </Typography>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody>
          <Typography variant="small" color="blue-gray" className="my-2 font-medium">
            Doctor ID
          </Typography>
          <select
            name="dc_id"
            className="border-t-blue-gray-200 focus:border-t-gray-900 p-2 rounded-lg base-layer-input"
            {...register("dc_id")}
          >
            <option value="">Select a doctor</option>
            {categories.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
          {errors.dc_id &&
            <Typography variant="small" color="red" className="-mb-3 font-medium">
              {errors.dc_id.message}
            </Typography>
          }

          <Typography variant="small" color="blue-gray" className="my-2 font-medium">
            Name
          </Typography>
          <Input 
            name="name" 
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            size="lg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("name")}
          />
          {errors.name && 
            <Typography variant="small" color="red" className="-mb-3 font-medium">
              {errors.name.message}
            </Typography>
          }

          <Typography variant="small" color="blue-gray" className="my-2 font-medium">
            Email
          </Typography>
          <Input 
            name="email" 
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            size="lg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("email")}
          />
          {errors.email && 
            <Typography variant="small" color="red" className="-mb-3 font-medium">
              {errors.email.message}
            </Typography>
          }

          <Typography variant="small" color="blue-gray" className="my-2 font-medium">
            Contact
          </Typography>
          <Input 
            name="contact" 
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            size="lg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("contact")}
          />
          {errors.contact && 
            <Typography variant="small" color="red" className="-mb-3 font-medium">
              {errors.contact.message}
            </Typography>
          }
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red"
            onClick={() => {
              if (resetForm) {
                reset({
                  dc_id: '',
                  name: '',
                  email: '',
                  contact: ''
                });
              }
              onClose();
              setIsSuccess(false);
            }}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" type="submit">
            <span>Save</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default DoctorFormDialog;
