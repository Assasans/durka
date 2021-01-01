import { Snowflake, Nullable } from '../utils';

export interface ChannelPartial {
	id: Snowflake;
	name: Snowflake;
}

export interface TextChannelPartial extends ChannelPartial {
	topic: Nullable<string>;
}
