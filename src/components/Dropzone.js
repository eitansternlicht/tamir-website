import React, { useCallback } from 'react';
import _ from 'mori';
import { useDropzone } from 'react-dropzone';
import { filesToAOAs } from '../utils/excell-utils';

const to_json = function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    console.log(sheetName);

    // var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
    // if (roa.length) result[sheetName] = roa;
  });
  return JSON.stringify(result, 2, 2);
};
const Dropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    // 	const result = {};
    // 	workbook.SheetNames.forEach(function(sheetName) {
    // 		const roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
    //     if(roa.length)
    //       result[sheetName] = roa;
    // 	});
    // 	return JSON.stringify(result, 2, 2);
    // }

    filesToAOAs(acceptedFiles).then(aoas => {
      console.log(aoas);
      // _.each(aoas[0], n => {
      //   console.log('hello');
      //   console.log(_.toJs(n));
      // });
    });
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
