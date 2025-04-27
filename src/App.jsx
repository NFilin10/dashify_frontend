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
import useAuth from "@/hooks/useAuth";
import Calculator from "@/components/ui/Widgets/Calculator/Calculator.jsx";
import {Calendar} from "@/components/ui/Widgets/calendar.jsx";
import SearchBar from "@/components/ui/Widgets/SearchBar/SearchBar.jsx";
import ClockWidget from "@/components/ui/Widgets/Clock/Clock.jsx";
import imageCarousel from "@/components/ui/Widgets/ImageCarousel/ImageCarousel.jsx";
import WeatherWidget from "@/components/ui/Widgets/Weather/WeatherWidget.jsx";
import Note from "@/components/ui/Widgets/Note/Note.jsx";
import customLinks from "@/components/ui/Widgets/customLinks/CustomLinks.jsx";
import News from "@/components/ui/Widgets/News/News.jsx";
import ToDo from "@/components/ui/Widgets/ToDo/ToDo.jsx";

function AppContent() {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const workspaceRef = useRef(null);
    const isAuthenticated = useAuth();

    const [columns, setColumns] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/api/columns/get-columns", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.columns)) {
                    setColumns(data.columns.map(col => ({
                        id: `Column${col.id}`,
                        title: "+",
                        cards: [],
                        width: col.width
                    })));

                } else {
                    console.error("Invalid data format:", data);
                }
            })
            .catch(err => console.error("Error fetching columns:", err));
    }, [isSwitchOn]);



    const widgetComponents = {
        calculator: Calculator,
        calendar: Calendar,
        searchBar: SearchBar,
        clock: ClockWidget,
        imageCarousel: imageCarousel,
        weather: WeatherWidget,
        note: Note,
        customLinks: customLinks,
        news: News,
        todoList: ToDo
    };

    useEffect(() => {
        if (!isSwitchOn) return;

        if (columns.every(col => col.cards.length === 0)) {
            fetch("http://localhost:8080/api/columns/widgets/column-widgets", { credentials: "include" })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const widgetsByColumn = {};

                        data.forEach(widget => {
                            const widgetData = {
                                id: `widget-${widget.widget_id}`,
                                type: widget.widget_type,
                                Component: widgetComponents[widget.widget_type] || null,
                            };
                            if (!widgetsByColumn[`Column${widget.column_id}`]) {
                                widgetsByColumn[`Column${widget.column_id}`] = [];
                            }
                            widgetsByColumn[`Column${widget.column_id}`].push(widgetData);
                        });

                        setColumns(prev =>
                            prev.map(col => ({
                                ...col,
                                cards: widgetsByColumn[col.id] || []
                            }))
                        );
                    }
                })
                .catch(err => console.error("Error fetching widgets:", err));
        }
    }, [isSwitchOn, columns]);





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
