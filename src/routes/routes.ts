type NavRoutes = {
    text: string,
    path: string
}

const routes: Array<NavRoutes> = [
    {
        text: 'inicio',
        path: '/'
    },
    {
        text: 'sobre mi',
        path: '/sobre-mi'
    },
    {
        text: 'proyectos',
        path: '/proyectos'
    },
    {
        text: 'contacto',
        path: '/contacto'
    }
]

export default routes