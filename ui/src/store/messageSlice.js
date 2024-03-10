import { createSlice } from "@reduxjs/toolkit";
import { message_url } from "../component/url";
import axios from 'axios';
const initialState = {
    chatData:{}
}

const messageSlice = createSlice({
    name:"messageSlice",
    initialState,
    reducers:{
    }
});

export const dispatchMessage = async(payload)=>{
    try{
        var result  = await axios.post(message_url,payload);
        return result.data;
    }catch(error){
        console.log(error);
    }
}
export const searchMessages = async(payload)=>{
    try{
        var result  = await axios.get(`${message_url}/${payload}`)
        return result.data;
    }catch(error){
        console.log("In search Message ",error);
    }
}
export default messageSlice.reducer;