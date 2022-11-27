import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import "../css/chat.css";

export default function Chat() {
    const [roomId, setRoomId] = useState(null);
    const messages = useRef([
        {
            user: "system",
            data: `This is the beginning of room ${roomId}'s chat`,
        },
    ]);
    return (
        <div className="chat-container">
            <Navbar />
            <div className="heading-container">
                <h1>Chat room {roomId}</h1>
            </div>

            <div className="chat-area">
                {messages.current.map((message) => (
                    <Message user={message.user} text={message.data} />
                ))}
                <textarea
                    placeholder="Type your message here..."
                    className="message-input"
                    maxLength={500}
                />
            </div>
        </div>
    );
}

function Message({ user, text }) {
    return (
        <div>
            <p>{text}</p>
        </div>
    );
}
