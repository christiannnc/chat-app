import { createContext, useContext, useState } from "react";
import "./App.css";
import Welcome from "./screens/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./screens/Chat";

export const AppContext = createContext();

function App() {
    const [isChatting, setIsChatting] = useState(false);
    return (
        <Router>
            <AppContext.Provider value={{ isChatting, setIsChatting }}>
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
