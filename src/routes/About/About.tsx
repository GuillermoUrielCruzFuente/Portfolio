import { AboutCard, AboutCardAttributes } from "@components/AboutCard";
import { AnimatedTitle } from "@components/AnimatedTitle";
import { IntersectionContainer } from "@components/IntersectionContainer";
import { ScrollDown } from "@components/ScrollDown";
import { cards } from "@/data/AboutCardsData";
import { techImages, hobbiesImages, ImageProps } from "@/helpers/imports/AboutImports";
import { PageContainer } from "@components/PageContainer";
import styles from "./About.module.scss";

const About = () => {
	return (
		<>
			<PageContainer
				className={styles["hero-container"]}
				addNavbarMarginTop
				fillVerticalViewport
			>
				<h1 className={styles["main-title"]}>Sobre mí</h1>

				<p className={styles["bottom-title"]}>
					Lo que he hecho, hago y seguiré haciendo (pero mejor)
				</p>

				<p className={styles["about-description"]}>
					Mi nombre es <span className={styles["accent"]}>Guillermo Cruz</span>,
					desarrollador FRONTEND desde hace más de 3 años, he desarrollado distintas
					habilidades que me permiten construir sitios web atractivos, siempre con la
					ayuda de tecnologías modernas, generando un flujo de trabajo óptimo y una base
					de código apegada a los estándares que exige la industria.
				</p>

				<div className={styles["cards-container"]}>
					{cards.map((cardContent: AboutCardAttributes) => (
						<AboutCard
							{...cardContent}
							key={cardContent.main}
						/>
					))}
				</div>

				<ScrollDown />
			</PageContainer>

			<main className={styles["about-main"]}>
				<PageContainer className={styles["split-big-title"]}>
					<div className={styles["big-title"]}>
						<AnimatedTitle
							items={["EXPERI", "ENCIA"]}
							alignment="left"
							textClass={styles["titles"]}
						/>

						<p className={styles["desc-title"] + " " + styles["left"]}>
							📝Una breve explicación
						</p>
					</div>

					<div className={styles["description-container"]}>
						<IntersectionContainer
							from={{
								opacity: "0",
								transform: "translateY(40px)",
							}}
							to={{
								opacity: "1",
								transform: "translateY(0px)",
							}}
							transitionTime={1000}
						>
							<div>
								<p className={styles["right"]}>
									Aproximadamente{" "}
									<span className={styles["accent"]}>hace 3 años</span> comencé
									con el desarrollo web, impulsado principalmente por resolver las
									necesidades de una empresa enfocada en la venta de agroinsumos,
									desarrollé su landing page y descubrí lo interesante y
									entretenido que resultaba el{" "}
									<span className={styles["accent"]}>frontend</span>
									.<br />
									<br />A día de hoy he mejorado mi flujo de trabajo mediante la
									adopción de distintas herramientas y lenguajes, por ejemplo, css
									se ha covertido en{" "}
									<span className={styles["accent"]}>SCSS</span>, JavaScript en{" "}
									<span className={styles["accent"]}>TypeScript</span> y el
									insulso LiveServer en{" "}
									<span className={styles["accent"]}>ViteJS</span>, además he
									conocido el poder de bibliotecas como{" "}
									<span className={styles["accent"]}>React</span>,{" "}
									<span className={styles["accent"]}>Vue</span> y{" "}
									<span className={styles["accent"]}>Svelte</span>, que no me
									atrevería a mencionar que las domino, sin embargo las he
									adoptado progresivamente en escenarios donde el posicionamiento
									no es un problema y vaya que generan un cambio en el flujo de
									trabajo. Probablemente mi siguiente meta sea la adopción de
									frameworks ssr como{" "}
									<span className={styles["accent"]}>NextJS</span> o{" "}
									<span className={styles["accent"]}>NuxtJS</span>
								</p>
							</div>
						</IntersectionContainer>
					</div>
				</PageContainer>

				<section className={styles["row-container"]}>
					<div className={styles["tech-images"]}>
						{techImages.map((img) => (
							<img
								src={img}
								alt=""
								key={img}
							/>
						))}
					</div>
				</section>

				<PageContainer className={styles["split-big-title"] + " " + styles["reverse-row"]}>
					<div className={styles["big-title"]}>
						<AnimatedTitle
							items={["EDUCA", "CIÓN"]}
							alignment="right"
							textClass={styles["titles"]}
						/>
						<p className={styles["desc-title"] + " " + styles["right"]}>
							¿Aprendí algo en la universidad?📜
						</p>
					</div>

					<div className={styles["description-container"]}>
						<IntersectionContainer
							from={{
								opacity: "0",
								transform: "translateY(40px)",
							}}
							to={{
								opacity: "1",
								transform: "translateY(0px)",
							}}
							transitionTime={1000}
						>
							<div>
								<p className={styles["left"]}>
									Quizá este sea el tema menos alentador en este portafolio.
									Comencé mis estudios universitarios como casi todos lo hacen,
									con grandes aspiraciones y metas, si embargo una gran cantidad
									de factores influyeron en mi deserción.
									<br />
									<br />
									Comencé mis estudios universitarios en la{" "}
									<span className={styles["accent"]}>
										Universidad Autónoma Chapingo
									</span>
									, me apunté a la{" "}
									<span className={styles["accent"]}>
										primer generación de ingenieros mecatrónicos especializados
										en la rama agronómica
									</span>
									, es aqui donde reforcé mi gusto por la programación con
									lenguajes como <span className={styles["accent"]}>C</span>,{" "}
									<span className={styles["accent"]}>C++</span>,{" "}
									<span className={styles["accent"]}>C#</span> y{" "}
									<span className={styles["accent"]}>Java</span>, las clases de
									métodos numéricos pasaban como agua entre mis manos y mis
									compañeros y yo creábamos equipos de excelencia.
									<br />
									<br />
									Ante la llegada del{" "}
									<span className={styles["accent"]}>COVID-19</span> y las clases
									en línea muchas aspiraciones y deseos tuvieron que verse
									truncados, pues la nueva realidad no contribuía ni un poco a su
									realización, así es como decidí embarcarme en lo que sería un
									nuevo yo, enfocado en el{" "}
									<span className={styles["accent"]}>desarrollo web</span>.
								</p>
							</div>
						</IntersectionContainer>
					</div>
				</PageContainer>

				<section className={styles["row-container"]}>
					<div>
						<p>INGENIERÍA MECATRÓNICA AGRÍCOLA</p>
					</div>
				</section>

				<PageContainer className={styles["split-big-title"]}>
					<div className={styles["big-title"]}>
						<AnimatedTitle
							items={["HOB", "BIES"]}
							alignment="left"
							textClass={styles["titles"]}
						/>
						<p className={styles["desc-title"] + " " + styles["left"]}>
							🎧¿qué hago sino estoy programando?
						</p>
					</div>

					<div className={styles["description-container"]}>
						<IntersectionContainer
							from={{
								opacity: "0",
								transform: "translateY(40px)",
							}}
							to={{
								opacity: "1",
								transform: "translateY(0px)",
							}}
							transitionTime={1000}
						>
							<div>
								<p className={styles["right"]}>
									A lo largo de mi corta vida he desarrollado varios hobbies.
									<br />
									<br />
									Por ejemplo, me he enganchado a la{" "}
									<span className={styles["accent"]}>acuariofilia</span>{" "}
									especialmente al aquascaping (paisajismo en acuarios de agua
									dulce), he pasado horas frente a un pantalla jugando{" "}
									<span className={styles["accent"]}>videojuegos</span>, he
									doblado papel por días enteros (
									<span className={styles["accent"]}>Origami</span>) y sin
									embargo, siempre hay un factor en común, la{" "}
									<span className={styles["accent"]}>música</span>.
									<br />
									<br />
									Quizá resulte gracioso, pero me autodenominaría como{" "}
									<span className={styles["accent"]}>melómano</span>, me encanta
									investigar, leer y adentrarme en el mundo de la música, la gente
									que la crea e interpreta. Podría pasar horas hablando de
									aquellas canciones que me encantan, de su historia y de los
									mensajes que se vierten en ellas.
								</p>
							</div>
						</IntersectionContainer>
					</div>
				</PageContainer>

				<section className={styles["row-container"]}>
					<div className={styles["hobbies"]}>
						{hobbiesImages.map((img: ImageProps) => (
							<img
								src={img.src}
								alt={img.alt}
								title={img.title}
								key={img.alt}
								className={styles["hobbies-img"]}
							/>
						))}
					</div>
				</section>
			</main>
		</>
	);
};

export default About;
