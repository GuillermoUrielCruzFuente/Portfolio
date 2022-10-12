import { CSSProperties, FC, SyntheticEvent, useRef, useState } from 'react'
import './Input.scss'

/**
 * Required type, there are three cases for this, in order
 * to avoid to force the user enter all his data
 *
 * semi-required    - validate only if it is filled
 * required         - validate always
 * not-required     - there is no validation method, it coud be empty or not
 *
 * Input type
 *
 * input text       -> required         [username]
 * input textarea   -> required         [message]
 * input mail       -> semi-required    [mail]
 * input phone      -> semi-required    [phone]
 *
 *
 * return {
 *  render,
 *  getValueFunc
 * }
 */

type UseInput = {
	render: JSX.Element
	getValue: () => string
	isValid: boolean
}

export type InputConfig = {
	name: string
	img: string
	required: boolean
	inputType: 'text' | 'email' | 'tel'
}

/**
 * Create an animated input field with the required configuration
 * @param InputConfig object with all the necessary information for  the input.
 * - name: submit name and placeholder
 * - img: input left icon
 * - validation: this value can be
 * 'required' for inputs that can't be empty and have a validation method
 * 'semi-required' for inputs that can be empty but once filled have a validation method
 * 'not-required' for inputs that can be empty and don't have a validation method
 * - inputType: can be 'textarea', 'text', 'email' and 'text'
 * @returns Object that contains the JSX.Element in this case an input
 * and the getValue() method that provide to the parent an easy way to
 * access the input value
 */
export const useInput = ({
	name,
	img,
	required,
	inputType,
}: InputConfig): UseInput => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [inputState, setInputState] = useState(false)

	const getValue = () => inputRef.current!.value
	const isInputFilled = () => getValue() != ''
	const isInputValid = () => inputRef.current?.validity.valid

	const handleInputContentChange = () => {
		if (isInputValid()) {
			if (isInputFilled()) {
				setInputState(true)
			} else {
				//a weird way to force the re render
				setInputState(false)
				setTimeout(() => {
					setInputState(true)
				}, 100)
			}
		} else {
			setInputState(false)
		}
	}

	const VALIDATION_DESCRIPTIONS = {
		text: 'Ingresa aquel nombre con el que podré referirme a ti.',
		tel: 'Ingresa un número telefónico con 10 dígitos. Ejemplo: 5551588911',
		email: 'Ingresa una dirección de correo válida. Ej. correo@gmail.com',
	}

	const LABEL_STATE_COLORS = {
		OK: '#99fb9c',
		ERROR: '#fb9999',
		NEUTRAL: '#f5c8ff',
	}

	const getInlineValidationDescription = (): string => {
		return VALIDATION_DESCRIPTIONS[inputType]
	}

	const computeLabelColor = (): CSSProperties => {
		if (inputState) {
			if (isInputFilled()) {
				return { color: LABEL_STATE_COLORS.OK }
			} else {
				return { color: LABEL_STATE_COLORS.NEUTRAL }
			}
		} else if (required) {
			return { color: LABEL_STATE_COLORS.ERROR }
		} else {
			return { color: LABEL_STATE_COLORS.NEUTRAL }
		}
	}

	const input = (
		<>
			<div className="input-container">
				<input
					autoComplete="off"
					className="form-input"
					ref={inputRef}
					name={name}
					placeholder={name}
					type={inputType}
					onChange={handleInputContentChange}
					pattern={inputType === 'tel' ? '[0-9]{10}' : undefined}
					required={required}
				/>

				<label>{name}</label>

				<img className="label-icon" src={img} alt="" />
			</div>

			<span className="error-label" style={computeLabelColor()}>
				{getInlineValidationDescription()}
			</span>
		</>
	)

	return {
		render: input,
		getValue: getValue,
		isValid: inputState,
	}
}

export default useInput
