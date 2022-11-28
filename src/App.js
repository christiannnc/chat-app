import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./css/App.css";
import Welcome from "./screens/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./screens/Chat";
import { io } from "socket.io-client";

export const AppContext = createContext();

function App() {
    const [isChatting, setIsChatting] = useState(false);
    const [room, setRoom] = useState(null);
    const [userId, setUserId] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log("i fire once");
        setSocket(io("http://localhost:3002"));
    }, []);

    const context = {
        isChatting,
        setIsChatting,
        room,
        setRoom,
        userId,
        setUserId,
        socket,
    };

    return (
        <Router>
            <AppContext.Provider value={context}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="App">
                                <Welcome />
                            </div>
                        }
                    />

                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
