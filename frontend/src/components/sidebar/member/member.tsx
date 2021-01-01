import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';
import { Presence } from '../../../partials';

export interface MemberProps extends RouteComponentProps {
	id: Snowflake;
	username: string;
	discriminator: string;
	avatar: string;
	presence: Presence;

	onSelect?: (component: Member, id: Snowflake) => void;
}

export class Member extends Component<MemberProps> {
	public constructor(props: MemberProps) {
		super(props);

		this.onSelect = this.onSelect.bind(this);
	}

	private onSelect(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		if(this.props.onSelect) {
			this.props.onSelect(this, this.props.id);
		}
	}

	public render(): ReactNode {
		const {
			id,
			username,
			discriminator,
			avatar,
			presence
		}: MemberProps = this.props;

		return (
			<div
				className="member-sidebar-container"
				onClick={this.onSelect}
			>
				<div className="member-sidebar-avatar-wrapper">
					<img className="member-sidebar-avatar" src={avatar} />
				</div>

				<div className="member-sidebar-info">
					<span className="member-sidebar-info-username">{username}#{discriminator}</span>

					<div className="member-sidebar-info-activity">
						{presence.activity.icon !== null ? (
							<img className="member-sidebar-info-activity-icon" src={presence.activity.icon} />
						) : null}
						{presence.activity.name !== null ? (
							<span className="member-sidebar-info-activity-name">{presence.activity.name}</span>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Member);
