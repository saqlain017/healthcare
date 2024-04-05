import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isEdit : false
};

export const fetchAllCategory = createAsyncThunk(
  "doctor/fetchAllCategory",
  async (thunkAPI) => {
    try {
      const response = await axios.get('/categories/list');
      return response.data.DoctorsCategory;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ error: 'Network error or server is unreachable' });
      }
    }
    
  }
);

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (id,thunkAPI) => {
    try {
      const response = await axios.get(`/categories/show/${id}`);
      return response.data.DoctorsCategory;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ error: 'Network error or server is unreachable' });
      }
    }
    
  }
);

export const addCategory = createAsyncThunk(
  "product/addCategory",
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

export const deleteCategory = createAsyncThunk(
  "doctor/deleteCategory",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/doctors/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editCategory = createAsyncThunk(
  "product/editCategory",
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

export const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    clearState: () => initialState,
    clearSuccess: () => (initialState.isSuccess = false),
    toggleIsEditC: (state)=> {
      state.isEdit = !state.isEdit
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategory.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      let index = state.categories.findIndex(({ id }) => id === action.payload.id);
      state.categories.splice(index, 1);
      state.isSuccess = true;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.isSuccess = false;
    });
    builder.addCase(editCategory.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editCategory.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(editCategory.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export const { clearState, clearSuccess, toggleIsEditC } = categorySlice.actions;
export default categorySlice.reducer;