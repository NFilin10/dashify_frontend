import { useState, useEffect, useRef } from "react";
import Styles from "./Navbar.module.css";
import { IoIosSettings } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle.jsx";
import { Switch } from "@/components/ui/switch";
import { HexColorPicker } from "react-colorful";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "@/components/Theme/theme-provider"; // Import the useTheme hook

function Navbar({ toggleSidebar, isSwitchOn, setIsSwitchOn, columns, setColumns, workspaceRef }) {
    const { theme } = useTheme();  // Access the current theme (dark or light)
    const [showDropdown, setShowDropdown] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState(""); // Default color based on theme

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
                setShowColorPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (color && workspaceRef.current) {
            workspaceRef.current.style.backgroundColor = color;  // Apply the background color to the workspace
        }
    }, [color, workspaceRef]);

    const addColumn = () => {
        if (columns.length < 5) {
            setColumns([
                ...columns,
                {
                    id: `Column${columns.length + 1}`,
                    title: `Column ${columns.length + 1}`,
                    cards: [],
                    width: 100 / (columns.length + 1),
                },
            ]);
        }
    };

    const removeColumn = (index) => {
        if (columns.length > 1) {
            const newColumns = columns.filter((_, i) => i !== index);
            setColumns(
                newColumns.map((col, i) => ({
                    ...col,
                    id: `Column${i + 1}`,
                    title: `Column ${i + 1}`,
                }))
            );
        }
    };

    const updateColumnWidth = (index, value) => {
        let totalWidth = columns.reduce(
            (sum, col, i) => (i === index ? sum : sum + col.width),
            0
        );
        let newWidth = Math.max(10, Math.min(100 - totalWidth, Number(value)));
        setColumns(
            columns.map((col, i) =>
                i === index ? { ...col, width: newWidth } : col
            )
        );
    };

    const handleBackgroundImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (workspaceRef.current) {
                workspaceRef.current.style.backgroundImage = `url(${reader.result})`;
                workspaceRef.current.style.backgroundSize = "cover";
                workspaceRef.current.style.backgroundRepeat = "no-repeat";
                workspaceRef.current.style.backgroundPosition = "center";
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={`${Styles.navContainer} text-foreground shadow-md`}>
            <div className={Styles.widgetsBtn} onClick={toggleSidebar}>
                <IoMenuSharp />
                Widgets
            </div>

            <div className={Styles.profileBtn}>
                <Switch checked={isSwitchOn} onCheckedChange={setIsSwitchOn} />
                <ModeToggle />
                <div style={{ position: "relative" }} ref={dropdownRef}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <IoIosSettings style={{ fontSize: "2rem", cursor: "pointer" }} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Manage Colours</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => document.getElementById("bgUploadInput").click()}>
                                                Change background image
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setShowColorPicker(prev => !prev)}>
                                                Set own color
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem onClick={() => setShowDropdown(true)}>
                                    Manage Columns
                                </DropdownMenuItem>
                                <DropdownMenuItem>New Team</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

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

                    {showColorPicker && (
                        <div className={Styles.colorPickerWrapper}>
                            <HexColorPicker color={color} onChange={setColor} />
                            <button className={Styles.closePicker} onClick={() => setShowColorPicker(false)}>
                                Close
                            </button>
                        </div>
                    )}
                </div>

                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <input
                type="file"
                id="bgUploadInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleBackgroundImageUpload}
            />
        </div>
    );
}

export default Navbar;
