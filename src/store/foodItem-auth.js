import { createSlice } from "@reduxjs/toolkit";
const FoodItems=createSlice({
    name:"food",
    initialState:{data:[],
    page:0,},
    reducers:{
        addData(state,action){
            state.data=action.payload;
        },
     nextPage(state){
        state.page= state.page+ 1;
     },
     prevPage(state){
        state.page-=1;
     }

        
    }
})
export const FoodAction=FoodItems.actions;
export default FoodItems;