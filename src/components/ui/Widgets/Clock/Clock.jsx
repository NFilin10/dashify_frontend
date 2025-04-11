import React, { useState, useEffect } from 'react';
import Styles from './Clock.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';

const ClockWidget = () => {
    const { theme } = useTheme();

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());

    const updateTime = () => {
        setTime(new Date().toLocaleTimeString());
        setDate(new Date().toLocaleDateString());
    };

    useEffect(() => {
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const themeClass = theme === 'dark' ? 'dark' : 'light';

    return (
        <div className={`${Styles.clockWrapper} ${Styles[themeClass]}`}>
            <div className="time">{time}</div>
            <span>{date}</span>
        </div>
    );
};

export default ClockWidget;
