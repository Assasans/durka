import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as _ from 'lodash';

import '../scss/reset.scss';
import '../scss/icons.scss';
import '../scss/main.scss';
import '../scss/chat.scss';

import { Component, ReactNode } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { Collection } from '@assasans/storage';

import { Snowflake, Nullable } from './utils';
import { UserPartial, GuildPartial, ChannelPartial, TextChannelPartial, MessagePartial } from './partials';

import { TopbarChannel, TopbarGuild, TopbarTextChannel } from './components/topbar';
import { ChatMessage, ChatMessageList, ChatTextArea } from './components/chat';
import {
	SidebarGuildList, SidebarGuild,
	SidebarChannelList, SidebarChannel, SidebarTextChannel,
	SidebarMemberList, SidebarMember
} from './components/sidebar';

interface AppState {
	guild: Nullable<Snowflake>;
	channel: Nullable<Snowflake>;
}

const guilds: GuildPartial[] = [
	{
		id: '31',
		name: 'SCP Foundation',
		icon: 'https://cdn.discordapp.com/icons/646393082430095383/a_82646fe94e3e1820cde09ce81f541290.gif?size=128'
	},
	{
		id: '32',
		name: 'Cursed',
		icon: 'https://cdn.discordapp.com/icons/740896246423748688/aeb860f3a3dc20c7445c85837fc25efe.png?size=128'
	}
];

const assasans: UserPartial = {
	id: '21',
	username: 'Assasans',
	discriminator: '2014',
	avatar: 'https://cdn.discordapp.com/avatars/738672017791909900/501768bf557cb247f37a1644b274ce47.png?size=128',
	presence: {
		status: 1,
		activity: {
			type: 0,
			name: 'Geshin Impact',
			state: 'In Co-Op',
			details: 'With 3 players',
			icon: 'https://cdn.discordapp.com/app-icons/762434991303950386/eb0e25b739e4fa38c1671a3d1edcd1e0.png?size=128'
		}
	}
};

const kurays: UserPartial = {
	id: '22',
	username: 'Олег SEXY',
	discriminator: '2020',
	avatar: 'https://cdn.discordapp.com/avatars/485731951404384258/83eb475e6e7d59bdaf95b5bcb56aad86.png?size=128',
	presence: {
		status: 0,
		activity: {
			type: 1,
			name: 'С новой годой получаеца',
			state: null,
			details: null,
			icon: 'https://cdn.discordapp.com/emojis/722562831198715964.png?v=1'
		}
	}
};

const lann: UserPartial = {
	id: '23',
	username: 'Lann',
	discriminator: '1337',
	avatar: 'https://cdn.discordapp.com/avatars/242972390483689475/98a82432e3c10cefb2b203a8450aee15.png?size=128',
	presence: {
		status: 2,
		activity: {
			type: 1,
			name: 'Happy New Year',
			state: null,
			details: null,
			icon: 'https://cdn.discordapp.com/emojis/762936773089165332.png'
		}
	}
};

// Channel -> Member[]
const allMembers: Collection<Snowflake, UserPartial[]> = new Collection();

allMembers.set('11', [
	assasans,
	kurays
]);
allMembers.set('12', [
	assasans,
	lann
]);
allMembers.set('13', [
	lann,
	kurays
]);
allMembers.set('14', [
	assasans,
	kurays,
	lann
]);

const allChannels: Collection<Snowflake, TextChannelPartial[]> = new Collection();

allChannels.set('31', [
	{
		id: '11',
		name: 'durka',
		topic: 'ШУЕ дурка'
	},
	{
		id: '12',
		name: 'indev',
		topic: null
	}
]);
allChannels.set('32', [
	{
		id: '13',
		name: 'backdoor',
		topic: 'Cursed: Backdoor'
	},
	{
		id: '14',
		name: 'general',
		topic: null
	}
]);

const allMessages: Collection<Snowflake, MessagePartial[]> = new Collection();

allMessages.set('11', [
	{
		id: '41',
		time: '12:34',
		author: assasans,
		content: 'You are in <b>SCP Foundation</b> / <b>#durka</b>'
	}
]);
allMessages.set('12', [
	{
		id: '42',
		time: '12:34',
		author: kurays,
		content: 'You are in <b>SCP Foundation</b> / <b>#indev</b>'
	}
]);
allMessages.set('13', [
	{
		id: '43',
		time: '12:34',
		author: lann,
		content: 'You are in <b>Cursed</b> / <b>#backdoor</b>'
	}
]);
allMessages.set('14', [
	{
		id: '44',
		time: '12:34',
		author: assasans,
		content: 'You are in <b>Cursed</b> / <b>#general</b>'
	},
	{
		id: '45',
		time: '12:34',
		author: kurays,
		content: 'Message grouping'
	},
	{
		id: '46',
		time: '12:34',
		author: kurays,
		content: 'Test'
	},
	{
		id: '47',
		time: '12:34',
		author: lann,
		content: 'Yeahcool'
	}
]);

class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		
		this.state = {
			guild: '31',
			channel: '11'
		};
	}

	public render(): ReactNode {
		const guild: GuildPartial = guilds.find((guild: GuildPartial) => guild.id === this.state.guild)!;

		const selectedGuild = guild; // TODO

		const channels: TextChannelPartial[] = allChannels.find((channels: TextChannelPartial[], guildId: Snowflake) => guildId === this.state.guild)!;
		let channel: TextChannelPartial = channels.find((channel: TextChannelPartial) => channel.id === this.state.channel)!;
		if(!channel) channel = channels[0];

		const selectedChannel = channel; // TODO

		const members: UserPartial[] = allMembers.find((members: UserPartial[], channelId: Snowflake) => channelId === channel.id)!;

		const messages: MessagePartial[] = allMessages.find((messages: MessagePartial[], channelId: Snowflake) => channelId === channel.id)!;

		return (
			<Router>
				<div className="panel panel-guilds">
					<SidebarGuildList
						onSelect={(component, id) => {
							console.log(`Move to guild '${id}'`);

							this.setState({
								guild: id
							});
							// debugger;
						}}
					>
						{guilds.map((guild: GuildPartial) => (
							<SidebarGuild
								key={guild.id}
								id={guild.id}
								name={guild.name}
								icon={guild.icon}
								selected={guild.id === selectedGuild.id}  />
						))}

						<div className="guild">
							<span className="guild-add-icon material-icons-round">add</span>
						</div>
					</SidebarGuildList>
				</div>

				<div className="panel panel-channels">
					<TopbarGuild
						id={guild.id}
						name={guild.name}
						flags={guild.id === '31' ? 1 : 0}
						onClick={(component, id, open) => {
							debugger;
						}} />
					
					<SidebarChannelList
						onSelect={(component, id) => {
							console.log(`Move to channel '${id}'`);

							this.setState({
								channel: id
							});
							// debugger;
						}}
					>
						{channels.map((channel: TextChannelPartial) => {
							return (
								<SidebarTextChannel
									key={channel.id}
									id={channel.id}
									name={channel.name}
									selected={channel.id === selectedChannel.id} />
							);
						})}
					</SidebarChannelList>

					<div className="user-sidebar-container">
						<div className="user-sidebar-avatar-wrapper">
							<img className="user-sidebar-avatar" src="https://cdn.discordapp.com/avatars/738672017791909900/501768bf557cb247f37a1644b274ce47.png?size=128" />
						</div>

						<div className="user-sidebar-tag">
							<span className="user-sidebar-tag-username">Assasans</span>
							<span className="user-sidebar-tag-discriminator">#2014</span>
						</div>

						<span className="user-sidebar-settings material-icons-round">settings</span>
					</div>
					
					<div className="status-sidebar-container">
						<div className="status-sidebar-icon-wrapper">
							<img className="status-sidebar-icon" src="https://cdn.discordapp.com/app-icons/762434991303950386/eb0e25b739e4fa38c1671a3d1edcd1e0.webp?size=128" />
						</div>

						<div className="status-sidebar-info">
							<span className="status-sidebar-info-name">Genshin Impact</span>
							<span className="status-sidebar-info-state">Playing Co-Op</span>
						</div>
					</div>
				</div>

				<div className="panel panel-main">
					<TopbarTextChannel
						id={channel.id}
						name={channel.name}
						topic={channel.topic} />

					<div className="panel panel-main-inner">
						<div className="panel panel-chat">
							<div className="chat-container">
								<ChatMessageList>
									{messages.map((message: MessagePartial, index: number) => {
										const groupStart: boolean = index === 0 || messages[index - 1].author.id !== message.author.id;

										return (
											<ChatMessage
												key={message.id}
												groupStart={groupStart}
												id={message.id}
											 	time={message.time}
												author={message.author}
												content={message.content} />
										);
									})}
								</ChatMessageList>
							</div>

							<ChatTextArea
								placeholder={`Написать в #${channel.name}`}
								defaultValue={null} />
						</div>

						<div className="panel panel-members">
							<SidebarMemberList
								onSelect={(component, id) => {
									debugger;
								}}
							>
								{members.map((member: UserPartial) => (
									<SidebarMember
										key={member.id}
										id={member.id}
										username={member.username}
										discriminator={member.discriminator}
										avatar={member.avatar}
										presence={member.presence} />
								))}
							</SidebarMemberList>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('body > div#app-mount')
);

declare global {
	interface Window {
		__VERSION__: string;
		__ENVIRONMENT__: string;
	}
}
