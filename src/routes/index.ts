export type Pages = 'Home' | 'About' | 'Projects' | 'Blog' | 'Contact'

export type PagesDictionary<T> = {
	[Page in Pages]: T
}

export type AppRoute = {
	text: string
	path: string
}

export const AppRoutes: PagesDictionary<AppRoute> = {
	Home: {
		path: '/',
		text: 'Inicio',
	},
	About: {
		path: '/sobre-mi',
		text: 'Sobre mí',
	},
	Projects: {
		path: '/proyectos',
		text: 'Proyectos',
	},
	Blog: {
		path: '/blog',
		text: 'Blog',
	},
	Contact: {
		path: '/contacto',
		text: 'Contacto 👋',
	},
}

export const routes = Object.values(AppRoutes)
