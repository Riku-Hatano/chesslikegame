import { useState, useEffect } from "react";

const TimerCompo = () => {
    const [remainingTime, setRemainingTime] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev: number) => prev - 1);
        }, 1000)

        if(remainingTime < 1) {
            clearInterval(timer);
        }
        
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