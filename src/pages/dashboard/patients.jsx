import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPatients, deletePatient, toggleIsEdit, fetchAllCategory } from "@/features";
import { PatientFormDialog } from "@/widgets/forms";

export function Patients() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { data } = useSelector((state) => state.patient);

  const handleOpen = (id = null) => {
    setOpen(true);
    setSelectedPatientId(id);
    dispatch(toggleIsEdit());
  };

  useEffect(() => {
    dispatch(fetchAllPatients());
    dispatch(fetchAllCategory());
  }, [dispatch]);


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Patients Table
          </Typography>
          <Button
            className="flex items-center justify-center shadow-2xl shadow-white text-white font-bold py-2 px-4 rounded"
            onClick={() => handleOpen()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">ID</Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">Name</Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">Age</Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">Gender</Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">MR-No</Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">Refer Doctor</Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">Actions</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, name, age, gender,mr_no, refer_doctor }) => (
                <tr key={id}>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">{id}</Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">{name}</Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">{age}</Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">{gender}</Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">{mr_no}</Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">{refer_doctor}</Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Button
                      className="text-xs font-semibold text-blue-gray-600 me-2 bg-transparent"
                      onClick={() => handleOpen(id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="text-xs font-semibold text-blue-gray-600 bg-transparent"
                      onClick={() => dispatch(deletePatient(id)).then(()=>{
                        dispatch(fetchAllPatients());
                      })}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <PatientFormDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedPatientId(null);
        }}
        resetForm={true}
        id={selectedPatientId}
      />
    </div>
  );
}

export default Patients;