import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isEdit: false
};

export const fetchAllPatients = createAsyncThunk(
  "patient/fetchAllPatients",
  async (thunkAPI) => {
    try {
      const response = await axios.get('/patients/list');
      return response.data.Patients;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ error: 'Network error or server is unreachable' });
      }
    }
    
  }
);
export const fetchPatientById = createAsyncThunk(
  "patient/fetchPatientById",
  async (id,thunkAPI) => {
    try {
      const response = await axios.get(`/patients/show/${id}`);
      return response.data.Patients;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ error: 'Network error or server is unreachable' });
      }
    }
    
  }
);

export const addPatient = createAsyncThunk(
  "product/addPatient",
  async (patient, thunkAPI) => {
    try {
      const { name, age, gender, refer_doctor, mr_no } = patient;
      const response = await axios.post(`/patients/create`, {
        name,
        age,
        gender,
        refer_doctor,
        mr_no
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editPatient = createAsyncThunk(
  "product/editPatient",
  async ({ patient, id }, thunkAPI) => { // Destructure the arguments
    try {
      const { name, age, gender, refer_doctor, mr_no } = patient;
      const response = await axios.put(`/patients/update/${id}`, {
        name,
        age,
        gender,
        refer_doctor,
        mr_no
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/patients/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearState: () => initialState,
    toggleIsEdit: (state)=> {
      state.isEdit = !state.isEdit
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPatients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPatients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(fetchAllPatients.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchPatientById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPatientById.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(fetchPatientById.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(addPatient.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addPatient.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addPatient.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(editPatient.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editPatient.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(editPatient.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      let index = state.data.findIndex(({ id }) => id === action.payload.id);
      state.data.splice(index, 1);
    });
  },
});

export const { clearState, toggleIsEdit } = patientSlice.actions;
export default patientSlice.reducer;