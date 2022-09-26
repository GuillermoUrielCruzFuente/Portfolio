import { FC, useRef } from 'react'
import './Input.scss'

type Validation = 'required' | 'semi-required' | 'not-required'

export type InputType = {
	name: string
	img: string
	validation: Validation
}

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

export const useInput = ({ name, img, validation }: InputType): UseInput => {
	const inputRef = useRef<HTMLInputElement>(null)
	const getValue = () => (inputRef.current ? inputRef.current.value : '')

	const input = (
		<div className="input-container">
			<input
				autoComplete="off"
				className="form-input"
				ref={inputRef}
				required = {validation === 'required' ? true : false}

				name={name}
				placeholder={name}
				type="text"
			/>
			<label htmlFor="name-input">{name}</label>

			<img className="label-icon" src={img} alt="" />
		</div>
	)

	return {
		render: input,
		getValue: getValue,
	}
}

export default useInput
