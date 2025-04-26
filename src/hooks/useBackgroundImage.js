import axios from "axios";

export const useBackgroundImage = (workspaceRef, color, setImgUrl, imgUrl) => {

    const handleBackgroundImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post('http://localhost:8080/api/layout/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (response.data.success) {
                const imagePath = response.data.imagePath;
                const fullImageUrl = `http://localhost:8080/api/layout/${imagePath}`;

                if (workspaceRef.current) {
                    workspaceRef.current.style.backgroundImage = `url(${fullImageUrl})`;
                    workspaceRef.current.style.backgroundSize = "cover";
                    workspaceRef.current.style.backgroundRepeat = "no-repeat";
                    workspaceRef.current.style.backgroundPosition = "center";
                    workspaceRef.current.style.backgroundColor = "";
                }
            } else {
                console.error("Failed to upload image:", response.data.error);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleDeleteImage = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/layout/delete-image', {
                withCredentials: true,
            });

            if (response.data.success) {
                if (workspaceRef.current) {
                    workspaceRef.current.style.backgroundImage = '';
                    workspaceRef.current.style.backgroundColor = color;
                }
            } else {
                console.error('Failed to delete image:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleApplyImage = () => {
        console.log("here")
        console.log(`url(http://localhost:8080/api/${imgUrl})`)
        setImgUrl(imgUrl);
        workspaceRef.current.style.backgroundImage = `url(http://localhost:8080/api/layout/${imgUrl})`;
        workspaceRef.current.style.backgroundSize = "cover";
        workspaceRef.current.style.backgroundRepeat = "no-repeat";
        workspaceRef.current.style.backgroundPosition = "center";
        workspaceRef.current.style.backgroundColor = "";
    };

    return {
        handleBackgroundImageUpload,
        handleDeleteImage,
        handleApplyImage,
    };
};
