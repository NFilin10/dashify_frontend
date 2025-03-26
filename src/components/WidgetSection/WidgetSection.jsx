import { Calendar } from "@/components/ui/calendar";
import Styles from './WidgetSection.module.css';
import SearchBar from "@/components/ui/SearchBar/SearchBar.jsx";
import Calculator from "@/components/ui/Calculator/Calculator.jsx";

function WidgetSection() {

    return (
        <>
            <Calendar/>
            <SearchBar/>
            <Calculator/>
        </>



    );
}

export default WidgetSection;
