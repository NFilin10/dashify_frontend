import { useState, useEffect } from 'react';
import { fetchNewsArticles } from '../http/newsService.js';

export const useNews = ({ articlesPerPage = 2, totalPages = 5 }) => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await fetchNewsArticles(articlesPerPage * totalPages);
                setArticles(data.articles);
            } catch (error) {
                console.error("Failed to load news:", error);
            }
        };

        loadArticles();
    }, [articlesPerPage, totalPages]);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return {
        currentArticles,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
    };
};
