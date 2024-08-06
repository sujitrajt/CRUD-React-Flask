import React, {useState }from "react";
const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const handleFileChange = (event) => {

        setSelectedFile(event.target.files[0])
        console.log(selectedFile)
    }
    const handleUpload = async () => {
        console.log(selectedFile)
        // console.log("Upload function")
        if(!selectedFile) {
            alert('Please select a file first')
            return 
        }
        const formData = new FormData();
        formData.append('file',selectedFile)

        try {
            const response = await fetch('http://127.0.0.1:5001/upload',{
                method:'POST',
                body:formData
            });
            const data = await response.json();
            if(response.ok){
                console.log(data)
                setUploadedImageUrl(`http://127.0.0.1:5001/uploads/${data.id}`);
                console.log("File uploaded succesfully")
            }
            else{
                console.log(data.error);
            }
        } catch(error){
            console.log('Error Uploading the Image',error)
        }

    }
    return(
        <div>
            <h1>Image Upload</h1>
            <input type="file" name="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {uploadedImageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={uploadedImageUrl} alt="Uploaded" style={{ width: '300px' }} />
                </div>
            )}
        </div>
    )
}
export default ImageUpload