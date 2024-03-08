import express from "express"
import { addMessageController,getMessagesController } from "../controller/msgController";
const messageRouter =express.Router();

messageRouter.post("/",addMessageController);
messageRouter.get("/:chatId",getMessagesController);

export default messageRouter;