import { useState, useEffect } from 'react';
//import axios from 'axios';
import axios from './util/axios.customsize';
import TabLoginAndRegister from './components/tabLoginAndRegister';
import { ToastConfig } from './util/Toast/Toastify';


import './assets/sass/_core.scss';

function App() {

	useEffect(() => {
		const fetchHelloAPI = async () => {
			const res = await axios.get(`/api/`);
			console.log("res", res);
		}

		fetchHelloAPI();
	}, [])

	return (
		<>
			<ToastConfig />
			{/* https://dribbble.com/shots/21110265-SOLANASHUFFLE-Login-and-Registration */}
			<section className='bacground-index'>
				<div className='box'>

					<div className='logo'>
						Happy Farm
					</div>
					<TabLoginAndRegister />

				</div>
				
			</section>
			
		</>
	)
}

export default App
