import { useState, useEffect } from "react";
import { saveNote, getNote } from "@/http/noteService.js";

export function useNote(widgetId) {
    const [note, setNote] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const savedNote = await getNote(widgetId);
                setNote(savedNote);
            } catch (err) {
                console.error("Failed to fetch note:", err);
            }
        };
        if (widgetId) {
            fetchNote();
        }
    }, [widgetId]);

    useEffect(() => {
        const saveNoteToBackend = async () => {
            try {
                await saveNote(widgetId, note);
            } catch (err) {
                console.error("Failed to save note:", err);
            }
        };
        if (note !== "" && widgetId) saveNoteToBackend();
    }, [note, widgetId]);

    return { note, setNote };
}
