import { FC, useRef } from 'react'
import './Input.scss'

/**
 *
 * <Input required textarea text>placeholder</Input>
 *
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

export type InputType = {
	name: string
	img: string
	validation: 'required' | 'semi-required' | 'not-required'
	inputType: 'textarea' | 'text' | 'email' | 'tel'
}

export const useInput = ({
	name,
	img,
	validation,
	inputType,
}: InputType): UseInput => {
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
