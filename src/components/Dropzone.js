import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { filesToAOAs, aoaToFile } from '../utils/excell-utils';

const Dropzone = ({ onGetFile }) => {
  const onDrop = useCallback(acceptedFiles => {
    filesToAOAs(acceptedFiles).then(aoas => {
      console.log("aa", aoas[0].aoa);
      onGetFile(aoas[0].aoa);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <svg border='3' xmlns="http://www.w3.org/2000/svg" width="100%" height="400" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
      ) : (
          <svg border='3' xmlns="http://www.w3.org/2000/svg" width="100%" height="400" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
        )}
    </div>
  );
};

export default Dropzone;
