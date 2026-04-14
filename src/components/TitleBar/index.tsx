import { HBox } from "../Container";

import "./styles.scss";

interface TitleBarProps {
	fileName?: string;
	theme: string;
	editorFontSize: number;
}

export default function TitleBar(props: TitleBarProps): JSX.Element {
	return (
		<HBox className={props.theme} centered={true}>
			{buildTheme(props.theme, props.editorFontSize, props.fileName)}
		</HBox>
	);
}

function buildTheme(
	theme: string,
	fontSize: number,
	title?: string,
): JSX.Element[] {
	let result: JSX.Element[] = [];

	const computedFontSize = `${fontSize}px`;

	if (theme.includes("macos")) {
		result = [
			<div key={1} className="circle red" />,
			<div key={2} className="circle yellow" />,
			<div key={3} className="circle green" />,
			<div key={4} className="title" style={{ fontSize: computedFontSize }}>
				{title}
			</div>,
		];
	} else if (theme.includes("windows")) {
		result = [
			<div key={1} className="underscore" />,
			<div key={2} className="square" />,
			<div key={3} className="letter-x" />,
			<div key={4} className="title" style={{ fontSize: computedFontSize }}>
				{title}
			</div>,
		];
	}

	return result;
}
