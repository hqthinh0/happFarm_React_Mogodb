import React, { useEffect, useState } from "react";

const CountdownTime = ({ time }) => {
    const [timeCountDown, setTimeCountDown] = useState(() => {
        // Retrieve the remaining time from localStorage if it exists, otherwise use the initial time
        const savedTime = localStorage.getItem('timeCountDown');
        return savedTime ? parseInt(savedTime, 10) : time;
    });

    useEffect(() => {
        const startTime = Date.now();
        let timer = setInterval(() => {
            setTimeCountDown((prevTime) => {
                const elapsedTime = 1;
                const updatedTime = prevTime - elapsedTime;

                if (updatedTime <= 0) {
                    clearInterval(timer);
                    localStorage.removeItem('timeCountDown');
                    return 0;
                } else {
                    localStorage.setItem('timeCountDown', updatedTime);
                    return updatedTime;
                }
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup the timer when the component is unmounted
    }, []);

    return (
        <p className='success--p'>
            {`${Math.floor(timeCountDown / 60).toString().padStart(2, "0")}`}:
            {`${(timeCountDown % 60).toString().padStart(2, "0")}`}
        </p>
    );
};

export default CountdownTime;