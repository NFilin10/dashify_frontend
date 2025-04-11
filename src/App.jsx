import "./App.css";
import { ThemeProvider, useTheme } from "@/components/Theme/theme-provider";
import WidgetSection from "@/components/FreePosLayout/FreePosLayout.jsx";
import ColumnLayout from "@/components/ColumnLayout/ColumnLayout.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";
import { DnDProvider } from "@/contexts/DnDContext.jsx";
import Navbar from "@/components/common/Navbar/Navbar.jsx";
import { useState, useRef, useEffect } from "react";


function App() {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const workspaceRef = useRef(null);
    const [columns, setColumns] = useState([
        { id: "Column1", title: "+", cards: [], width: 25 },
        { id: "Column2", title: "+", cards: [], width: 25 },
        { id: "Column3", title: "+", cards: [], width: 50 },
    ]);

    const { theme } = useTheme();

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

    useEffect(() => {
        if (workspaceRef.current) {
            if (theme === "dark") {
                workspaceRef.current.style.backgroundColor = "#000000";
            } else if (theme === "light") {
                workspaceRef.current.style.backgroundColor = "#ffffff";
            }
        }
    }, [theme]);

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <DnDProvider>
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
            </DnDProvider>
        </ThemeProvider>
    );
}

export default App;
