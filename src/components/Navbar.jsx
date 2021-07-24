import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom';
import {
    useEffect,
    useState
} from 'react'
import axios from 'axios'
export default function Navbar({isLoggedIn}) {
    let [score, setScore] = useState(0);
    let [isPending, setIsPending] = useState(true);

    function handleSignout(){
        localStorage.removeItem("Authorization");
        // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

    }

    function fetchScore() {
        axios.get(`${process.env.REACT_APP_BACKEND}user/getscore`, {
            withCredentials: true,
            crossDomain: true,
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        }).then((res) => {
            if (res.data.success) {
                setScore(res.data.score);
                setIsPending(false);
            } else {
                setScore(0);
                setIsPending(true);
            }
        })
    }
    fetchScore();
    useEffect(() => {
        setInterval(() => {
            fetchScore();
        }, 1000 * 30)
    }, [])
return (
<div className="nav box-shadow">
    <div className="nav-header">
        <div className="nav-title">
        {isLoggedIn &&<Link to="/" style={{"color":"#efefef","textDecoration":"none"}}><b>Home</b></Link>}
        </div>
    </div>
    <div className="nav-btn">
        <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
        </label>
    </div>

    <div className="nav-links">
        {!isLoggedIn && <Link to="/signup" style={{"color":"#efefef","textDecoration":"none"}}>Register</Link>}
        {!isLoggedIn && <Link to="/Login" style={{"color":"#efefef","textDecoration":"none"}}>Login</Link>}
        <Link to="/leaderboard">☆ Leaderboard</Link>
        {/* eslint-disable-next-line*/}
        {isLoggedIn && isPending &&<a> Your Score: Loading</a>}
        {/* eslint-disable-next-line*/}
        {isLoggedIn && !isPending&&<a>Your Score: {score.toFixed(2)}</a>}
        {isLoggedIn && <a href="/login" onClick={handleSignout} >Signout</a>}
    </div>
</div>
)
}