import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//styles
import '../scss/index.scss'

//components
import Nav from './Nav'

//routes
import App from './App'
import Contact from '../routes/Contact'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Nav></Nav>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
