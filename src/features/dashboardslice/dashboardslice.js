import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username : "",
    userId : null,
    isLoading : false,
    isSuccess : null
}

export const dashboardSlice = createSlice({
    name  : "dashboard",
    initialState,
    reducers: {
        clearState : () => initialState
    }
})

export const {clearState} = dashboardSlice.actions;
export default dashboardSlice.reducer