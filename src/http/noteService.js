import axios from "axios";

export const saveNote = async (widgetId, note) => {
    await axios.post("http://localhost:8080/widgets/note/save-note", {
        widget_id: widgetId,
        note: note,
    });
};

export const getNote = async (widgetId) => {
    const response = await axios.get("http://localhost:8080/widgets/note/get-note", {
        params: { widget_id: widgetId }
    });
    return response.data.note;
};
