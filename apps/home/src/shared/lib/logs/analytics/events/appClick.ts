import { sendEvent } from './sendEvent';

type AppClick = {
	event: 'AppClick';
	ga_eventType: string;
	ga_layout: string;
	ga_appId: string;
};

export const appClick = (appId: string) => {
	sendEvent<AppClick>({
		event: 'AppClick',
		ga_eventType: 'Click',
		ga_layout: 'Main',
		ga_appId: appId,
	});
};
