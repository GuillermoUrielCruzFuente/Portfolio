import timer from './Timer'

type UserInfo = {
	name: string
	mail: string
	message: string
	tel: string
}

const sendEmail = async (
	{ name, mail, message, tel }: UserInfo,
	dev?: boolean
): Promise<boolean> => {
	if (dev) {
		//in order to simulate a request wait certain amount of time
		await timer(1500)
		console.log(
			`name: 		${name}\nemail: 		${mail}\ntel:		${tel}\nmessage: 	${message}\n`
		)
		return true
	} else {
		const FORM_SUBMIT_ENDPOINT =
			'https://formsubmit.co/ajax/27ef0d32aeaebbc2c310fb46c09ca772'

		try {
			//send request to the FORMSUBMIT endpoint
			const mailRequest = await fetch(FORM_SUBMIT_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					name: name,
					mail: mail,
					message: message,
				}),
			})

			//transform the response to JSON in order to read it
			const confirmation = await mailRequest.json()

			return confirmation.success
		} catch (error) {
			console.error(error)
			return false
		}
	}
}

export default sendEmail
