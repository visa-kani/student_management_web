import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createFaculty } from "../../api/create";
import { listFaculty } from "../../api/list";
import { updateFaculty } from "../../api/update";
import { deleteFaculty } from "../../api/delete";

/* ======================== Thunks ======================== */

// Add Faculty
export const addFaculty = createAsyncThunk(
  "faculty/addFaculty",
  async (params, { rejectWithValue }) => {
    try {
      const response = await createFaculty(params);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

// List Faculty
export const fetchFaculty = createAsyncThunk(
  "faculty/fetchFaculty",
  async (params, { rejectWithValue }) => {
    try {
      const response = await listFaculty(params);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

// Update Faculty
export const editFaculty = createAsyncThunk(
  "faculty/editFaculty",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateFaculty(data, id);
      return { id, data: response };
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Faculty
export const removeFaculty = createAsyncThunk(
  "faculty/removeFaculty",
  async (id, { rejectWithValue }) => {
    try {
      await deleteFaculty(id);
      return id;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

/* ======================== Slice ======================== */

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    faculty: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // List
      .addCase(fetchFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Add
      .addCase(addFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.faculty.push(action.payload);
      })
      .addCase(addFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      })

      // Update
      .addCase(editFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editFaculty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.faculty.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.faculty[index] = { ...state.faculty[index], ...action.payload.data };
        }
      })
      .addCase(editFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Delete
      .addCase(removeFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = state.faculty.filter(f => f.id !== action.payload);
      })
      .addCase(removeFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default facultySlice.reducer;
