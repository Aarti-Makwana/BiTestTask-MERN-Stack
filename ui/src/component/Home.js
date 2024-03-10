import { useEffect } from "react";
import { requested_url } from "./url";
import { useState } from "react";
import axios from 'axios';
import { makeChat } from "../store/chatSlice.js";
import { useNavigate } from 'react-router-dom';
import jscookie from 'js-cookie';

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const activeUser_email = jscookie.get("activeUser_email");

    useEffect(() => {
        async function userList() {
            try {
                var data = await axios.get(`${requested_url}/showUser`);
                setData(data.data);
            } catch (error) {
                console.log("Error in show user list ", error);
            }
        }
        userList();
    }, []);

    const chatWithUser = async (email) => {
        const payLoad = {
            senderId: activeUser_email,
            reciverId: email,
            message: "Hi"
        }
        var chat_ID = await makeChat(payLoad);
        navigate('/chatWithUser', { state: { email, chat_ID } })
    }
    return (<>
        <div className="container my-3">
            <center><h1>Do Chat With Anyone</h1></center>
            <table className="table my-5">
                <thead>
                    <tr>
                        <th scope="col">sno.</th>
                        <th scope="col">User Name</th>
                        <th scope="col">User Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Chat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((userData, index) => {
                            return (
                                <>{(userData.email != activeUser_email) ? (<>
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{userData.name}</td>
                                        <td>{userData.email}</td>
                                        <td>{userData.phone}</td>
                                        <td><button className="btn btn-primary" onClick={e => chatWithUser(userData.email)} >Chat</button></td>
                                    </tr></>) : (<></>)
                                }
                                </>)
                        })
                    }
                </tbody >
            </table>
        </div>
    </>)
}

export default Home;