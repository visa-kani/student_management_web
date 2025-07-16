import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { activityLogs } from "../../api/list";

/* ======================== Thunks ======================== */

// List Faculty
export const fetchActivities = createAsyncThunk(
    "activityLogs/fetchLogs",
    async (params, { rejectWithValue }) => {
        try {
            const response = await activityLogs(params);
            return response;
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
            .addCase(fetchActivities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActivities.fulfilled, (state, action) => {
                state.loading = false;
                state.faculty = action.payload;
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
    },
});

export default facultySlice.reducer;
