import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneText = {
  margin: "0",
  fontSize: "20px",
  fontWeight: "400",
  lineHeight: "22px",
  fontFamily: 'TT',
  textAlign: "center",
};

const DropzoneComponent = (props) => {
  const [files, setFiles] = useState([]);

    useEffect(() => {
        props.changeForm('PHOTOS', files)
    }, [files])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const removeItem = (file) => {
    let newFiles = files.filter((element) => element != file) 
    setFiles(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 1024 * 1024 * 5,
    maxFiles: 10,
  });

  const fileList = files.map((file) => (
    <div key={file.name} className="file-elem">
      <img className="file-list-img" src={file.preview} alt={file.name} width='145px' height='80px'/>
      <button className="remove-elem" onClick={() => removeItem(file)}></button>
    </div>
  ));

  return (
    <div className="drop-img-zone">
    <div
      className="drop-area"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p style={DropzoneText}>
        Выберите фото или перетащите сюда
      </p>
    </div>
    <div className="file-list">{fileList}</div>
    </div>
  );
};

export default DropzoneComponent;