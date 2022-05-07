type TextAnimationConfig = {
    textContainerID: string,
    animationName: string,
    classForWrapper?: string,
    letterAnimDuration?: number,
    delay: number
}

/**
 * Animate texts letter by letter
 */
export default class TextAnimation {
    private textElement: HTMLElement | null

    private config: TextAnimationConfig = {
        textContainerID: '',
        animationName: '',
        classForWrapper: 'letter',
        letterAnimDuration: 500,
        delay: 80
    }

    constructor(config: TextAnimationConfig) {
        this.config.textContainerID = config.textContainerID
        this.config.animationName = config.animationName

        //need a verification for every not default value in TextAnimationConfig Type
        //the class property will change his value if it is passed by the function parameter,
        //otherwhise, it remains the same
        this.config.classForWrapper = config.classForWrapper ?? this.config.classForWrapper
        this.config.letterAnimDuration = config.letterAnimDuration ?? this.config.letterAnimDuration
        this.config.delay = config.delay ?? this.config.delay

        try {
            this.textElement = document.getElementById(config.textContainerID)
            this.wrapText()
        } catch (error) {
            this.textElement = null
            console.warn('your ID element does not exist')
        }
    }
    /**
     * Call this method to wrap every single letter inside a span element
     */
    wrapText() {
        if(this.textElement) {
            let content = this.textElement.textContent as string

            this.textElement.innerHTML = content.replace(/\S/g, `<span class="${this.config.classForWrapper}">$&</span>`)
        }
    }

    animate() {
        let letters = document.querySelectorAll(`#${this.config.textContainerID} .${this.config.classForWrapper}`) as NodeListOf<HTMLElement>

        letters.forEach((letter, index) => {
            letter.style.animation = `${this.config.animationName} ${this.config.letterAnimDuration}ms ease ${index * this.config.delay}ms forwards`
        })
    }
}