import { sendEvent } from './sendEvent';

type FeaturedProjectClick = {
	event: 'FeaturedProjectClick';
	ga_eventType: string;
	ga_layout: string;
	ga_projectSlug: string;
};

export const featuredProjectClick = (slug: string) => {
	sendEvent<FeaturedProjectClick>({
		event: 'FeaturedProjectClick',
		ga_eventType: 'Click',
		ga_layout: 'Main',
		ga_projectSlug: slug,
	});
};
