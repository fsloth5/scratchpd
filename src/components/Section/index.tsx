import { VBox } from "../Container";
import LabeledIcon from "../LabledIcon";
import Spacer from "../Spacer";

interface SectionProps {
	children: readonly JSX.Element[];
	icon: JSX.Element;
	spacerAmount?: number;
	title: string;
}

export default function Section(props: SectionProps): JSX.Element {
	const children = [
		<LabeledIcon key={-2} label={props.title}>
			{props.icon}
		</LabeledIcon>,

		<Spacer key={-1} amount={`${props.spacerAmount || 0.25}em`} />,

		...props.children,
	];

	return (
		<VBox className="section" centered={false}>
			{children}
		</VBox>
	);
}
