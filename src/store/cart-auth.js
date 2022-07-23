import { createSlice } from "@reduxjs/toolkit";
const CartAuth=createSlice({
    name:"cart",
    initialState:{request:false,itemList:[],
    totalQuanlity:0,
    total:0,
    },
    reducers:{
        showCart(state){
            state.request=true;
        },
        CloseCart(state){
            state.request=false;
        },
       getCart(state,action){
        if(action.payload){
            state.itemList=action.payload;
        }
       },
        addCart(state,action){
            const newItem=action.payload;
            const existingItem=state.itemList.find((item)=> item.id === newItem.id)
            if(existingItem){
                existingItem.quanlity+=1;
                state.total+=existingItem.price;
            }
            else{
                state.itemList.push({
                    id:newItem.id,
                    categories:newItem.categories,
                    imgURL:newItem.imgURL,
                    price:newItem.price,
                    title:newItem.title,
                    quanlity:1,
                })
                state.totalQuanlity++;
                state.total+=newItem.price;
            }
        },
        increment(state,action){
            const id=action.payload;
            const existingItem=state.itemList.find((item)=> item.id === id);
            
            if(existingItem.quanlity===1){
              state.itemList=  state.itemList.filter((item)=> item.id!==id);
              state.totalQuanlity--;
             
            }
            else{
                existingItem.quanlity--;
            }
             state.total-=existingItem.price;
        },
        decrement(state,action){
            const id=action.payload;
            const decs=state.itemList.find((item)=> item.id === id);
            decs.quanlity++;
            state.total+=decs.price;
        },

    }
})
export const CartAction =CartAuth.actions;
export default CartAuth;