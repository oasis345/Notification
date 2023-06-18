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

  async signIn(email?: string, password?: string): Promise<User> {
    const { httpClient } = registry;
    let userData;

    try {
      if (email && password) {
        userData = await httpClient.request({ serviceName: 'signIn', method: 'post', data: { email, password } });
      } else {
        await this.init();
        userData = this.user;
      }
    } catch (error) {
      if (!userData) alert('login fail!');
    }

    await this.loadUser();
    return userData;
  }

  signOut(): void {
    const { httpClient } = registry;
    this.user = undefined;
    this.notificationService.close();
    httpClient.post('/api/signOut');
  }
}
