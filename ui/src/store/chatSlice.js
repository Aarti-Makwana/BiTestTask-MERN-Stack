import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { chat_url } from "../component/url";
const initialState = {
    chatData:{}
}

const chatSlice = createSlice({
    name:"chatSlice",
    initialState,
    reducers:{}
});

export const makeChat = async(payload)=>{
    try{
        var result  = await axios.post(`${chat_url}`,payload);
        return result.data.chatID;
    }catch(error){
        console.log(error);
    }
}
export default chatSlice.reducer;