export type NotifyType = 'notification' | 'notify';

export interface NotifyItem {
	type: NotifyType;
	from?: string;
	to?: string | string[];
	instanceId: string;
	subscribeId?: string;
	message: any;
	sentDate: Date;
}

export interface NotifyListener {
	type: NotifyType;
	subscribeId?: string;
	execute: (notifyItem: NotifyItem) => void;
}

export interface NotificationService {
	notify?(item: Partial<NotifyItem>): void;
}

export interface WebNotificationService extends NotificationService {
	instanceId: string;

	eventSource?: EventSource;

	activation: boolean;

	disturbMode: boolean;

	disturbStartTime?: Date | null;

	disturbEndTime?: Date | null;

	listeners: NotifyListener[];

	init(): void;

	addListener(listener: NotifyListener): void;

	removeListener(subscribeId: string): void;

	close(): void;
}

export interface ServerNotificationService extends NotificationService {}
