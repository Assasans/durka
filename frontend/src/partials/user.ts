import { Snowflake } from '../utils';
import { Presence } from './presence';

export interface UserPartial {
	id: Snowflake;

	username: string;
	discriminator: string;

	avatar: string;

	presence: Presence;
}
