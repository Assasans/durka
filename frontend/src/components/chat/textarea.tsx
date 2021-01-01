import * as React from 'react';

import '../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AuthorPartial } from '../../partials';
import { Snowflake, Nullable } from '../../utils';

export interface TextAreaProps extends RouteComponentProps {
	placeholder: Nullable<string>;
	defaultValue: Nullable<string>;
}

export class TextArea extends Component<TextAreaProps> {
	public render(): ReactNode {
		const {
			placeholder,
			defaultValue
		}: TextAreaProps = this.props;

		return (
			<div className="textarea-container">
				<span className="textarea-attachment material-icons-round">attachment</span>

				<input
					type="text"
					className="textarea-input"
					placeholder={placeholder ?? undefined}
					defaultValue={defaultValue ?? undefined} />
			</div>
		);
	}
}

export default withRouter(TextArea);
