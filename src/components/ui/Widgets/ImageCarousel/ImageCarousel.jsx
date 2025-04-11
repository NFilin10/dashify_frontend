import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Styles from './ImageCarousel.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';


function ImageCarousel() {
    const [images, setImages] = useState([]);
    const { theme } = useTheme();

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imageArray]);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, idx) => idx !== index));
    };

    const themeClass = theme === 'dark' ? 'dark' : 'light';

    return (
        <div className={`${Styles.carouselContainer} ${Styles[themeClass]}`}>
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
                className={Styles.fileInput}
            />
        </div>
    );
}

export default ImageCarousel;
