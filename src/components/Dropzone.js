import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import readerToAOA from '../utils/excell-utils';

const Dropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(acceptedFiles[0]);
    reader.onload = () => {
      console.log('values', readerToAOA(reader));
    };
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export { Dropzone };
