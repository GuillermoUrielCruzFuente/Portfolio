import { BrowserRouter, Routes, Route } from 'react-router-dom'

//routes
import Home from './routes/01-Home/Home'
import About from './routes/02-About/About'
import Projects from './routes/03-Projects/Projects'
import Contact from './routes/04-Contact/Contact'
import NoMatch from './routes/ZZ-NoMatch/NoMatch'

//navbar component
import Nav from './components/Nav/Nav'

import { AppRoutes } from '@/routes'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Nav />}>
					<Route index element={<Home />} />
					<Route path={AppRoutes.About.path} element={<About />} />
					<Route
						path={AppRoutes.Projects.path}
						element={<Projects />}
					/>
					<Route
						path={AppRoutes.Contact.path}
						element={<Contact />}
					/>
					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
