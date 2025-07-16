import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStudent } from "../../api/create";
import { getStudentAnalytics, listStudent } from "../../api/list";
import { updateStudent } from "../../api/update";
import { deleteStudent } from "../../api/delete";

/* ======================== Thunks ======================== */

// Add Student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (params, { rejectWithValue }) => {
    try {
      const response = await createStudent(params);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

// List Students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (params, { rejectWithValue }) => {
    try {
      const response = await listStudent(params);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export const editStudent = createAsyncThunk(
  "students/editStudent",
  async ({params, id}, { rejectWithValue }) => {
    try {
      console.log("params--id", params, id);
      const response = await updateStudent(params, id);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Student
export const removeStudent = createAsyncThunk(
  "students/removeStudent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteStudent(id);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

// List Students
export const fetchAnalytics = createAsyncThunk(
  "students/fetchStudents",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getStudentAnalytics(params);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

/* ======================== Slice ======================== */

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // List
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Add
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      })

      // Update
      .addCase(editStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = { ...state.students[index], ...action.payload.data };
        }
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Delete
      .addCase(removeStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s.id !== action.payload);
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default studentSlice.reducer;
