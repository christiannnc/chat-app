import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div className="back" onClick={() => navigate("/")}>
                <span>← Back</span>
            </div>
        </div>
    );
}
