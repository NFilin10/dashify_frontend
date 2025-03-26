
import './App.css'
import Navbar from "@/components/ui/Navbar/Navbar.jsx";
import { ThemeProvider } from "@/components/teme-provider.jsx"
import {ModeToggle} from "@/components/mode-toggle.jsx";


function App() {

  return (
    <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar/>
            <ModeToggle/>
        </ThemeProvider>

    </>
  )
}

export default App
