import { Nullable } from '../utils';

export type UserStatus = 0 | 1 | 2 | 3; // 'online' | 'idle' | 'dnd' | 'offline';
export type ActivityType = 0 | 1; // 'playing' | 'custom_status';

export interface Presence {
	status: UserStatus;
	activity: Activity;
}

export interface Activity {
	type: ActivityType;
	
	name: Nullable<string>;
	state: Nullable<string>;
	details: Nullable<string>;

	icon: Nullable<string>;
}
