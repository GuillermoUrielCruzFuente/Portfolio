import { FC, useRef } from 'react'
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
}

export type InputConfig = {
	name: string
	img: string
	validation: 'required' | 'semi-required' | 'not-required'
	inputType: 'textarea' | 'text' | 'email' | 'tel'
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
	validation,
	inputType,
}: InputConfig): UseInput => {
	const inputRef = useRef<HTMLInputElement>(null)
	const areaRef = useRef<HTMLTextAreaElement>(null)

	const getValue = () =>
		inputType === 'textarea'
			? areaRef.current
				? areaRef.current.value
				: ''
			: inputRef.current
			? inputRef.current.value
			: ''

	const input = (
		<div className="input-container">
			{inputType === 'textarea' ? (
				<textarea
					className="form-input"
					placeholder={name}
					required={validation === 'required' ? true : false}
					rows={3}
					name={name}
					ref={areaRef}
				></textarea>
			) : (
				<input
					autoComplete="off"
					className="form-input"
					ref={inputRef}
					required={validation === 'required' ? true : false}
					name={name}
					placeholder={name}
					type={inputType}
					pattern={inputType === 'tel' ? '[0-9]{10}' : undefined}
				/>
			)}

			<label>{name}</label>

			<img className="label-icon" src={img} alt="" />
		</div>
	)

	return {
		render: input,
		getValue: getValue,
	}
}

export default useInput
