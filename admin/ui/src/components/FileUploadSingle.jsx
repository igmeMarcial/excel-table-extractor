import React, { useState } from 'react';

function FileUploadSingle() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    // 👇 Uploading the file using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="   w-full h-full flex bg-black bg-opacity-60">
      <div className="extraOutline p-4 bg-white  bg-whtie w-full m-auto ">
        <div
          className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
          style={{ width: '100%' }}
        >
          <svg
            className="text-#2271B1 w-24 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input
                className="text-sm cursor-pointer w-36 hidden"
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".xlsx"
              />
              <div className="text bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-600">
                Selecionar
              </div>
            </label>

            <div className="text-sm text-gray-500 uppercase">
              {/* {file && `${file.name} - ${file.type}`} */}
              {console.log(file && `${file.name} - ${file.type}`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadSingle;
