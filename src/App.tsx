import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AppRoutes } from "@/routes";
import { PageTransition } from "@components/PageTransition";

import Nav from "@components/Nav/Nav";

import { Home } from "@routes/Home";
import { About } from "@routes/About";
import { Projects } from "@routes/Projects";
import { Contact } from "@routes/Contact";
import { NoMatch } from "@routes/NoMatch";

const App = () => {
	const location = useLocation();

	return (
		<>
			<Nav />

			<AnimatePresence mode="wait">
				<Routes
					key={location.pathname}
					location={location}
				>
					<Route
						index
						element={
							<PageTransition>
								<Home />
							</PageTransition>
						}
					/>

					<Route
						path={AppRoutes.About.path}
						element={
							<PageTransition>
								<About />
							</PageTransition>
						}
					/>

					<Route
						path={AppRoutes.Projects.path}
						element={
							<PageTransition>
								<Projects />
							</PageTransition>
						}
					/>

					<Route
						path={AppRoutes.Contact.path}
						element={
							<PageTransition>
								<Contact />
							</PageTransition>
						}
					/>

					<Route
						path="*"
						element={
							<PageTransition>
								<NoMatch />
							</PageTransition>
						}
					/>
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default App;
