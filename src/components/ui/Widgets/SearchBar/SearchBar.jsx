import Styles from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useTheme } from '../../../Theme/theme-provider.jsx';


function SearchBar() {
    const { theme } = useTheme();
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={`${Styles.searchBarWrapper} ${theme === 'dark' ? Styles.dark : ''}`}>
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
