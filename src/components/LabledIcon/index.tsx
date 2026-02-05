import { HBox } from "../Container";

import "./styles.scss";

interface LabeledIconProps {
	children: JSX.Element;
	id?: string;
	label: string;
	labelStyle?: string;
}

const style = { maxWidth: "max-content", fontWeight: 500 };

export default function LabeledIcon(props: LabeledIconProps): JSX.Element {
	return (
		<HBox style={style} id={props.id} centered={true}>
			<h3
				style={style}
				className={props.labelStyle ? `m-rs ${props.labelStyle}` : "m-rs"}
			>
				{props.label}
			</h3>

			{props.children}
		</HBox>
	);
}
