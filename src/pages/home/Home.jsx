import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./home.scss";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  console.log(lists);
  useEffect(() => {
    const getRandomLists = async () => {
      console.log("fetching lists...");
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/lists${type ? "?type="+type : ""}${genre ? "&genre="+genre : ""}`, {
            headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzc2Y2VmYTJkODkwZmQwYWE1NDRiNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDEzNDk0OCwiZXhwIjoxNjc0NTY2OTQ4fQ.5k_xujgeUfupdXFFCRpEify4eMtcTo6fYLkObI9TUa0"
            }
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list)=>{
        return <List list={list}/>
      })}
    </div>
  );
};

export default Home;
