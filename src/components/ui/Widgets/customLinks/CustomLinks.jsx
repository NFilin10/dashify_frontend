import React, { useState } from "react";
import styles from "./CustomLinks.module.css";
import { useTheme } from "../../../Theme/theme-provider.jsx";


function CustomLinks() {
    const { theme } = useTheme();
    const [url, setUrl] = useState("");
    const [links, setLinks] = useState([]);

    const getFavicon = (linkUrl) => {
        try {
            const domain = new URL(linkUrl).origin;
            return `${domain}/favicon.ico`;
        } catch {
            return null;
        }
    };

    const getSiteName = (linkUrl) => {
        try {
            const { hostname } = new URL(linkUrl);
            return hostname.replace(/^www\./, '');
        } catch {
            return linkUrl;
        }
    };

    const handleAddLink = (e) => {
        e.preventDefault();
        if (!url.trim()) return;
        const favicon = getFavicon(url);
        const name = getSiteName(url);
        setLinks([...links, { url, favicon, name }]);
        setUrl("");
    };

    const handleDeleteLink = (index) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const themeClass = theme === 'dark' ? 'dark' : 'light';

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

            <div className={styles.grid}>
                {links.map((link, idx) => (
                    <div key={idx} className={styles.tileWrapper}>
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
                            onClick={() => handleDeleteLink(idx)}
                            title="Remove"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomLinks;
