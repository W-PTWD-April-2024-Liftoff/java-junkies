import React from 'react';
import ImageUploading from 'react-images-uploading';

export function PhotoUploader({ userId, onUploadSuccess }) {
  const [images, setImages] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const maxNumber = 1;

  const onChange = (imageList) => {
    setImages(imageList);
  };

 const handleUpload = async () => {
   if (!images.length) return alert("No image selected");

   const file = images[0].file;
   const formData = new FormData();
   formData.append("profilePicture", file);
   formData.append("id", userId);

   try {
     const res = await fetch("http://localhost:5176/api/user/upload-photo", {
       method: "POST",
       body: formData,
     });

     const data = await res.json();
     if (res.ok) {
       alert("Upload successful!");
       if (onUploadSuccess) onUploadSuccess(data); // 🔁 pass new user back
     } else {
       alert("Upload failed: " + data.message || "Unknown error");
     }
   } catch (err) {
     alert("Error: " + err.message);
   }
 };

  return (
    <div className="photo-uploader">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="Preview" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}

            <br />

            <button
              style={{
                backgroundColor: 'lightblue',
                color: 'black',
                padding: '10px 20px',
                margin: '5px',
                borderRadius: '5px'
              }}
              onClick={onImageUpload}
              {...dragProps}
            >
              Choose Photo
            </button>

            <button
              style={{
                backgroundColor: 'lightgreen',
                color: 'black',
                padding: '10px 20px',
                margin: '5px',
                borderRadius: '5px'
              }}
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default PhotoUploader;
