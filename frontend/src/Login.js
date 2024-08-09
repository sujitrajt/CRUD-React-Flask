import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const handleLogin = async(e) => {
        e.preventDefault()
        const data = {
            username,
            password,
        }
        console.log(data)
        const url = "http://127.0.0.1:5001/login" 
        const options = {
            method : "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url,options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        } else {
            // console.log(response)
            // const data = await response.json()
            // console.log(data)
            // console.log(response.id)
            navigate("/contacts")
        }       
    }
    return(
        <div>
            <h1>Login Component</h1>
            <form onSubmit={handleLogin}className="contact-form">
            <div>
                <label htmlFor="username">User Name: </label>
                <input type="text" id="username" value={username} placeholder="Enter your UserName" onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password"> Password </label>
                <input type="password" id="password" value={password} placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            {/* <div>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
            </div> */}
            <button type="submit">Login</button>
            <Link to="/register"><button>Register</button></Link>
        </form>
        </div>
    )
}
export default Login