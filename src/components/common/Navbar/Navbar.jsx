import { useState } from "react";
import Styles from "./Navbar.module.css";
import { IoIosSettings } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle.jsx";
import { IoMenuSharp } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";

function Navbar({ toggleSidebar, isSwitchOn, setIsSwitchOn, columns, setColumns }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const addColumn = () => {
        if (columns.length < 5) {
            setColumns([...columns, { id: `Column${columns.length + 1}`, title: `Column ${columns.length + 1}`, cards: [], width: 100 / (columns.length + 1) }]);
        }
    };

    const removeColumn = (index) => {
        if (columns.length > 1) {
            const newColumns = columns.filter((_, i) => i !== index);
            setColumns(newColumns.map((col, i) => ({ ...col, id: `Column${i + 1}`, title: `Column ${i + 1}` })));
        }
    };

    const updateColumnWidth = (index, value) => {
        let totalWidth = columns.reduce((sum, col, i) => (i === index ? sum : sum + col.width), 0);
        let newWidth = Math.max(10, Math.min(100 - totalWidth, Number(value)));

        let updatedColumns = columns.map((col, i) => (i === index ? { ...col, width: newWidth } : col));
        setColumns(updatedColumns);
    };

    return (
        <div className={Styles.navContainer}>
            <div className={Styles.widgetsBtn} onClick={toggleSidebar}>
                <IoMenuSharp />
                Widgets
            </div>

            <div className={Styles.profileBtn}>
                <Switch checked={isSwitchOn} onCheckedChange={setIsSwitchOn} />
                <ModeToggle />
                <div style={{ position: "relative" }}>
                    <IoIosSettings style={{ fontSize: "2rem", cursor: "pointer" }} onClick={toggleDropdown} />
                    {showDropdown && (
                        <div className={Styles.dropdown}>
                            <p>Manage Columns</p>
                            <button onClick={addColumn}>Add Column</button>
                            {columns.map((col, index) => (
                                <div key={col.id} className={Styles.columnRow}>
                                    <input
                                        type="number"
                                        value={col.width}
                                        onChange={(e) => updateColumnWidth(index, e.target.value)}
                                        min="10"
                                        max="100"
                                    />
                                    <button onClick={() => removeColumn(index)}>✖</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

export default Navbar;
