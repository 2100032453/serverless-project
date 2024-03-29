import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "./Upload";
import "./Home.css"; // Import CSS file for styling

const Home = () => {
  const [files, setFiles] = useState([]);
  const username = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchFileUrls();
  }, []);

  const fetchFileUrls = async () => {
    try {
      const response = await axios.get(
        `https://sr83i1spfi.execute-api.us-east-1.amazonaws.com/prod/getObjects/${username}`
      );
      console.log("Response:", response);

      const responseData = response.data;
      if (responseData && Array.isArray(responseData.body)) {
        setFiles(
          responseData.body.map((file, index) => ({
            name: `File ${index + 1}`,
            fileName: file.fileName,
            link: file.url,
          }))
        );
      } else {
        console.error("Invalid response format:", responseData);
      }
    } catch (error) {
      console.error("Error fetching file URLs:", error);
    }
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleDelete = async (fileName) => {
    try {
      const response = await axios.post(
        `https://sr83i1spfi.execute-api.us-east-1.amazonaws.com/prod/deleteObject/${username}/${fileName}`
      );
      console.log("Delete Response:", response);
      // Refresh file list after deletion
      fetchFileUrls();
      // Show alert for successful deletion
      window.alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="container">
      <FileUpload />
      <h1>Uploaded Files</h1>
      <table className="file-table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{file.fileName}</td>
              <td>
                <button onClick={() => handleDownload(file.link)}>Download</button>
                <button className="button1" onClick={() => handleDelete(file.fileName)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
