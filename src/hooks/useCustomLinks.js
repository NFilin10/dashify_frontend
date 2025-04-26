import { useState, useEffect } from "react";
import * as customLinksService from "./../http/customLinksService";

export function useCustomLinks(customLinkId) {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLinks = async () => {
        try {
            setLoading(true);
            const data = await customLinksService.getLinks(customLinkId);
            setLinks(data.map(link => ({
                id: link.id,
                url: link.link,
                favicon: getFavicon(link.link),
                name: getSiteName(link.link),
            })));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addNewLink = async (url) => {
        try {
            await customLinksService.addLink(customLinkId, url);
            await fetchLinks();
        } catch (err) {
            setError(err);
        }
    };

    const removeLink = async (linkId) => {
        try {
            await customLinksService.deleteLink(linkId);
            await fetchLinks();
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (customLinkId) {
            fetchLinks();
        }
    }, [customLinkId]);

    return {
        links,
        loading,
        error,
        addNewLink,
        removeLink,
        fetchLinks
    };
}

function getFavicon(linkUrl) {
    try {
        const domain = new URL(linkUrl).origin;
        return `${domain}/favicon.ico`;
    } catch {
        return null;
    }
}

function getSiteName(linkUrl) {
    try {
        const { hostname } = new URL(linkUrl);
        return hostname.replace(/^www\./, '');
    } catch {
        return linkUrl;
    }
}
