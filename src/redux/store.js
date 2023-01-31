import {configureStore} from "@reduxjs/toolkit";
import classSettingReducer from "./classSlice";
import branchList from "./branchSlice";

export default configureStore({
    reducer:{
        classSetting : classSettingReducer,
        branch: branchList
    }
})
