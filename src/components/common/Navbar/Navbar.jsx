import {useState, useRef, useEffect} from "react";
import Styles from "./Navbar.module.css";
import { IoIosSettings } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle.jsx";
import { Switch } from "@/components/ui/switch";
import { HexColorPicker } from "react-colorful";
import { useLayoutSettings } from "@/hooks/useLayoutSettings";
import { useBackgroundImage } from "@/hooks/useBackgroundImage";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTheme } from "@/components/Theme/theme-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

function Navbar({ toggleSidebar, isSwitchOn, setIsSwitchOn, columns, setColumns, workspaceRef }) {
    const { theme, setTheme } = useTheme();
    const [color, setColor] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    useLayoutSettings(theme, setTheme, color, setColor, workspaceRef, setImgUrl);

    const { handleBackgroundImageUpload, handleDeleteImage, handleApplyImage } = useBackgroundImage(workspaceRef, color, setImgUrl, imgUrl);
    const dropdownRef = useRef(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);

    useClickOutside(dropdownRef, () => {
        setShowDropdown(false);
        setShowColorPicker(false);
    });

    useEffect(() => {
        if (workspaceRef.current && color) {
            workspaceRef.current.style.backgroundImage = "";
            workspaceRef.current.style.backgroundColor = color;
        }
    }, [color]);


    const addColumn = () => {
        if (columns.length < 5) {
            setColumns([...columns, { id: `Column${columns.length + 1}`, title: "+", cards: [], width: 100 / (columns.length + 1) }]);
        }
    };

    const removeColumn = (index) => {
        if (columns.length > 1) {
            const newColumns = columns.filter((_, i) => i !== index);
            setColumns(newColumns.map((col, i) => ({ ...col, id: `Column${i + 1}`, title: "+" })));
        }
    };

    const updateColumnWidth = (index, value) => {
        let totalWidth = columns.reduce((sum, col, i) => (i === index ? sum : sum + col.width), 0);
        let newWidth = Math.max(10, Math.min(100 - totalWidth, Number(value)));
        setColumns(columns.map((col, i) => (i === index ? { ...col, width: newWidth } : col)));
    };

    return (
        <div className={`${Styles.navContainer} text-foreground shadow-md`}>
            <div className={Styles.widgetsBtn} onClick={toggleSidebar}>
                <IoMenuSharp/>
                Widgets
            </div>

            <div className={Styles.profileBtn}>
                <Switch checked={isSwitchOn} onCheckedChange={setIsSwitchOn}/>
                <ModeToggle/>
                <div style={{position: "relative"}} ref={dropdownRef}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <IoIosSettings style={{fontSize: "2rem", cursor: "pointer"}}/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Manage Colours</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => document.getElementById("bgUploadInput").click()}>Change background image</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setShowColorPicker(prev => !prev)}>Set own color</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleApplyImage}>Set current background image</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleDeleteImage}>Reset image</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem onClick={() => setShowDropdown(true)}>Manage Columns</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {showDropdown && (
                        <div className={`${Styles.dropdown} text-foreground shadow-md bg-background`}>
                            <p>Manage Columns</p>
                            <button onClick={addColumn}>Add Column</button>
                            {columns.map((col, index) => (
                                <div key={col.id} className={Styles.columnRow}>
                                    <input type="number" value={col.width} onChange={(e) => updateColumnWidth(index, e.target.value)} min="20" max="100"/>
                                    <button onClick={() => removeColumn(index)}>✖</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {showColorPicker && (
                        <div className={Styles.colorPickerWrapper}>
                            <HexColorPicker color={color} onChange={setColor}/>
                            <button className={Styles.closePicker} onClick={() => setShowColorPicker(false)}>Close</button>
                        </div>
                    )}
                </div>

                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <input type="file" id="bgUploadInput" accept="image/*" style={{display: "none"}} onChange={handleBackgroundImageUpload}/>
        </div>
    );
}

export default Navbar;
