import React, { useState } from 'react';
import "./imageUpload.scss"

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      console.log('Uploading:', image);
    }
  };

  return (
    <div className="image-upload-container">
      <h1>Upload Your Image</h1>
      <form onSubmit={handleSubmit}>
        {preview && <img src={preview} alt="Preview" />}
        <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} />
        <label htmlFor="fileInput">Choose Image</label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
