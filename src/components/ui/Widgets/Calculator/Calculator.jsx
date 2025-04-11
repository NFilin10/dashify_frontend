import { useState } from "react";
import { useTheme } from "../../../Theme/theme-provider.jsx";
import styles from "./Calculator.module.css";

export default function Calculator() {
    const { theme } = useTheme();
    const [currentValue, setCurrentValue] = useState("0");
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperator] = useState(null);

    const handleClick = (e) => {
        const getSameValue = e.currentTarget.value;
        switch (getSameValue) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                setCurrentValue(
                    currentValue === "0" ? getSameValue : currentValue + getSameValue
                );
                break;

            case "+":
            case "-":
            case "*":
            case "%":
                setPreviousValue(currentValue);
                setCurrentValue("");
                setOperator(getSameValue);
                break;

            case "/":
                if (currentValue === "0") {
                    alert("Cannot divide by zero");
                    break;
                }
                setPreviousValue(currentValue);
                setCurrentValue("");
                setOperator(getSameValue);
                break;

            case ".":
                if (!currentValue.includes(".")) {
                    setCurrentValue(currentValue + ".");
                }
                break;

            case "=":
                const prev = parseFloat(previousValue);
                const curr = parseFloat(currentValue);
                const computation =
                    operation === "+"
                        ? prev + curr
                        : operation === "-"
                            ? prev - curr
                            : operation === "*"
                                ? prev * curr
                                : operation === "/"
                                    ? prev / curr
                                    : operation === "%"
                                        ? (prev / 100) * curr
                                        : curr;
                setCurrentValue(computation);
                setPreviousValue("");
                setOperator(null);
                break;

            case "clearAll":
                setCurrentValue("0");
                setPreviousValue(null);
                setOperator(null);
                break;
            case "clearEntry":
                setCurrentValue("0");
                break;
            default:
                setCurrentValue(null);
                break;
        }
    };

    return (
        <div className={`${styles.calcWrapper} ${styles[theme]}`}>
            <p
                id={styles.resultScreen}
                className={theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}
            >
                {previousValue}
                {operation}
                {currentValue}
            </p>
            <div className={`${styles.calcBtns} ${styles.firstRow}`}>
                <button
                    className={`${styles.calcBtn} ${styles[theme]}`}
                    value="clearAll"
                    onClick={handleClick}
                >
                    AC
                </button>
                <button
                    className={`${styles.calcBtn} ${styles[theme]}`}
                    value="clearEntry"
                    onClick={handleClick}
                >
                    CE
                </button>
                <button
                    className={`${styles.calcBtn} ${styles[theme]}`}
                    value="%"
                    onClick={handleClick}
                >
                    %
                </button>
                <button
                    className={`${styles.calcBtn} ${styles[theme]}`}
                    value="/"
                    onClick={handleClick}
                >
                    ÷
                </button>
            </div>
            <div className={styles.calcBtns}>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="7" onClick={handleClick}>
                    7
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="8" onClick={handleClick}>
                    8
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="9" onClick={handleClick}>
                    9
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="*" onClick={handleClick}>
                    x
                </button>
            </div>
            <div className={styles.calcBtns}>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="4" onClick={handleClick}>
                    4
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="5" onClick={handleClick}>
                    5
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="6" onClick={handleClick}>
                    6
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="-" onClick={handleClick}>
                    -
                </button>
            </div>
            <div className={styles.calcBtns}>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="1" onClick={handleClick}>
                    1
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="2" onClick={handleClick}>
                    2
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="3" onClick={handleClick}>
                    3
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="+" onClick={handleClick}>
                    +
                </button>
            </div>
            <div className={styles.calcBtns}>
                <button
                    id={styles.bigZero}
                    className={`${styles.calcBtn} ${styles[theme]}`}
                    value="0"
                    onClick={handleClick}
                >
                    0
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="." onClick={handleClick}>
                    .
                </button>
                <button className={`${styles.calcBtn} ${styles[theme]}`} value="=" onClick={handleClick}>
                    =
                </button>
            </div>
        </div>
    );
}
