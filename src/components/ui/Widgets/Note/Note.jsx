import React, { useState, useEffect } from "react";
import styles from "./Note.module.css";
import { useTheme } from "../../../Theme/theme-provider.jsx";

const Note = () => {
    const { theme } = useTheme();
    const [note, setNote] = useState(() => {
        return localStorage.getItem("quick-note") || "";
    });

    useEffect(() => {
        localStorage.setItem("quick-note", note);
    }, [note]);

    const themeStyles = {
        '--bg': theme === 'dark' ? '#1a1a1a' : '#f9f9f9',
        '--text': theme === 'dark' ? '#f1f1f1' : '#1a1a1a',
        '--card-bg': theme === 'dark' ? '#2c2c2c' : '#ffffff',
        '--textarea-bg': theme === 'dark' ? '#1f1f1f' : '#ffffff',
        '--textarea-border': theme === 'dark' ? '#444' : '#ccc',
        '--shadow': theme === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.4)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div className={styles.widget} style={themeStyles}>
            <h2 className={styles.title}>📝 Quick Note</h2>
            <textarea
                className={styles.textarea}
                placeholder="Write something..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
        </div>
    );
};

export default Note;
