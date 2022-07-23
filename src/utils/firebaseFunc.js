import { doc, setDoc,getDocs, collection,query, orderBy } from "firebase/firestore"; 
import {db} from '../firebase.config';
import { database } from "../firebase.config";
import { set,ref,push, child,update } from "firebase/database";
import { async } from "@firebase/util";
export const SaveItem =async (data)=>{
    await setDoc(doc(db,"FoodItems",`${Date.now()}`),data,{capital:true},{merge:true});
}
export const getAllFoodItems=async ()=>{
    const items=await getDocs(query(collection(db,"FoodItems"),orderBy("id","desc")));
  return items.docs.map((doc)=> doc.data());
}
export const SaveDataCart=async ({user,data})=>{
  const postListRef =ref(database,'users');
  const newPostRef=push(postListRef);
set(newPostRef,{user,data});
} 
export const UpdateDataCart=({data,key})=>{
const updates={};
updates['/users/' + key + 'data']=data;
return update(ref(database),updates);
}


