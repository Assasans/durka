import { Snowflake } from '../utils';
import { AuthorPartial } from './author';

export interface MessagePartial {
	id: Snowflake;
	time: string;
	author: AuthorPartial;
	content: string;
}
