import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { NotificationService } from './notification.service';
import { registry } from '@common/registry';
import { WebUiService } from './ui.service';

export function createService<T extends object>(ServiceClass: new (...args: any[]) => T, ...args: any[]): T {
  const service = new ServiceClass(...args);

  return service;
}

export async function registerServices() {
  const notificationService = createService(NotificationService);
  const authService = createService(AuthService, notificationService);
  const dataService = createService(DataService);
  const uiService = createService(WebUiService);

  registry.register({ notificationService, authService, dataService, uiService });
  authService.init();
  globalThis.registry = registry;
}
