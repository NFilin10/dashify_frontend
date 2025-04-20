import React from "react";
import styles from "./Note.module.css";
import { useTheme } from "../../../Theme/theme-provider.jsx";
import { useNote } from "@/hooks/useNote.js"; // ← new hook!

const Note = ({ widget_id }) => {
    const { theme } = useTheme();
    const { note, setNote } = useNote(widget_id);

    const handleChange = (e) => {
        setNote(e.target.value);
    };

    return (
        <div className={`${styles.widget} ${theme === 'dark' ? styles.dark : ''}`}>
            <h2 className={styles.title}>📝 Quick Note</h2>
            <textarea
                className={styles.textarea}
                placeholder="Write something..."
                value={note}
                onChange={handleChange}
            />
        </div>
    );
};

export default Note;
