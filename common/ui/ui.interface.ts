export interface UiService {
	isMobile: boolean;

	notify(message: string): void;

	go(to: string): void;
}
