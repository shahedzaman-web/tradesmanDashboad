import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const getAllBranch = createAsyncThunk("classSetting/all",async ()=>{
    try {
/*        const response = await baseUrl.get()*/
    }catch (e) {
        console.log(e.response);
    }
})

export const classSlice = createSlice({
    name: "classSetting",
    initialState:{
        showPerPage:25,
        page:1,
        searchTerm:"",
        totalSize:0,
        data:[]
    },
    reducers:{
        update: (state,action)=>{
            state.totalSize = action.payload.size
        }
    }
})

export const {update} = classSlice.actions;
export default classSlice.reducer;
