import { HBox } from "../Container";

import "./styles.scss";

interface LabeledIconProps {
	children: JSX.Element;
	id?: string;
	label: string;
	labelStyle?: string;
}

export default function LabeledIcon(props: LabeledIconProps): JSX.Element {
	return (
		<HBox className="mx-w" id={props.id} centered={true}>
			<h3
				style={{
					fontWeight: 500,
				}}
				className={props.labelStyle ? `m-rs ${props.labelStyle}` : "m-rs"}
			>
				{props.label}
			</h3>

			{props.children}
		</HBox>
	);
}
