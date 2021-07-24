import React from 'react'
import './Signup.css'
import axios from 'axios'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'
export default function Signup() {
    let history = useHistory();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(true);
    let handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND}auth/signup`,{username,email,password}).then(res=>{
            if(res.data.success){
                history.push('/login');
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
                    <p className="form_label">Register</p>
                    <form>
                        {!status&&<p style={{"color":"red"}}>Already Registered!</p>}
                        <p><input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} /></p>
                        <p><input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></p>
                        <p><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></p>
                        <p><input type="submit" value="Signup" onClick={(e)=>handleSubmit(e)} /></p>
                    </form>
                </div>
            </div>
        )
    
    }
    else{
        history.push('/');
        return null;
    }
}
