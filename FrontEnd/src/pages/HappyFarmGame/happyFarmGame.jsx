import React, { useEffect, useState } from 'react';
import './loadding.scss';
import './index.scss';
import Loading from '../../components/Loadding';



const HappyFarmGameIndex = () => {
    // Simulate loading completion after some time (e.g., 3 seconds)
    return (
        <>
            <Loading />

            <section id='gameIndex'>
                <div className='backgroundgame'>

                </div>
            </section>
        </>
    );
}

export default HappyFarmGameIndex;