
import './App.css'
import Navbar from "@/components/ui/Navbar/Navbar.jsx";
import { ThemeProvider } from "@/components/Theme/theme-provider.jsx"
import {ModeToggle} from "@/components/ui/mode-toggle.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";
import WidgetSection from "@/components/WidgetSection/WidgetSection.jsx";


function App() {

  return (
    <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar/>
            <WidgetSection/>
        </ThemeProvider>

    </>
  )
}

export default App
