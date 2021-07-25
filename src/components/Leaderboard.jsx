import React from 'react'
import './Leaderboard.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import Leader from './Leader'
export default function Leaderboard() {

    let [users, setUsers] = useState(null);
    let [isPending, setIsPending] = useState(true);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND}user/leaderboard`).then(res=>{
            console.log(res);
            setUsers(res.data.leaderboard);
            setIsPending(false);
        })
    },[])

    return (
            <div><center>
                {isPending && <div style={{"color":"aliceblue"}}>Fetching Leaderboard...</div>}
                {!isPending && <table>
                        <tr className="heading">
                            <td><b>Rank</b></td>
                            <td><b>Username</b></td>
                            <td><b>Points</b></td>
                        </tr>
                        {users.map(user=>{
                            return <Leader user={user}></Leader>
                        })}                      
                </table>}
                </center></div>
    )
}
