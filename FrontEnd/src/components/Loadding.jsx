import React, { useState, useEffect } from 'react';

const Loading = () => {

    const [count, setCount] = useState(0);
    useEffect(() => {
        if (count < 100) {
            const interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 60); // Tăng 1 đơn vị mỗi 30ms, có thể điều chỉnh thời gian cho phù hợp
            return () => clearInterval(interval); // Xóa interval khi unmount hoặc khi đạt đến 100
        }
    }, [count]);
    const wrapperClass = count === 100 ? ' completed' : 'loadding';

    return (<>
        <div className={wrapperClass}>
            <div className='body'>
                <div className="wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <span>Loading: {count}%</span>
                </div>
            </div>
        </div>
    </>)

}

export default Loading;