import { createSlice } from "@reduxjs/toolkit";

const tokenId = localStorage.getItem('token');
const initialAuthState = {
    isAuthenticated: !!tokenId || (false),
    token : tokenId,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers : {
        login(state,action){
            state.isAuthenticated = true;
            state.token = action.payload;
            localStorage.setItem('token', state.token);
        },
        logout(state){
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    }
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;