import { WebAuthService, User } from '@common/auth/auth.interface';
import { WebNotificationService } from '@common/notification/notification.interface';
import { registry } from '@common/registry';
import { makeAutoObservable } from 'mobx';

export class AuthService implements WebAuthService {
  user?: User;

  constructor(private notificationService: WebNotificationService) {
    makeAutoObservable(this);
  }

  async init() {
    await this.loadUser();
  }

  async loadUser() {
    const { httpClient } = registry;

    this.user = await httpClient.request({ serviceName: 'user' });
    if (this.user) this.notificationService.init();
  }

  async signIn(email?: string, password?: string): Promise<void> {
    const { httpClient, uiService } = registry;
    let userData;

    try {
      if (email && password)
        userData = await httpClient.request({ serviceName: 'signIn', method: 'post', data: { email, password } });

      await this.init();
      uiService.go('');
    } catch (error: any) {
      if (!userData) uiService.notify(error.message, { variant: 'error' });
    }
  }

  async signUp(user: User): Promise<void> {
    const { httpClient, uiService } = registry;

    try {
      await httpClient.request<User>({ serviceName: 'signUp', method: 'post', data: user });
      uiService.go('SignIn');
    } catch (error: any) {
      uiService.notify(error.message, { variant: 'error' });
    }
  }

  signOut(): void {
    const { httpClient } = registry;
    this.user = undefined;
    this.notificationService.close();
    httpClient.post('/api/signOut');
  }
}
