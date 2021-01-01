import { Snowflake, Nullable } from '../utils';

export interface GuildPartial {
	id: Snowflake;
	name: string;
	icon: Nullable<string>;
}
