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

    return (
        <div className={`${styles.widget} ${theme === 'dark' ? styles.dark : ''}`}>
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
