import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import baseApi from "../api/baseApi";

export const getAllBranch =  createAsyncThunk("branch/all",async (params)=>{
    try {
        const response = await baseApi.get(`/api/getAllBranch?page=${params?.page}&limit=${params?.showPerPage}&search=${params?.searchTerm}`);
        if (response.statusText !== "OK"){
            console.log("Something Went Wrong");
        }else{
            console.log(response.data);
            return response.data;
        }
    }catch (e) {
        console.log(e.response);
    }
})

export const branchSlice = createSlice({
    name:"branch",
    initialState:{
        pending:false,
        rejected:false,
        editable:false,
        allBranch:{}
    },
    reducers:{
        addBranch:(state,action)=>{

        }
    },
    extraReducers:{
        [getAllBranch.pending]:(state,action)=>{
            return {...state,pending:true};
        },
        [getAllBranch.fulfilled]:(state, {payload})=>{
            return {...state,allBranch: payload,pending: false}
        },
        [getAllBranch.rejected]:(state,action)=>{
            return {...state,rejected:true};
        },
    }
});

export const {addBranch} = branchSlice.actions;
export const getBranches = (state) => state.branch;
export default branchSlice.reducer;
