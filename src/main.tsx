import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//styles
import './scss/index.scss'

//routes
import Home from './routes/Home'
import Contact from './routes/Contact'
import Work from './routes/Work'
import About from './routes/About'
import NoMatch from './routes/404'


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/work' element={<Work />} />
				<Route path='/about' element={<About />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
