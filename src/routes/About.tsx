import Nav from "../components/Nav/Nav"
import AboutCard, { AboutCardContent } from "../components/AboutCard/AboutCard"

import '../scss/pages/About/About.scss'

export default function About() {
    const cards: Array<AboutCardContent> = [
        {
            main: '+4',
            middle: 'años de',
            bottom: 'EXPERIENCIA'
        },
        {
            main: '3',
            middle: 'proyectos con',
            bottom: 'EMPRESAS'
        },
        {
            main: 'Y',
            middle: 'muchas',
            bottom: 'PRUEBAS'
        }
    ]

    return (
        <>
            <Nav transitionTime={10} callback={() => { }} />
            <header id="about">
                <p className="upper-title">sección</p>
                <h1 className="main-title">Sobre mi</h1>
                <p className="bottom-title">Lo que he hecho, hago y seguiré haciendo</p>

                <p className="about-description">Mi nombre es <span className="accent">Guillermo Cruz</span>, desarrollador FRONTEND desde hace más de 4 años, he desarrollado distintas habilidades que me permiten construir sitios web atractivos, siempre con la ayuda de tecnologías modernas, generando un flujo de trabajo óptimo y una base de código apegada a los estándares que exige la industria.</p>

                <div className="cards-container">
                    {
                        cards.map((cardContent: AboutCardContent) => {
                            return <AboutCard main={cardContent.main} middle={cardContent.middle} bottom={cardContent.bottom} key={cardContent.main} />
                        })
                    }
                </div>
            </header>
            <main>
                <section>
                    <h1>hola!</h1>
                </section>
            </main>
        </>
    )
}