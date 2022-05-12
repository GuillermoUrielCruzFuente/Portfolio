import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//styles
import './scss/index.scss'

//
import routes from './routes/routes'
import Home from './routes/Home'
import Contact from './routes/Contact'
import Work from './routes/Work'
import About from './routes/About'
import NoMatch from './routes/404'

document.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.code === 'ArrowUp' && event.shiftKey) {
		window.scrollTo(0, 0)
	}
})

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path={routes[0].route} element={<Home />} />
				<Route path={routes[1].route} element={<About />} />
				<Route path={routes[2].route} element={<Work />} />
				<Route path={routes[3].route} element={<Contact />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
