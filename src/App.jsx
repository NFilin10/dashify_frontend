import "./App.css";
import { ThemeProvider, useTheme } from "@/components/Theme/theme-provider";
import WidgetSection from "@/components/FreePosLayout/FreePosLayout.jsx";
import ColumnLayout from "@/components/ColumnLayout/ColumnLayout.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";
import { DnDProvider } from "@/contexts/DnDContext.jsx";
import Navbar from "@/components/common/Navbar/Navbar.jsx";
import { useState, useRef, useEffect } from "react";
import Login from "@/components/Login/Login.jsx";
import Signup from "@/components/Signup/Signup.jsx";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth"; // Adjust the import path if needed

function AppContent() {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const workspaceRef = useRef(null);
    const { theme } = useTheme();
    const location = useLocation();
    const isAuthenticated = useAuth();

    const [columns, setColumns] = useState([
        { id: "Column1", title: "+", cards: [], width: 25 },
        { id: "Column2", title: "+", cards: [], width: 25 },
        { id: "Column3", title: "+", cards: [], width: 50 },
    ]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // useEffect(() => {
    //     if (workspaceRef.current) {
    //         workspaceRef.current.style.backgroundColor =
    //             theme === "dark" ? "#000000" : "#ffffff";
    //     }
    // }, [theme]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
                {/* Default route for authenticated users */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <>
                                <Navbar
                                    toggleSidebar={toggleSidebar}
                                    isSwitchOn={isSwitchOn}
                                    setIsSwitchOn={setIsSwitchOn}
                                    columns={columns}
                                    setColumns={setColumns}
                                    workspaceRef={workspaceRef}
                                />
                                {isSidebarOpen && (
                                    <WidgetMenu
                                        sidebarRef={sidebarRef}
                                        closeSidebar={() => setIsSidebarOpen(false)}
                                    />
                                )}
                                <div ref={workspaceRef}>
                                    {isSwitchOn ? (
                                        <ColumnLayout columns={columns} setColumns={setColumns} />
                                    ) : (
                                        <WidgetSection />
                                    )}
                                </div>
                            </>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <DnDProvider>
                    <AppContent />
                </DnDProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
