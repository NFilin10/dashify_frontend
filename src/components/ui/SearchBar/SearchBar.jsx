import Styles from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useTheme } from './../../Theme/theme-provider.jsx'; // Import the theme context

function SearchBar() {
    const { theme } = useTheme(); // Get the current theme
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim() !== '') {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Dynamically set CSS variables based on the current theme
    const themeStyles = {
        '--search-bar-bg': theme === 'dark' ? '#333' : '#fff',
        '--search-bar-shadow': theme === 'dark' ? '0 2px 4px rgba(255, 255, 255, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        '--input-bg': theme === 'dark' ? '#444' : '#fff',
        '--input-text': theme === 'dark' ? '#fff' : '#333',
        '--input-focus-bg': theme === 'dark' ? '#555' : '#f5f5f5',
        '--input-focus-text': theme === 'dark' ? '#fff' : '#111',
        '--input-placeholder': theme === 'dark' ? '#ccc' : '#aaa',
        '--icon-color': theme === 'dark' ? '#bbb' : '#737373',
        '--icon-hover': theme === 'dark' ? '#fff' : '#000',
    };

    return (
        <div className={Styles.searchBarWrapper} style={themeStyles}>
            <FaSearch
                className={Styles.searchIcon}
                onClick={handleSearch}
            />
            <input
                className={Styles.inputField}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
            />
        </div>
    );
}

export default SearchBar;
