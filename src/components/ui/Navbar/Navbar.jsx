import Styles from './Navbar.module.css'
import { IoIosSettings } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import WidgetMenu from "./../../WidgetMenu/WidgetMenu.jsx"

function Navbar() {

    const style = { fontSize: "2rem" }

    return (
        <>
            <div className={Styles.navContainer}>
                    <WidgetMenu />
                <div className={Styles.profileBtn}>
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
