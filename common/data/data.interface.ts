import { SubscriptionLike } from 'rxjs';

export type Dict<T = any> = { [k: string]: T };

export interface DataOptions<T = any> {
	table: string;
	data?: T;
}

export interface ChangeItem {
	changeType: ChangeType;
	table?: string;
	data?: Dict[];
}

export type ChangeType = 'create' | 'update' | 'remove';

export abstract class DataService {
	abstract get<T = Dict>(options: DataOptions<T>): Promise<T>;

	abstract save<T = any>(options: DataOptions<T>): Promise<void>;

	abstract subscribe(
		options: DataOptions,
		next?: (changeItem: ChangeItem) => void
	): Promise<SubscriptionLike> | SubscriptionLike;
}

export interface WebDataService extends DataService {}

export interface ServerDataService extends DataService {}
