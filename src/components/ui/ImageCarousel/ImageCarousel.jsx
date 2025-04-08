import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Styles from './ImageCarousel.module.css';
import { useTheme } from './../../Theme/theme-provider.jsx'; // Assuming you're using a theme provider

function ImageCarouselNode({ data }) {
    const [images, setImages] = useState([]);
    const { theme } = useTheme(); // Get the current theme (light/dark)

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imageArray]);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, idx) => idx !== index));
    };

    // Apply theme-based styles
    const themeStyles = {
        '--carousel-bg': theme === 'dark' ? '#333' : '#fff',
        '--img-shadow': theme === 'dark' ? '0px 4px 10px rgba(255, 255, 255, 0.2)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
        '--btn-bg': theme === 'dark' ? '#ff4d4d' : '#ff4d4d',
        '--btn-bg-hover': theme === 'dark' ? '#d73a3a' : '#d73a3a',
        '--btn-text': theme === 'dark' ? '#fff' : '#fff',
        '--input-bg': theme === 'dark' ? '#444' : '#f0f0f0',
        '--input-bg-hover': theme === 'dark' ? '#555' : '#e0e0e0',
        '--input-border': theme === 'dark' ? '#666' : '#ddd',
        '--input-text': theme === 'dark' ? '#fff' : '#333',
    };

    return (
        <div className={Styles.carouselContainer} style={themeStyles}>
            <Carousel>
                {images.map((image, index) => (
                    <div key={index} className={Styles.imgElem}>
                        <img src={image} alt={`Uploaded ${index + 1}`} />
                        <button className={Styles.removeBtn} onClick={() => handleRemoveImage(index)}>
                            Remove
                        </button>
                    </div>
                ))}
            </Carousel>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ marginTop: '20px' }}
            />
        </div>
    );
}

export default ImageCarouselNode;
