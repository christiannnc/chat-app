import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "../css/welcome.css";

export default function Welcome() {
    const context = useContext(AppContext);
    const navigate = useNavigate();

    const startChat = () => {
        context.setIsChatting(true);
        navigate("/chat");
    };

    return (
        <div className="welcome-content-container">
            <h1>Welcome to the Chat App!</h1>
            <span>
                Click <span className="nested-action-text">Chat Now</span> to
                start chatting!
            </span>

            <div className="start-chat-button" onClick={() => startChat()}>
                <span>Chat Now</span>
            </div>
        </div>
    );
}
