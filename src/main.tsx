import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

//styles
import './scss/index.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

//
// import routes from './routes/routes'
// import Home from './routes/01-Home/Home'
// import Contact from './routes/04-Contact/Contact'
// import Work from './routes/03-Projects/Projects'
// import About from './routes/02-About/About'
// import NoMatch from './routes/ZZ-NoMatch/NoMatch'

// document.addEventListener('keydown', (event: KeyboardEvent) => {
// 	if (event.code === 'ArrowUp' && event.shiftKey) {
// 		window.scrollTo(0, 0)
// 	}
// })

// ReactDOM.render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<Routes>
// 				<Route path={routes[0].path} element={<Home />} />
// 				<Route path={routes[1].path} element={<About />} />
// 				<Route path={routes[2].path} element={<Work />} />
// 				<Route path={routes[3].path} element={<Contact />} />
// 				<Route path='*' element={<NoMatch />} />
// 			</Routes>
// 		</BrowserRouter>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// )
