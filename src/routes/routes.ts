import { MutableRefObject, useRef } from 'react'

export type RouteWithRef = {
	text: string
	path: string
	ref: MutableRefObject<null>
}

const getRoutesWithRef = () => {
	return [
		{
			text: 'inicio',
			path: '/',
			ref: useRef(null),
		},
		{
			text: 'sobre mí',
			path: '/sobre-mi',
			ref: useRef(null),
		},
		{
			text: 'proyectos',
			path: '/proyectos',
			ref: useRef(null),
		},
		{
			text: 'contacto',
			path: '/contacto',
			ref: useRef(null),
		},
	]
}

export default getRoutesWithRef
