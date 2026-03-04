import { tractPageView } from './trackPageView';
import { clearVariables } from '@/shared/lib/logs/analytics/clearVariables';

type Payload = {
	title: string;
	createdAt: string;
};

export const trackCraftDetailView = async (payload: Payload) => {
	await setVariables(payload);
	tractPageView();
};

export const setVariables = async (payload: Payload) => {
	clearVariables();
	window.ga_eventType = 'PageView';
	window.ga_layout = 'CraftDetail Page';
	window.ga_post_title = payload.title;
	window.ga_post_regDate = payload.createdAt;
};
