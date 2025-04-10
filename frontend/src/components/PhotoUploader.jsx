import React from 'react';
import ImageUploading from 'react-images-uploading';

export function PhotoUploader({ userId }) {
  const [images, setImages] = React.useState([]);
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
          const res = await fetch("http://localhost:8080/user/upload-photo", {
              method: "POST",
              body: formData,
              });

          const text = await res.text();
          if (res.ok) {
              alert("ok " + text);
              } else {
                  alert("Upload failed: " + text);
                  }
              } catch (err) {
                  alert("Error: " + err.message);
                  }
          };


  return (
    <div className="App">
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
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
            <br />
            <button onClick={handleUpload}>Upload</button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default PhotoUploader;