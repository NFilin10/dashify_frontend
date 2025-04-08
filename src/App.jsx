import "./App.css";
import { ThemeProvider, useTheme } from "@/components/Theme/theme-provider";  // Import useTheme from theme-provider
import WidgetSection from "@/components/FreePosLayout/FreePosLayout.jsx";
import ColumnLayout from "@/components/ColumnLayout/ColumnLayout.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";
import { DnDProvider } from "@/contexts/DnDContext.jsx";
import Navbar from "@/components/common/Navbar/Navbar.jsx";
import { useState, useRef, useEffect } from "react";
import WeatherWidget from "@/components/ui/Widgets/Weather/Weather.jsx";

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

    // Access the theme using useTheme hook
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

    // Update workspace background color based on theme change
    useEffect(() => {
        if (workspaceRef.current) {
            if (theme === "dark") {
                workspaceRef.current.style.backgroundColor = "#000000";  // Black for dark mode
            } else if (theme === "light") {
                workspaceRef.current.style.backgroundColor = "#ffffff";  // White for light mode
            }
        }
    }, [theme]);  // This effect runs whenever the theme changes

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <DnDProvider>
                <Navbar
                    toggleSidebar={toggleSidebar}
                    isSwitchOn={isSwitchOn}
                    setIsSwitchOn={setIsSwitchOn}
                    columns={columns}
                    setColumns={setColumns}
                    workspaceRef={workspaceRef}  // Pass workspaceRef to Navbar
                />
                {/*<WeatherWidget/>*/}
                {isSidebarOpen && (
                    <WidgetMenu
                        sidebarRef={sidebarRef}
                        closeSidebar={() => setIsSidebarOpen(false)}
                    />
                )}
                <div className="workspace" ref={workspaceRef}>  {/* Set ref to workspace */}
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
