import "./seller.css";
import {faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { hotelInputs } from "../../formSource";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const LoggedUser = localStorageData._id;
  
  const { data, loading, error } = useFetch(`https://houseinn1.herokuapp.com/api/users/${LoggedUser}`);
  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  /* const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  }; */
  
    

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmlb1mowp/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        photos: list,
        createdBy:LoggedUser,
      };
      /* var isAdmin = data.isAdmin; */
      const adminPermission = {
        isAdmin:1,
      }

      await axios.post("https://houseinn1.herokuapp.com/api/hotels", newHotel);
      await axios.put(`https://houseinn1.herokuapp.com/api/users/${LoggedUser}`, adminPermission); 
      navigate("/")
    } catch (err) {console.log(err)}
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1 className="h1">Add your Property</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img className="img"
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form className="form">
              <div className="formInput">
              
                <label htmlFor="file" className="label">
                Add multiple Images: <FontAwesomeIcon icon={faFileCirclePlus} className="icon" />
                </label>
                
                <input
                className="input"
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label className="label">{input.label}</label>
                  <input className="input"
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              {/* <div className="selectRooms">
                <label className="label">Rooms</label>
                <select className="select"
                id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div> */}
              <button className="button" onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;