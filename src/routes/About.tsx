import Nav from "../components/Nav/Nav"
import AboutCard, { AboutCardContent } from "../components/AboutCard/AboutCard"

import '../scss/pages/About/About.scss'
import { useLayoutEffect } from "react"
import TextAnimation from "../helpers/TextAnimation"

import HTMLImg from '../static/img/icons/about-experience/html.svg'
import CSSImg from '../static/img/icons/about-experience/css.svg'
import SCSSImg from '../static/img/icons/about-experience/sass.svg'
import JSImg from '../static/img/icons/about-experience/js.svg'
import TSImg from '../static/img/icons/about-experience/ts.svg'
import ViteImg from '../static/img/icons/about-experience/vite.svg'
import ReactImg from '../static/img/icons/about-experience/react.svg'
import VueImg from '../static/img/icons/about-experience/vue.svg'

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


    

    const images = [
        HTMLImg,
        CSSImg,
        SCSSImg,
        JSImg,
        TSImg,
        ViteImg,
        ReactImg,
        VueImg
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
        const firstTitle = new TextAnimation({
            textContainerID: 'experience',
            animationName: 'letterEntry',
            classForWrapper: 'letter',
            letterAnimDuration: 800,
            delay: 50
        })

        const secondTitle = new TextAnimation({
            textContainerID: 'education',
            animationName: 'letterEntry',
            classForWrapper: 'letter',
            letterAnimDuration: 800,
            delay: 50
        })

        const thirdTitle = new TextAnimation({
            textContainerID: 'hobbies',
            animationName: 'letterEntry',
            classForWrapper: 'letter',
            letterAnimDuration: 800,
            delay: 50
        })

        setTimeout(() => {
            appearElements()
            firstTitle.animate()
            secondTitle.animate()
            thirdTitle.animate()
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
            <main className="appear">
                <section id="experiecia" className="split-big-title">
                    <div className="big-title">
                        <h1 className="left" id="experience">Experiencia</h1>
                        <p className="desc-title left">📝Una breve explicación</p>
                    </div>

                    <div className="description-container">
                        {/* <p className="desc-title right">📝Una breve explicación</p> */}
                        <p className="right">Aproximadamente <span className="accent">hace 4 años</span> comencé con el desarrollo web, impulsado principalmente por resolver las necesidades de una empresa enfocada en la venta de agroinsumos, desarrollé su landing page y descubrí lo interesante y entretenido que resultaba el <span className="accent">frontend</span>.<br /><br />A día de hoy he mejorado mi flujo de trabajo mediante  la adopción de distintas herramientas y lenguajes, por ejemplo, css se ha covertido en <span className="accent">SCSS</span>, JavaScript en <span className="accent">TypeScript</span> y el insulso LiveServer en <span className="accent">ViteJS</span>, además he conocido el poder de bibliotecas como <span className="accent">React</span>, <span className="accent">Vue</span> y <span className="accent">Svelte</span>, que no me atrevería a mencionar que las domino, sin embargo las he adoptado progresivamente en  escenarios donde el posicionamiento no es un problema y vaya que generan un cambio en el flujo de trabajo. Probablemente mi siguiente meta sea la adopción de frameworks ssr como <span className="accent">NextJS</span> o <span className="accent">NuxtJS</span></p>
                    </div>
                </section>

                <section className="years">
                    {
                        images.map(img => <img src={img} alt="" key={img}/>)
                    }
                </section>

                <section className="split-big-title reverse-row">
                    <div className="big-title">
                        <h1 className="right" id="education">Educación</h1>

                        <p className="desc-title right">¿Aprendí algo en la universidad?📜</p>
                    </div>

                    <div className="description-container">
                        <p className="left">Quizá este sea el tema menos alentador en este portafolio. Comencé mis estudios universitarios como casi todos lo hacen, con grandes aspiraciones y metas, si embargo una gran cantidad de factores influyeron en mi deserción.<br /><br />Comencé mis estudios universitarios en la <span className="accent">Universidad Autónoma Chapingo</span>, me apunté a la <span className="accent">primer generación de ingenieros mecatrónicos especializados en la rama agronómica</span>, es aqui donde reforcé mi gusto por la programación con lenguajes como <span className="accent">C</span>, <span className="accent">C++</span>, <span className="accent">C#</span> y <span className="accent">Java</span>, las clases de métodos numéricos pasaban como agua entre mis manos y mis compañeros y yo creábamos mancuernas de excelencia.<br /><br />Ante la llegada del <span className="accent">COVID-19</span> y las clases en línea muchas aspiraciones y deseos tuvieron que verse truncados, pues la nueva realidad no contribuía ni un poco a su realización, así decidí embarcarme en lo que sería un nuevo yo, enfocado en el <span className="accent">desarrollo web</span>.</p>
                    </div>
                </section>

                <section className="years">
                    <p>INGENIERÍA MECATRÓNICA AGRÍCOLA</p>
                </section>

                <section id="experiecia" className="split-big-title">
                    <div className="big-title">
                        <h1 className="left" id="hobbies">Hobbies</h1>

                        <p className="desc-title left">🎧¿qué hago sino estoy programando?</p>
                    </div>

                    <div className="description-container">
                        <p className="right">A lo largo de mi corta vida he desarrollado varios hobbies. Por ejemplo, me he enganchado a la <span className="accent">acuariofilia</span> especialmente el aquascaping, paisajismo en acuarios de agua dulce, he <span className="accent">jugado videojuegos</span> una cantidad de horas bastante considerable, he doblado papel por días enteros (<span className="accent">Origami</span>) y  sin embargo, siempre hay un factor en común, la <span className="accent">música</span>. Quizá resulte gracioso, pero me autodenominaría como <span className="accent">melómano</span>, me encanta investigar, leer y adentrarme en el mundo de la música, la gente que la crea e interpreta. Podría pasar horas hablando de las bandas que me gustan, de su historia y de los mensajes que vierten en sus líricas.</p>
                    </div>
                </section>
            </main>
        </>
    )
}