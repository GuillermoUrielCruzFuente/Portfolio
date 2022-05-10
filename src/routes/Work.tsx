import Nav from "../components/Nav/Nav"

export default function Work() {
    return (
        <>
            <Nav transitionTime={10} callback={() => { }} currentRoute='/work'/>
            <header>
                <h1>Work</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nihil suscipit quidem enim aspernatur veritatis dicta illum iure reprehenderit explicabo. Architecto voluptatem placeat quasi, nostrum quam eveniet ipsa illum inventore.
                </p>
            </header>
        </>
    )
}