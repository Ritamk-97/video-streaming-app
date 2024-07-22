import React, { useState } from "react";
import "./adminPage.scss";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import axios from "axios";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  // const [imgTitle, setImgTitle] = useState("");
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState("");
  const [genre, setGenre] = useState("");
  const [isSeries, setIsSeries] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [button, setButton] = useState("upload");
  const [movieUploads, setMovieUploads] = useState({
    img: "",
    imgSm: "",
    trailer: "",
    video: "",
  });

  const handleVideoType = (e) => {
    if (e.target.checked && e.target.value === "series") setIsSeries(true);
    else setIsSeries(false);
  };

  const handleUpload = () => {
    setButton("Uploading..");
    const uploadItems = [
      { file: img, label: "img" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ];
    uploadItems.forEach((item) => {
      if (item.file) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, item.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} % done for ${item.label}`);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMovieUploads((prev) => {
                return { ...prev, [item.label]: downloadURL };
              });
              setUploaded((prev) => prev + 1);
            });
          }
        );
      }
    });
  };
  const handleAdd = async () => {
    const newMovie = {
      title,
      desc,
      img: movieUploads["img"],
      // imgTitle,
      imgSm: movieUploads["imgSm"],
      trailer: movieUploads["trailer"],
      video: movieUploads["video"],
      year,
      limit,
      genre,
      isSeries,
    };
    console.log(newMovie);
    console.log(process.env.REACT_APP_BASE_URL);
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/movies`, newMovie, {
      headers: {
        'content-type': 'application/json',
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzc2Y2VmYTJkODkwZmQwYWE1NDRiNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDEyNzA2MSwiZXhwIjoxNjc0NTU5MDYxfQ.oZRDOEsHfUNOqZmjRVLDsBQ-7pXnCrnzIgSVwuTDGq0"
      },
    });
    console.log(res);
  };
  return (
    <div className="adminPage">
      <div className="movieInputForm">
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <label htmlFor="poster">Poster</label>
        <input
          type="file"
          style={{ display: "none" }}
          id="poster"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* <input
          type="text"
          placeholder="movie name"
          onChange={(e) => setImgTitle(e.target.value)}
        /> */}
        <label htmlFor="ThumbImg">Thumbnail</label>
        <input
          type="file"
          style={{ display: "none" }}
          id="ThumbImg"
          onChange={(e) => setImgSm(e.target.files[0])}
        />
        <label htmlFor="trailerVideo">Trailer Video</label>
        <input
          type="file"
          style={{ display: "none" }}
          id="trailerVideo"
          onChange={(e) => setTrailer(e.target.files[0])}
        />
        <label htmlFor="video">Video</label>
        <input
          type="file"
          style={{ display: "none" }}
          id="video"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="year"
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="limit"
          onChange={(e) => setLimit(e.target.value)}
        />
        <input
          type="text"
          placeholder="genre"
          onChange={(e) => setGenre(e.target.value)}
        />
        <label htmlFor="btnOne">Series</label>
        <input
          type="radio"
          id="btnOne"
          name="videoType"
          value="series"
          onClick={(e) => handleVideoType(e)}
        />
        <label htmlFor="btnTwo">Movie</label>
        <input
          type="radio"
          id="btnTwo"
          name="videoType"
          value="movie"
          onClick={(e) => handleVideoType(e)}
        />
        {uploaded === 4 ? (
          <button onClick={handleAdd}>Add</button>
        ) : (
          <button onClick={handleUpload}>{button}</button>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
