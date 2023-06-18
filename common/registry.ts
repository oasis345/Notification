import { AuthService } from './auth/auth.interface';
import { WebNotificationService } from './notification/notification.interface';
import { HttpClient, httpClient } from './common/http.client';
import { DataService, Dict } from './data/data.interface';
import { dayjs } from './common/dayjs';
import { UiService } from './ui/ui.interface';

export class Registry {
	private readonly store: any = {};

	private resolve<T>(name: string): T {
		return this.store[name];
	}

	register(services: Dict): void {
		Object.assign(this.store, services);
	}

	get dataService(): DataService {
		return this.resolve('dataService');
	}

	get authService(): AuthService {
		return this.resolve('authService');
	}

	get notificationService(): WebNotificationService {
		return this.resolve('notificationService');
	}

	get uiService(): UiService {
		return this.resolve('uiService');
	}

	get httpClient(): HttpClient {
		return httpClient;
	}

	get dayjs(): typeof dayjs {
		return dayjs;
	}
}

export const registry = new Registry();
