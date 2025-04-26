import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Styles from './ImageCarousel.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';
import { uploadImage, getImages, deleteImage } from '@/http/imageCarouselService.js';

function ImageCarousel({ widget_id }) {
    const [images, setImages] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await getImages(widget_id);
                setImages(res.data.images);
            } catch (err) {
                console.error(err);
            }
        }
        fetchImages();
    }, [widget_id]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('widgetId', widget_id);

        try {
            const res = await uploadImage(formData);
            setImages(prev => [...prev, { id: res.data.imageId, image_path: res.data.imagePath }]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveImage = async (id) => {
        try {
            await deleteImage(id);
            setImages(prev => prev.filter(img => img.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const themeClass = theme === 'dark' ? 'dark' : 'light';

    return (
        <div className={`${Styles.carouselContainer} ${Styles[themeClass]}`}>
            <Carousel>
                {images.map((image) => (
                    <div key={image.id} className={Styles.imgElem}>
                        <img src={`http://localhost:8080/api/layout/${image.image_path}`} alt="carousel" />
                        <button className={Styles.removeBtn} onClick={() => handleRemoveImage(image.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </Carousel>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={Styles.fileInput}
            />
        </div>
    );
}

export default ImageCarousel;
