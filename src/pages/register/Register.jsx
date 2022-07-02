import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import axios from "axios";

function Register({inputs}) {
    const [credentials, setCredentials] = useState({});
      
    const navigate = useNavigate()
    

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const newUser = {
        ...credentials,
      };

    const handleClick = async () => {
        try{
            await axios.post("http://localhost:8000/api/auth/register",newUser )
            navigate("/login")
        }catch(err){
            console.log(err);
        };
    };
    

  return (
    <div className='register'>
        <div className="Container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">House Inn</span>
        </Link>
        {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
        <button onClick={handleClick} className="Button">
          Register
        </button>
        <Link to="/login">
        <span className="newButton">Already have an account?</span>
        </Link>
      </div>
    </div>
  )
}

export default Register