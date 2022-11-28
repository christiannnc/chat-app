import React, { useState, useRef, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import "../css/chat.css";
import { AppContext } from "../App";

export default function Chat() {
    const context = useContext(AppContext);
    const socket = context.socket;
    const [currentRoom, setCurrentRoom] = useState(context.room);
    const [roomToJoin, setRoomToJoin] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(null);

    const sendMessage = () => {
        if (message != null) {
            socket.emit("send-message", message, currentRoom, context.userId);
            console.log("i fired once");
            console.log(currentRoom);
        }
        setMessages((prev) => [
            ...prev,
            {
                message,
                senderId: context.userId,
            },
        ]);
        setMessage(null);
    };

    const joinRoom = () => {
        socket.emit("join-room", roomToJoin);
        context.setRoom(roomToJoin);
        setCurrentRoom(roomToJoin);
    };

    const displayMessages = () => {
        console.log(context);
        console.log(socket);
    };

    const ping = () => {
        socket.emit("ping", currentRoom);
    };

    useEffect(() => {
        socket.on("incoming-message", (message) => {
            setMessages((prev) => [...prev, message]);
            console.log("got a new message!");
            console.log(message);
        });

        socket.on("pong", (data) => {
            console.log(data);
        });
    }, []);

    useEffect(() => {
        setMessages((prev) => [
            ...prev,
            {
                message: `you joined room ${context.room}`,
                senderId: "system",
            },
        ]);
    }, []);

    return (
        <>
            <Navbar />
            <div onClick={() => displayMessages()}>display</div>
            <div className="chat-container">
                <div className="heading-container">
                    <h1>Chat room {context.room}</h1>
                    <div onClick={() => ping()}>Ping!</div>
                    <div className="join-room-container">
                        <input
                            className="join-room-input"
                            placeholder="Join another room (by user id)"
                            onChange={(e) => setRoomToJoin(e.target.value)}
                        />

                        <div className="join-action" onClick={() => joinRoom()}>
                            <label>Join</label>
                        </div>
                    </div>
                </div>

                <div className="chat-area">
                    {messages.map((message, index) => (
                        <Message
                            text={message.message}
                            senderId={message.senderId}
                            key={index}
                        />
                    ))}
                </div>

                <div className="action-area">
                    <textarea
                        placeholder="Type your message here..."
                        className="message-input"
                        maxLength={500}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message ? message : ""}
                    />

                    <div className="send-button" onClick={() => sendMessage()}>
                        <label>Send</label>
                    </div>
                </div>
            </div>
        </>
    );
}

function Message({ text, senderId }) {
    const context = useContext(AppContext);
    return (
        <div
            className={
                senderId === context.userId
                    ? "senders-message"
                    : senderId != "system"
                    ? "received-message"
                    : "system-message"
            }
        >
            <p
                className={
                    senderId === context.userId
                        ? "senders-message text"
                        : senderId != "system"
                        ? "received-message text"
                        : "system text"
                }
            >
                {text}
            </p>
            <span className="senderid">{senderId}</span>
        </div>
    );
}
