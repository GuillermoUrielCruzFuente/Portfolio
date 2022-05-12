type NavRoutes = {
    text: string,
    route: string
}

const routes: Array<NavRoutes> = [
    {
        text: 'inicio',
        route: '/'
    },
    {
        text: 'sobre mi',
        route: '/sobre-mi'
    },
    {
        text: 'proyectos',
        route: '/proyectos'
    },
    {
        text: 'contacto',
        route: '/contacto'
    }
]

export default routes