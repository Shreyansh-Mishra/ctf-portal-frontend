import React from 'react'
import "./Leaderboard.css"
export default function Leader({user}) {
    return (
        <>
            <tr className="table-content">
                <td>{user.rank}</td>
                <td>{user.username}</td>
                <td>{user.score.toFixed(2)}</td>
            </tr>
        </>
    )
}
