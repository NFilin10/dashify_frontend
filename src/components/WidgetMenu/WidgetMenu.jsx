import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {IoMenuSharp} from "react-icons/io5";
import Styles from './WidgetMenu.module.css'
import { LuListTodo } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { CiLink } from "react-icons/ci";
import { FaImage } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { TbNewSection } from "react-icons/tb";


function WidgetMenu(){

    const style = { fontSize: "18px" }


    const widgetElements = [
        {name: "News ", icon: <FaRegNewspaper style={style}/>},
        {name: "Weather", icon: <TiWeatherPartlySunny style={style}/>},
        {name: "Custom links", icon: <CiLink style={style}/>},
        {name: "Image carousel", icon: <FaImage style={style}/>},
        {name: "Todo list", icon: <LuListTodo style={style}/>},
        {name: "Html code", icon: <FaCode style={style}/>},
        {name: "Calendar", icon: <FaRegCalendarAlt style={style}/>},
        {name: "Clock", icon: <FaClock style={style}/>},
        {name: "Calculator", icon: <FaCalculator style={style}/>},
        {name: "Search bar", icon: <IoSearch style={style}/>},
        {name: "Section", icon: <TbNewSection style={style}/>}
    ]


    return (
        <Sheet >
            <SheetTrigger className={Styles.widgetsBtn}>
                    <IoMenuSharp/>
                    Widgets
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-[320px]">
                <SheetHeader>
                    <SheetTitle>Add widgets</SheetTitle>
                    <SheetDescription>
                        <div className={Styles.widgetsElements}>
                            {widgetElements.map((widget, index) => (
                                <div className={Styles.widgetElement} key={index}>
                                    {widget.icon}
                                    <span>{widget.name}</span>
                                </div>
                            ))}
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default WidgetMenu