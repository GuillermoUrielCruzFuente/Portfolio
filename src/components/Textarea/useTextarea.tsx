import { CSSProperties, useRef, useState } from 'react'

type UseInput = {
	render: JSX.Element
	getValue: () => string
	isValid: boolean
}

export type TextareaConfig = {
	name: string
	img: string
	required: boolean
}

export const useTextarea = ({
	name,
	img,
	required,
}: TextareaConfig): UseInput => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const [textareaState, setTextareaState] = useState(false)

	const getValue = () => textareaRef.current!.value

	const handleTextareaContentChange = () => {
		if (textareaRef.current?.validity.valid && getValue() != '') {
			setTextareaState(true)
		} else {
			setTextareaState(false)
		}
	}

	const LABEL_STATE_COLORS = {
		OK: '#99fb9c',
		ERROR: '#fb9999',
		NEUTRAL: '#f5c8ff',
	}

	const computeLabelColor = (): CSSProperties => {
		if (textareaState) {
			return { color: LABEL_STATE_COLORS.OK }
		} else if (required) {
			return { color: LABEL_STATE_COLORS.ERROR }
		} else {
			return { color: LABEL_STATE_COLORS.NEUTRAL }
		}
	}

	const textarea = (
		<>
			<div className="input-container">
				<textarea
					className="form-input"
					ref={textareaRef}
					placeholder={name}
					name={name}
					rows={3}
					required={required}
					onChange={handleTextareaContentChange}
				/>

				<label>{name}</label>

				<img className="label-icon" src={img} alt={`${name} icon`} />
			</div>

			<span className="error-label" style={computeLabelColor()}>
				Coloca aquí el mensaje que desees
			</span>
		</>
	)

	return {
		render: textarea,
		getValue: getValue,
		isValid: false,
	}
}

export default useTextarea
