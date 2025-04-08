import React, { useState, useEffect } from 'react';
import Styles from './Clock.module.css';
import { useTheme } from './../../Theme/theme-provider.jsx'; // Assuming you're using a theme provider

const ClockWidget = () => {
    const { theme } = useTheme(); // Get the current theme (light/dark)

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());

    const updateTime = () => {
        setTime(new Date().toLocaleTimeString());
        setDate(new Date().toLocaleDateString());
    };

    useEffect(() => {
        const interval = setInterval(updateTime, 1000); // Update every second
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    // Apply theme-based styles
    const themeStyles = {
        '--clock-bg': theme === 'dark' ? '#333' : '#fff',
        '--clock-text': theme === 'dark' ? '#fff' : '#333',
        '--clock-shadow': theme === 'dark' ? '0px 4px 10px rgba(255, 255, 255, 0.1)' : '0px 4px 10px rgba(0, 0, 0, 0.2)',
        '--clock-date': theme === 'dark' ? '#bbb' : '#777',
    };

    return (
        <div className={Styles.clockWrapper} style={themeStyles}>
            <div className="time">{time}</div>
            <span>{date}</span>
        </div>
    );
};

export default ClockWidget;
