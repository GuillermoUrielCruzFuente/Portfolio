import timer from "./Timer";

export type UserInfo = {
	name: string;
	mail: string;
	message?: string;
	tel?: string;
};

const userId = "27ef0d32aeaebbc2c310fb46c09ca772";
const mailEndpoint = `https://formsubmit.co/ajax/${userId}`;

const sendEmail = async (
	{ name, mail, message, tel }: UserInfo,
	dev?: boolean
): Promise<boolean> => {
	if (dev) {
		//in order to simulate a request wait certain amount of time
		await timer(1500);
		console.log(`name: 		${name}\nemail: 		${mail}\ntel:		${tel}\nmessage: 	${message}\n`);
		return true;
	} else {
		try {
			//send request to the FORMSUBMIT endpoint
			const mailRequest = await fetch(mailEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify({
					name: name,
					mail: mail,
					tel: tel,
					message: message,
				}),
			});

			//transform the response to JSON in order to read its status
			const confirmation = await mailRequest.json();

			return confirmation.success;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
};

export default sendEmail;
