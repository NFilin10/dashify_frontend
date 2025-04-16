import { useEffect, useRef } from "react";
import axios from "axios";

export const useLayoutSettings = (theme, setTheme, color, setColor, workspaceRef, setImgUrl) => {
    const prevTheme = useRef(theme);
    const prevColor = useRef(color);

    const fetchLayoutSettings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/get-layout-settings', { withCredentials: true });
            if (response.data.success) {
                const { theme, color, image_path } = response.data.settings;
                setColor(color);
                setTheme(theme);
                setImgUrl(image_path);

                if (!image_path) {
                    setColor(color);
                } else {
                    workspaceRef.current.style.backgroundImage = `url(http://localhost:8080/api/${image_path})`;
                    workspaceRef.current.style.backgroundSize = "cover";
                    workspaceRef.current.style.backgroundRepeat = "no-repeat";
                    workspaceRef.current.style.backgroundPosition = "center";
                    workspaceRef.current.style.backgroundColor = "";
                    setColor("");
                }
            } else {
                console.error('Failed to fetch layout settings:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching layout settings:', error);
        }
    };

    const saveLayoutSettings = async (theme, color) => {
        try {
            const response = await axios.put(
                'http://localhost:8080/api/save-layout-settings',
                { theme, color },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            if (response.data.success) {
                console.log("Layout settings saved:", response.data.settings);
            } else {
                console.error("Failed to save layout settings:", response.data.error);
            }
        } catch (error) {
            console.error("Error saving layout settings:", error);
        }
    };

    useEffect(() => {
        fetchLayoutSettings();
    }, []);

    useEffect(() => {
        if (prevTheme.current !== theme || prevColor.current !== color) {
            saveLayoutSettings(theme, color);
            prevTheme.current = theme;
            prevColor.current = color;
        }
    }, [theme, color]);

    return { fetchLayoutSettings, saveLayoutSettings };
};
