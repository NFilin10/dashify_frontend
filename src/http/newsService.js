const API_KEY = process.env.NEWS_API_KEY;

export const fetchNewsArticles = async (pageSize = 10, country = 'us') => {
    const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};
