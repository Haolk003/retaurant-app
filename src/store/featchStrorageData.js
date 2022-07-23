import { async } from "@firebase/util";
import { LoginActions } from "./login-auth";

export const FetchData=()=>{
    return async (dispatch)=>{
    const UserData=()=>{
    const userInfo=
    localStorage.getItem("user")!=="undefined" ? JSON.parse(localStorage.getItem("user")):localStorage.clear("user");
    return userInfo;
     }
    try{
        const userData=UserData()
        dispatch(LoginActions.Login(userData))
    }
    catch{
        console.log("error");
    }
    }
}
export const sendCartData=(item)=>{
    return async(dispatch)=>{
        const CartData=()=>{
            const data = localStorage.setItem("user",JSON.stringify(item));
            return data;
        }
        try{
            CartData();
        }
        catch{
            alert('Error');
        }
    }
}