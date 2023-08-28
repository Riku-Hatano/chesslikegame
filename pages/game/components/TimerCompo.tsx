import { useState, useEffect } from "react";

const TimerCompo = () => {
    const [remainingTime, setRemainingTime] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev: number) => prev - 1);
        }, 1000)
        
        return () => {
            clearInterval(timer);
        }
    })
    return (
        <div>
            Remaining Time: { remainingTime }
        </div>
    )
}

export default TimerCompo;