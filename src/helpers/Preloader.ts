const hidePreloader = () => {
    window.addEventListener('load', () => {
        let preloader = document.getElementById('preloader') as HTMLElement        
        preloader.style.transform = 'translateY(-100%)'
        preloader.addEventListener('transitionend', () => {
            preloader.style.visibility = 'hidden'
        })
    })
}

export default hidePreloader