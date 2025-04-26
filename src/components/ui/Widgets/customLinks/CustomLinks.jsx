import React, { useState } from "react";
import styles from "./CustomLinks.module.css";
import { useTheme } from "../../../Theme/theme-provider.jsx";
import { useCustomLinks } from "@/hooks/useCustomLinks.js";

function CustomLinks({widget_id}) {
    const { theme } = useTheme();
    const [url, setUrl] = useState("");
    const themeClass = theme === 'dark' ? 'dark' : 'light';

    const {
        links,
        loading,
        error,
        addNewLink,
        removeLink
    } = useCustomLinks(widget_id);

    const handleAddLink = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;
        await addNewLink(url);
        setUrl("");
    };

    const handleDeleteLink = async (id) => {
        await removeLink(id);
    };

    return (
        <div className={`${styles.widget} ${styles[themeClass]}`}>
            <form onSubmit={handleAddLink} className={styles.form}>
                <input
                    type="url"
                    placeholder="Enter website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>Add</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>Error loading links</p>}

            <div className={styles.grid}>
                {links.map((link) => (
                    <div key={link.id} className={styles.tileWrapper}>
                        <a
                            href={link.url}
                            className={styles.tile}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={styles.iconBox}>
                                <img
                                    src={link.favicon}
                                    alt="favicon"
                                    className={styles.icon}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                            <span className={styles.siteName}>{link.name}</span>
                        </a>
                        <button
                            className={styles.closeBtn}
                            onClick={() => handleDeleteLink(link.id)}
                            title="Remove"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustomLinks;
