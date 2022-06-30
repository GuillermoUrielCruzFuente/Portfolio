import { BrowserRouter, Routes, Route } from 'react-router-dom'

//routes
import getRoutesWithRef from './routes/routes'
import Home from './routes/01-Home/Home'
import About from './routes/02-About/About'
import Projects from './routes/03-Projects/Projects'
import Contact from './routes/04-Contact/Contact'
import NoMatch from './routes/ZZ-NoMatch/NoMatch'

//navbar component
import Nav from './components/Nav/Nav'

const App = () => {
    return (
		<BrowserRouter>
			<Routes>
				<Route path={getRoutesWithRef()[0].path} element={<Nav />}>
					<Route index element={<Home />} />
					<Route path={getRoutesWithRef()[1].path} element={<About />} />
					<Route path={getRoutesWithRef()[2].path} element={<Projects />} />
					<Route path={getRoutesWithRef()[3].path} element={<Contact />} />
					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App