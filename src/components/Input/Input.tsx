import { FC } from 'react'
import './Input.scss'

type Validation = 'required' | 'semi-required' | 'not-required'

type InputType = {
	name: string
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
 */

const Input: FC<InputType> = ({ name, validation }) => {
	return (
		<div className="input-container">
			<input
				id="name-input"
				className="form-input"
				type="text"
				placeholder={name}
				autoComplete="off"
				required
				name={name}
			/>
			<label htmlFor="name-input">{name}</label>

			<img className="label-icon" alt="" />
		</div>
	)
}

export default Input
