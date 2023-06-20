export interface User {
	email: string;
	password: string;
}

export interface AuthService {
	user?: User;

	signIn(username?: string, password?: string): Promise<void>;

	signUp(user: User): Promise<void>;

	signOut(): void;
}

export interface WebAuthService extends AuthService {}

export interface ServerAuthService {}
