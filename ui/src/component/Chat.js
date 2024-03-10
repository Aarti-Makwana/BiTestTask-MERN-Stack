import './chat.css';
import { useState, useEffect, useRef } from 'react';
import jscookie from 'js-cookie';
import { useLocation } from "react-router-dom";
import { searchMessages } from "../store/messageSlice.js";
import { chat_url } from './url';
import { io } from "socket.io-client";
import { dispatchMessage } from "../store/messageSlice.js";
function Chat() {
    const location = useLocation();
    const [newmessage, setMessage] = useState("");
    var [allMessages, SetAllMessages] = useState([]);
    const [OnlineUsers, setOnlineUsers] = useState([]);

    var [reciverId, setReciverId] = useState(location.state.email)
    var [chatId, setChatID] = useState(location.state.chat_ID)
    const socket = useRef()
    const userEmail = jscookie.get("activeUser_email");

    useEffect(() => {
        searchMessages(chatId).then((data) => {
            if (data) {
                SetAllMessages([])
                SetAllMessages(data)
            }
        })
    }, [chatId])

    useEffect(() => {
        socket.current = io("http://localhost:8800/chat");
        socket.current.emit("new-user-add", userEmail);
        socket.current.on("get-users", (users) => {
            setOnlineUsers([...users]);
        });
        socket.current.on("recive-message", (data) => {
            SetAllMessages((allMessages) => [...allMessages, data]);
        });
    }, []);


    async function dispatchMessageFunction() {
        if (newmessage) {
            const message = {
                reciverId: reciverId,
                text: newmessage,
                chatId: chatId,
                senderId: userEmail
            };
            dispatchMessage(message)
            socket.current.emit("send-message", message);
            allMessages = [...allMessages, message]
            SetAllMessages([...allMessages])
            var inputField = document.getElementById("textAreaExample");
            inputField.value = "";
            setMessage("")
        }
    }

    function setMsgFun(newmessage) {
        setMessage(newmessage.target.value)
    }

    return (<>
        <div className="container">
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-4">
                            <div className="card" id="chat1" style={{ borderRadius: "15px" }}>
                                <div
                                    className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                                    style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                                    <i className="fas fa-angle-left"></i>
                                    <p className="mb-0 fw-bold">Live chat {reciverId}</p>
                                    <i className="fas fa-times"></i>
                                </div>
                                <div className="card-body" style={{ maxHeight: "55vh", overflowY: "scroll", scrollbarColor: "transparent" }}>
                                    <div className="d-flex flex-column justify-content-start mb-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                        {
                                            allMessages.map((data, index) => {
                                                if (data.senderId == userEmail) {
                                                    return (<>
                                                        <div className="p-3 ms-3 mb-2" style={{ borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)" }}>
                                                            <p className="small mb-0">{data.text}</p>
                                                        </div>
                                                    </>)
                                                }
                                                else {
                                                    return (<>
                                                        <div className="d-flex flex-row justify-content-end mb-4">
                                                            <div className="p-3 me-3 border" style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}>
                                                                <p className="small mb-0">{data.text}</p>
                                                            </div>
                                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                                                alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                                        </div>
                                                    </>)
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="form-outline">
                                    {/* <label className="form-label" htmlFor="textAreaExample">Type your message</label> */}
                                    <textarea className="form-control" id="textAreaExample" onChange={setMsgFun} rows="4" placeholder='Type Message'></textarea>
                                </div>
                                <center>
                                    <button className='btn btn-success my-2' onClick={dispatchMessageFunction}>Send</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>);
}
export default Chat;