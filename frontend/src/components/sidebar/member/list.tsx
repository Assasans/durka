import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';

import { Member } from './member';
import { ScrollSpace } from '../../scroll';

export interface MemberListProps extends RouteComponentProps {
	onSelect?: (component: Member, id: Snowflake) => void;
}

export class MemberList extends Component<MemberListProps> {
	public constructor(props: MemberListProps) {
		super(props);

		this.onSelect = this.onSelect.bind(this);
	}

	private onSelect(component: Member, id: Snowflake): void {
		if(this.props.onSelect) {
			this.props.onSelect(component, id);
		}
	}

	public render(): ReactNode {
		const {}: MemberListProps = this.props;

		const children = React.Children.map(this.props.children, (child: ReactNode) => {
			if(React.isValidElement(child)) {
				return React.cloneElement(child, {
					onSelect: this.onSelect
				});
			}
			return child;
		});

		return (
			<div className="members-sidebar-container">
				{children}
					
				<ScrollSpace />
			</div>
		);
	}
}

export default withRouter(MemberList);
