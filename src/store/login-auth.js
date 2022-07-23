import {createSlice} from '@reduxjs/toolkit';
const AuthLogin = createSlice({
    name:"login",
    initialState:{isLogin:false,user:null,dataFull:[]},
    reducers:{
        Login(state,action){
            state.user=action.payload;
            state.isLogin=false;
        },
        Logout(state){
            state.isLogin=true;
            state.user=null;
        },
        AddData(state,action){
            if(action.payload){
                state.dataFull.push(action.payload);
            }
        }
    }
})
export const LoginActions=AuthLogin.actions;
export default AuthLogin;