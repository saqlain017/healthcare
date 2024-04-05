import { configureStore } from "@reduxjs/toolkit";

import authslice from "@/features/authslice/authslice";
import dashboardslice from "@/features/dashboardslice/dashboardslice";
import patientslice from "@/features/patientsslice/patientslice";
import doctorslice from "@/features/doctorsslice/doctorslice";
import catagreyslice from "@/features/catagreyslice/catagreyslice";

export const store = configureStore({
    reducer: {
        auth : authslice,
        dashboard : dashboardslice,
        patient : patientslice,
        doctor : doctorslice,
        category : catagreyslice
    }
})