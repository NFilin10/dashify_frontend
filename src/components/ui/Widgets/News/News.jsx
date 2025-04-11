import React from 'react';
import styles from './News.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';
import { useNews } from '@/hooks/useNews.js';

function News() {
    const { theme } = useTheme();
    const {
        currentArticles,
        currentPage,
        totalPages,
        nextPage,
        prevPage
    } = useNews({ articlesPerPage: 2, totalPages: 5 });

    return (
        <div className={`${styles.newsWidget} ${theme === 'dark' ? styles.dark : ''}`}>
            {currentArticles.map((article, index) => (
                <div key={index} className={styles.newsArticle}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h3>{article.title}</h3>
                    </a>
                    <p>{article.description}</p>
                </div>
            ))}
            <div className={styles.pagination}>
                <button onClick={prevPage} className={styles.button} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className={styles.pageIndicator}>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={nextPage} className={styles.button} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default News;
