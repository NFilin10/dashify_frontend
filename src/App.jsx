import './App.css';
import { ThemeProvider } from "@/components/Theme/theme-provider.jsx";
import WidgetSection from "@/components/WidgetSection/WidgetSection.jsx";
import DnDLayout from "@/components/DragAndDrop/DnDLayout.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";
import { DnDProvider } from "@/contexts/DnDContext.jsx";
import Navbar from "@/components/common/Navbar/Navbar.jsx";
import { useState, useRef, useEffect } from "react";
import FreeformDnDLayout from "@/components/FreePos/FreeformDnDLayout.jsx";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <DnDProvider>
                <Navbar toggleSidebar={toggleSidebar} />
                {isSidebarOpen && <WidgetMenu sidebarRef={sidebarRef} closeSidebar={() => setIsSidebarOpen(false)} />}
                <DnDLayout />
                <FreeformDnDLayout/>
            </DnDProvider>
        </ThemeProvider>
    );
}

export default App;
