import * as React from 'react';

import '../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../utils';

export interface GuildProps extends RouteComponentProps {
	id: Snowflake;
	name: string;
	flags: number; // TODO

	onClick?: (component: Guild, id: Snowflake, open: boolean) => void;
}

export interface GuildState {
	open: boolean;
}

export class Guild extends Component<GuildProps, GuildState> {
	public constructor(props: GuildProps) {
		super(props);

		this.state = {
			open: false
		};

		this.onClick = this.onClick.bind(this);
	}

	private onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		const open: boolean = !this.state.open;

		this.setState({
			open: open
		});

		if(this.props.onClick) {
			this.props.onClick(this, this.props.id, open);
		}
	}

	public render(): ReactNode {
		const {
			id,
			name,
			flags
		}: GuildProps = this.props;

		return (
			<div
				className="guild-topbar-container"
				onClick={this.onClick}
			>
				{(flags & 1 >> 0) !== 0 ? (
					<span className="guild-badge material-icons-round">verified</span>
				) : null}

				<span className="guild-name">{name}</span>
				<span className="guild-expand material-icons">expand_more</span>
			</div>
		);
	}
}

export default withRouter(Guild);
