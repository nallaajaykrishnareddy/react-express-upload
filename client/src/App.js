import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
  );
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const progresspc = progress + '%';
  const handleChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      var config = {
        onUploadProgress: progressEvent => {
          const uploadStatus = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(uploadStatus);
            setProgress(uploadStatus);
        }
      };
      const data = new FormData();
      data.append("file", image);
      const res = await axios.post("/upload", data,config);
      // setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1 className="text-center text-success">FILE UPLOAD</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile02"
                  onChange={handleChange}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile02">
                  Choose file
                </label>
              </div>
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={handleUpload}
            >
              upload image
            </button>
            <br />
            {loading ? (
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: progresspc }}
                >
                  {progresspc}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="col-sm-6">
            <div className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={preview} alt="no image" />
              <div className="card-body">
                <p className="card-text">Image Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
