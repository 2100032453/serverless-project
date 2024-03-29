import AWS from "aws-sdk";
import { useState } from "react";


function Upload() {
  // const { id } = useParams();
  const id = localStorage.getItem('userEmail');
  // Create state to store file and form data
  const [file, setFile] = useState(null);
  const [fileDetails, setfileDetails] = useState({
    fileName: ""
  });

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setfileDetails({
      ...fileDetails,
      [name]: value
    });
  };

  // Function to upload file to s3 along with form data
  const uploadFile = async () => {
    if (!file ) {
      alert("Please fill all the fields.");
      return;
    }

    

    // Your S3 configurations
    const S3_BUCKET = "s3buckect--project";
    const REGION = "us-east-1";
    AWS.config.update({
      accessKeyId: "YOURAWSACCESSKEY",
      secretAccessKey: "YOURSECRETACESSKEY",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    
    const type= file.name.split('.')
    const fileType = type[type.length-1];
    console.log(fileType);
    const params = {
      Bucket: S3_BUCKET,
      Key: id + "---" + fileDetails.fileName +"---."+fileType,
      Body: file,
    };

    // Uploading file to S3
    try {
      await s3.putObject(params).promise();
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("Failed to upload file.");
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="file-upload-container">
      <h2>Upload File</h2>
      <div className="form-container">
        <input type="text" name="fileName" placeholder="File Name" onChange={handleInputChange} />
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
      
    </div>
  );
}

export default Upload;
