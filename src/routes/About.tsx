import Nav from "../components/Nav/Nav"
import AboutCard, { AboutCardContent } from "../components/AboutCard/AboutCard"

import '../scss/pages/About/About.scss'
import { useLayoutEffect } from "react"

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

    const appearElements = () => {
        let aboutElements = document.getElementsByClassName('appear')

        for (let i = 0; i < aboutElements.length; i++) {
            const element = aboutElements[i] as HTMLElement;
            element.style.opacity = '1'
        }
    }

    const hideElements = () => {
        let aboutElements = document.getElementsByClassName('appear')

        for (let i = 0; i < aboutElements.length; i++) {
            const element = aboutElements[i] as HTMLElement;
            element.style.opacity = '0'
        }
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            appearElements()
        }, 500);
    }, [])

    return (
        <>
            <Nav transitionTime={550} callback={hideElements} />
            <header id="about">
                <p className="upper-title appear">sección</p>
                <h1 className="main-title appear">Sobre mi</h1>
                <p className="bottom-title appear">Lo que he hecho, hago y seguiré haciendo</p>

                <p className="about-description appear">Mi nombre es <span className="accent">Guillermo Cruz</span>, desarrollador FRONTEND desde hace más de 4 años, he desarrollado distintas habilidades que me permiten construir sitios web atractivos, siempre con la ayuda de tecnologías modernas, generando un flujo de trabajo óptimo y una base de código apegada a los estándares que exige la industria.</p>

                <div className="cards-container appear">
                    {
                        cards.map((cardContent: AboutCardContent) => {
                            return <AboutCard main={cardContent.main} middle={cardContent.middle} bottom={cardContent.bottom} key={cardContent.main} />
                        })
                    }
                </div>

                <div className="scroll appear">
                    <p>scroll</p>
                    <span id="scroll-line"></span>
                </div>
            </header>
            <main>
                <section id="experiecia" className="split-big-title">
                    <div className="big-title">
                        <h1 className="left">
                            Experi
                            <br />
                            encia
                        </h1>
                    </div>

                    <div className="description-container">
                        <p className="desc-title right">📝Una breve explicación</p>
                        <p className="right">Durante mi segundo año de Ingeniería decidí comenzar un proyecto como desarrollador de software, mi experiencia previa abarcaba lenguajes como: C++, C#, Java, entre otros. El principal objetivo del proyecto era comenzar una agencia de desarrollo especializada en el campo agronómico (principal corte de mi Universidad). Junto a algunos compañeros registramos el proyecto en la sede de mi Departamento universitario y comenzamos buscando clientes.</p>
                    </div>
                </section>

                <section className="years">
                    <p>2018-2019-2020-2021-2022</p>
                </section>

                <section className="split-big-title reverse-row">
                    <div className="big-title">
                        <h1 className="right">
                            Pro
                            <br />
                            yectos
                        </h1>
                    </div>

                    <div className="description-container">
                        <p className="desc-title left">Lo que he hecho 🔧</p>
                        <p className="left">Durante mi segundo año de Ingeniería decidí comenzar un proyecto como desarrollador de software, mi experiencia previa abarcaba lenguajes como: C++, C#, Java, entre otros. El principal objetivo del proyecto era comenzar una agencia de desarrollo especializada en el campo agronómico (principal corte de mi Universidad). Junto a algunos compañeros registramos el proyecto en la sede de mi Departamento universitario y comenzamos buscando clientes.</p>
                    </div>
                </section>
            </main>
        </>
    )
}