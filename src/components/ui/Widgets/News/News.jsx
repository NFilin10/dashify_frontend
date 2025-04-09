import React, { useState, useEffect } from 'react';
import styles from './News.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx'; // Assuming you're using a theme provider

const News = () => {
    const { theme } = useTheme(); // Get the current theme (light/dark)

    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 2;
    const totalPages = 5;
    const apiKey = '29a4994bb7e8465c9f48949c8e0f684a';

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&pageSize=${articlesPerPage * totalPages}&apiKey=${apiKey}`
                );
                const data = await response.json();
                setArticles(data.articles);
            } catch (error) {
                console.error('Error fetching the news articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Apply theme-based styles using CSS variables
    const themeStyles = {
        '--bg-color': theme === 'dark' ? '#1e1e1e' : '#fff',
        '--text-color': theme === 'dark' ? '#f5f5f5' : '#333',
        '--article-bg': theme === 'dark' ? '#2a2a2a' : '#f9f9f9',
        '--article-hover-bg': theme === 'dark' ? '#333' : '#eaeaea',
        '--button-bg': theme === 'dark' ? '#333' : '#f0f0f0',
        '--button-hover-bg': theme === 'dark' ? '#444' : '#e0e0e0',
        '--button-text': theme === 'dark' ? '#f5f5f5' : '#333',
        '--page-indicator': theme === 'dark' ? '#aaa' : '#777',
    };

    return (
        <div className={styles.newsWidget} style={themeStyles}>
            {currentArticles.map((article, index) => (
                <div key={index} className={styles.newsArticle}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h3>{article.title}</h3>
                    </a>
                    <p>{article.description}</p>
                </div>
            ))}
            <div className={styles.pagination}>
                <button
                    onClick={prevPage}
                    className={styles.button}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className={styles.pageIndicator}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    className={styles.button}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default News;
