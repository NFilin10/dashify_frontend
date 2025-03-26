import Styles from './Navbar.module.css'
import { IoIosSettings } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import WidgetMenu from "./../../WidgetMenu/WidgetMenu.jsx"
import {ModeToggle} from "@/components/ui/mode-toggle.jsx";


function Navbar() {

    const style = { fontSize: "2rem" }

    return (
        <>
            <div className={Styles.navContainer}>
                    <WidgetMenu />
                <div className={Styles.profileBtn}>
                    <ModeToggle/>
                    <IoIosSettings style={style} />
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </>
    )
}

export default Navbar
