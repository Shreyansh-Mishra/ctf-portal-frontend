import React from 'react'
import './Signup.css'
import axios from 'axios'
import {useState} from 'react'
export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(true);
    let handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND}auth/login`,{username,password}).then(res=>{
            if(res.data.success){
                localStorage.setItem("Authorization",res.data.token);
                // document.cookie = `Authorization=${res.data.token};max-age=${60*60*24*7};`
                window.location.href = "/"
            }
            else{
                setStatus(false);
            }
        })
    }
    
    if(localStorage.getItem("Authorization")===null){
        return (
            <div id="wrapper">
                <div className="form_div">
                    <p className="form_label">Login</p>
                    <form>
                        {!status&&<p>Incorrect Credentials!</p>}
                        <p><input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} /></p>
                        <p><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></p>
                        <p><input type="submit" value="Login" onClick={(e)=>handleSubmit(e)} /></p>
                    </form>
                </div>
            </div>
        )
    }
    else{
        window.location.href="/"
        return null;
    }
}
