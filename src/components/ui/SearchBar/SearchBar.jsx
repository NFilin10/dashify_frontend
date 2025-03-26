import Styles from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function SearchBar() {
    const style = { fontSize: '1.7rem', color: '#737373', cursor: 'pointer' };

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

    return (
        <div className={Styles.searchBarWrapper}>
            <FaSearch
                style={style}
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
