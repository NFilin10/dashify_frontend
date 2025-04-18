import React, { useState, useEffect } from "react";
import styles from "./Note.module.css";
import { useTheme } from "../../../Theme/theme-provider.jsx";
import { saveNote, getNote } from "@/http/noteService.js"; // Import noteService

const Note = ({ widget_id }) => {
    const { theme } = useTheme();
    const [note, setNote] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const savedNote = await getNote(widget_id);
                setNote(savedNote);
            } catch (err) {
                console.error("Failed to fetch note:", err);
            }
        };
        fetchNote();
    }, [widget_id]);

    const handleChange = (e) => {
        setNote(e.target.value);
    };

    useEffect(() => {
        const saveNoteToBackend = async () => {
            try {
                await saveNote(widget_id, note);
            } catch (err) {
                console.error("Failed to save note:", err);
            }
        };
        if (note !== "") saveNoteToBackend();
    }, [note, widget_id]);

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
