import { Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button, Typography, Select } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { addPatient, fetchAllPatients, editPatient, fetchPatientById } from "@/features";
import { useEffect, useState } from "react";

export function PatientFormDialog({ open, onClose, resetForm, id }) {
  const dispatch = useDispatch();
  const { isEdit } = useSelector((state) => state.patient);
  const { categories } = useSelector((state) => state.category);

  const [isSuccess, setIsSuccess] = useState(false);

  const schema = yup.object().shape({
    age: yup.number().required(),
    name: yup.string().required(),
    gender: yup.string().required(),
    refer_doctor: yup.string().required(),
    mr_no :yup.string().required()
  });

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    if (id) {
      dispatch(editPatient({ patient: data, id }))
        .then(() => setIsSuccess(true));
    } else {
      dispatch(addPatient(data))
        .then(() => setIsSuccess(true));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (resetForm) {
        reset({
          age: '',
          name: '',
          gender: '',
          refer_doctor: '',
          mr_no: ''
        });
      }
      onClose();
      dispatch(fetchAllPatients());
      setIsSuccess(false);
    }
  }, [isSuccess, onClose, dispatch, resetForm, reset]);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchPatientById(id)).then((fetchedData) => {
        reset(fetchedData.payload);
      }).catch((error) => {
        console.error("Error fetching patient data:", error);
      });
    }
  }, [id, isEdit, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>
        <Typography variant="h4" color="blue-gray">
          {id ? "Edit Patient" : "Add Patient"}
        </Typography>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody>
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
            Age
          </Typography>
          <Input 
            name="age" 
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            size="lg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("age")}
          />
          {errors.age && <Typography variant="small" color="red" className="-mb-3 font-medium">{errors.age.message}</Typography>}

          <Typography variant="small" color="blue-gray" className="my-2 font-medium">
            Gender
          </Typography>
          <select 
            name="gender" 
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded-lg base-layer-input"
            {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && 
            <Typography variant="small" color="red" className="-mb-3 font-medium">
              {errors.gender.message}
            </Typography>
          }

          <Typography variant="small" color="blue-gray" className="my-2 font-medium">
            Referred To
          </Typography>
          <select
            name="refer_doctor"
            className="border-t-blue-gray-200 focus:border-t-gray-900 p-2 rounded-lg base-layer-input"
            {...register("refer_doctor")}
          >
            <option value="">Select a doctor</option>
            {categories.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
          {errors.refer_doctor && 
            <Typography variant="small" color="red" className="-mb-3 font-medium">
              {errors.refer_doctor.message}
            </Typography>
          }

          <Typography variant="small" color="blue-gray" className="my-2 font-medium">
            MR-NO
          </Typography>
          <Input 
            name="mr_no" 
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            size="lg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("mr_no")}
          />
          {errors.mr_no && 
            <Typography variant="small" color="red" className="-mb-3 font-medium">
              {errors.mr_no.message}
            </Typography>
          }
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red"
            onClick={() => {
              if (resetForm) {
                reset({
                  age: '',
                  name: '',
                  gender: '',
                  refer_doctor: '',
                  mr_no: ''
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

export default PatientFormDialog;