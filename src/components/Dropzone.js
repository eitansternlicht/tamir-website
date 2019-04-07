import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import XLSX from "xlsx";

const nextChar = c => {
  return String.fromCharCode(c.charCodeAt(0) + 1);
};
const generateKeys = ([start, last]) => {
  const keys = [];
  for (let number = parseInt(start[1]); number <= parseInt(last[1]); number++) {
    keys[number - 1] = [];
    for (let letter = start[0]; letter <= last[0]; letter = nextChar(letter)) {
      const letterIndex = letter.charCodeAt(0) - 65;
      keys[number - 1][letterIndex] = letter + number;
    }
  }
  return keys;
};
const mapKeysToValues = (worksheet, keys) => {
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys[i].length; j++) {
      const key = keys[i][j];
      const cell = worksheet.Sheets[worksheet.SheetNames[0]][key];
      keys[i][j] = cell ? cell.v : undefined;
    }
  }
  return keys;
};
const Dropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(acceptedFiles[0]);
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const worksheet = XLSX.read(data, { type: "array" });
      const keys = generateKeys(
        worksheet.Sheets[worksheet.SheetNames[0]]["!ref"].split(":")
      );
      const values = mapKeysToValues(worksheet, keys);
      console.log("values", values);
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
