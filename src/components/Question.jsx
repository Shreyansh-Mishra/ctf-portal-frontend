import React from 'react';
import './Question.css';
import axios from 'axios';
import {
    useState,
    useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
export default function Question() {
    let history = useHistory();
    let [question, setQuestion] = useState(null);
    let [isPending, setIsPending] = useState(true);
    let [answer, setAnswer] = useState('');
    let [buttonClick, setButtonClick] = useState(0);
    let [status, setStatus] = useState([null]);

    let fetchQuestion = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}user/fetchquestion`, {
            withCredentials: true,
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        }).then(res => {
            if (res.data.success) {
                setQuestion(res.data);
                setIsPending(false);
            }
            else if (res.data.success === false && res.data.msg === "CTF Completed") {
                setQuestion({
                    "question": "CTF Completed",
                    "points": null
                });
                setIsPending(false);
            }
            else if (res.data.success === false && res.data.msg === "Not Started Yet") {
                setQuestion({
                    "question": "Not Started Yet",
                    "points": null
                });
                setIsPending(false);
            }
        });
    };

    useEffect(() => {
        fetchQuestion();
        // eslint-disable-next-line
    }, [buttonClick, setStatus]);

    let handleSubmit = () => {
        if (answer.length === 0 || answer === null)
            return setStatus([false]);
        axios.post(`${process.env.REACT_APP_BACKEND}user/checkanswer`, {
            'answer': answer
        }, {
            withCredentials: true,
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        }).then(res => {
            if (res.data.answer === true) {
                setStatus([true]);
                if (buttonClick === 0) {
                    setButtonClick(1);
                } else {
                    setButtonClick(0);
                }
                setStatus([null]);
                setAnswer('');
            } else if (res.data.success === false && res.data.error === "You are on Cooldown!") {
                setStatus(["Cooldown", res.data.waitingTime]);
            }
            else {
                setStatus([false]);
            }
        });
    };

    if (localStorage.getItem("Authorization") !== null) {
        return (
            <div className="card-container">
                <div className="float-layout">
                    <div className="card-image">
                        {/* eslint-disable-next-line*/}
                        {!isPending && !question.image && <img src="" />}
                        {/* eslint-disable-next-line*/}
                        {!isPending && question.image && <img src={question.image} />}
                        <div className="card">
                            <div className="card-title">{isPending && <div>Loading...</div>}
                                {!isPending && question.question!=="Not Started Yet" && question.question!=="CTF Completed" && "Level " + question.id}<br></br>
                                {!isPending && question.question}</div><br></br>
                            {!isPending && question.link && <a rel="noreferrer" href={question.link} className="submit" style={{ "padding": "10px", "textDecoration": "none" }} target="_blank">Click Here</a>}<br></br><br></br>
                            {!isPending && question.points!==null&& <p>Points: {question.points.toFixed(2)}</p>}
                            <div className="card-desc">
                                <center><br></br><br></br><br></br>
                                    {status[0] === true && <p style={{ "color": "green" }}>Correct Answer</p>}
                                    {status[0] === false && <p style={{ "color": "red" }}>Wrong Answer</p>}
                                    {status[0] === "Cooldown" && <p style={{ "color": "yellow" }}>You are on Cooldown! Please wait for {status[1].toFixed(2)} seconds.</p>}
                                    {status[0] === null && <p></p>}
                                    {!isPending && question.question !== "CTF Completed" && question.question!=="Not Started Yet" &&
                                        <input type="text" className="answer-box" placeholder="Type your answer here..." value={answer} onChange={e => setAnswer(e.target.value)}></input>}
                                    <br></br><br></br>
                                    {!isPending && question.question !== "CTF Completed" && question.question!=="Not Started Yet" &&
                                        <input type="submit" className="submit" onClick={handleSubmit}></input>}
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        history.push('/login');
        return null;
    }
}