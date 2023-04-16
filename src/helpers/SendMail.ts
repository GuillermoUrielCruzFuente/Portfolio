import timer from "@/helpers/Timer";

export type UserInfo = {
	name: string;
	mail: string;
	message?: string;
	tel?: string;
};

type SendMailArgs = {
	userInfo: UserInfo;
	devMode?: {
		fakeRequestDelay: number;
		fakeStatus: boolean;
	};
};

const USER_ID = "27ef0d32aeaebbc2c310fb46c09ca772";
const MAIL_ENDPOINT = `https://formsubmit.co/ajax/${USER_ID}`;

const sendEmail = async ({ userInfo, devMode }: SendMailArgs): Promise<boolean> => {
	if (devMode) {
		await timer(devMode.fakeRequestDelay);

		console.log(userInfo);

		return devMode.fakeStatus;
	} else {
		try {
			//send request to the FORMSUBMIT endpoint
			const mailRequest = await fetch(MAIL_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify(userInfo),
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
