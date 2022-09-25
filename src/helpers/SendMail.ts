import timer from './Timer'

type UserInfo = {
	name: string
	mail: string
	message: string
}

const sendEmail = async ({ name, mail, message }: UserInfo, dev?: boolean): Promise<boolean> => {
	if (dev) {
		//in order to simulate a request wait ceratin amount of time
		await timer(1000)
		return true
	} else {
		const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/27ef0d32aeaebbc2c310fb46c09ca772'

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
