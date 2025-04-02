import "./App.css";
import { ThemeProvider } from "@/components/Theme/theme-provider.jsx";
import WidgetSection from "@/components/WidgetSection/WidgetSection.jsx";
import DnDLayout from "@/components/DragAndDrop/DnDLayout.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";
import { DnDProvider } from "@/contexts/DnDContext.jsx";
import Navbar from "@/components/common/Navbar/Navbar.jsx";
import { useState, useRef, useEffect } from "react";

function App() {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const [columns, setColumns] = useState([
        { id: "Column1", title: "Column 1", cards: [], width: 50 },
        { id: "Column2", title: "Column 2", cards: [], width: 50 },
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

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <DnDProvider>
                <Navbar toggleSidebar={toggleSidebar} isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} columns={columns} setColumns={setColumns} />
                {isSidebarOpen && <WidgetMenu sidebarRef={sidebarRef} closeSidebar={() => setIsSidebarOpen(false)} />}
                {isSwitchOn ? <DnDLayout columns={columns} setColumns={setColumns} /> : <WidgetSection />}
            </DnDProvider>
        </ThemeProvider>
    );
}

export default App;
