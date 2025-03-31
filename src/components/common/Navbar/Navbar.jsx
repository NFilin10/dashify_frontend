import { useState } from "react";
import Styles from './Navbar.module.css';
import { IoIosSettings } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle.jsx";
import { IoMenuSharp } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";

function Navbar({ toggleSidebar }) {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleSwitchChange = (checked) => {
        setIsSwitchOn(checked);
        console.log("Switch is now:", checked ? "ON" : "OFF");
    };

    return (
        <div className={Styles.navContainer}>
            <div className={Styles.widgetsBtn} onClick={toggleSidebar}>
                <IoMenuSharp />
                Widgets
            </div>

            <div className={Styles.profileBtn}>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
                <ModeToggle />
                <IoIosSettings style={{ fontSize: "2rem" }} />
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

export default Navbar;
