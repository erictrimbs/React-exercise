import React, { useState } from 'react';
import axios from 'axios';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB size limit

const DragAndDropUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      if (files[0].size > MAX_FILE_SIZE) {
        setError('File is too large. Maximum size is 4MB.');
        setFile(null);
        setPreviewUrl(null);
      } else {
        setFile(files[0]);
        setPreviewUrl(URL.createObjectURL(files[0]));
        setError(null);
      }
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setPreviewUrl(response.data.url);
        setError(null);
      } catch (error) {
        setError('Error uploading file.');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div>
      <h1>Drag and Drop Image Upload</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #cccccc',
          borderRadius: '4px',
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <p>Drag and drop an image here</p>
        )}
      </div>
      {file && <button onClick={handleUpload}>Upload</button>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DragAndDropUpload;
