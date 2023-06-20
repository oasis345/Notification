export type NotifyOption = {
	variant: 'success' | 'default' | 'error' | 'info' | 'warning';
};

export interface UiService {
	isMobile: boolean;

	navigate?: any;

	notify(message: string, option?: NotifyOption): void;

	go(to: string, props?: any): void;
}
