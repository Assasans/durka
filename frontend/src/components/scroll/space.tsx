import * as React from 'react';

import '../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface SpaceProps extends RouteComponentProps {
}

export class Space extends Component<SpaceProps> {
	public render(): ReactNode {
		const {}: SpaceProps = this.props;

		return (
			<div className="scroll-space"></div>
		);
	}
}

export default withRouter(Space);
