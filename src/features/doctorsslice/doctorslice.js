import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isEdit : false
};

export const fetchAllDoctors = createAsyncThunk(
  "doctor/fetchAllDoctors",
  async (thunkAPI) => {
    try {
      const response = await axios.get('/doctors/list');
      return response.data.Doctors;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ error: 'Network error or server is unreachable' });
      }
    }
    
  }
);

export const fetchDoctorById = createAsyncThunk(
  "doctor/fetchDoctorById",
  async (id,thunkAPI) => {
    try {
      const response = await axios.get(`/doctors/show/${id}`);
      return response.data.Doctors;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ error: 'Network error or server is unreachable' });
      }
    }
    
  }
);

export const addDoctor = createAsyncThunk(
  "doctoraddDoctor",
  async (doctor, thunkAPI) => {
    try {
      const { dc_id, name, email, contact } = doctor;
      const response = await axios.post(`/doctors/create`, {
        name,
        dc_id,
        email,
        contact
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctor/deleteDoctor",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/doctors/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editDoctor = createAsyncThunk(
  "doctor/editDoctor",
  async ({ doctor, id }, thunkAPI) => { // Destructure the arguments
    try {
      const { dc_id, name, email, contact, } = doctor;
      const response = await axios.put(`/doctors/update/${id}`, {
        name,
        dc_id,
        email,
        contact
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    clearState: () => initialState,
    clearSuccess: () => (initialState.isSuccess = false),
    toggleIsEditD: (state)=> {
      state.isEdit = !state.isEdit
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDoctors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllDoctors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(fetchAllDoctors.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(addDoctor.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addDoctor.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addDoctor.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      let index = state.data.findIndex(({ id }) => id === action.payload.id);
      state.data.splice(index, 1);
      state.isSuccess = true;
    });
    builder.addCase(deleteDoctor.rejected, (state) => {
      state.isSuccess = false;
    });
    builder.addCase(editDoctor.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editDoctor.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(editDoctor.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export const { clearState, clearSuccess, toggleIsEditD } = doctorSlice.actions;
export default doctorSlice.reducer;