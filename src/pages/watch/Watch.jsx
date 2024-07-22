import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const video = new URLSearchParams(location.search).get('video_uri');
  console.log(video);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={video} />
    </div>
  );
};

export default Watch;
