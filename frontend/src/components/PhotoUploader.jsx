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

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
            <br />
               <button
                          style={{ backgroundColor: 'lightblue', color: 'black', padding: '10px 20px', float: 'left', margin: '5px', border: '10px', borderRadius: '5px' }}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Choose Photo
                        </button>
            <button style={{ backgroundColor: 'lightblue', color: 'black', padding: '10px 20px', border: '10px', margin: '5px', borderRadius: '5px' }} onClick={handleUpload}>Upload</button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default PhotoUploader;