import type React from "react";

import type { MouseEvent, Orientation } from "../../Utils";

import "./styles.scss";

interface BoxProps {
	centered: boolean;
	children: JSX.Element | readonly JSX.Element[];
	className?: string;
	id?: string;
	onClick?: MouseEvent<HTMLElement>;
	style?: React.CSSProperties;
}

export const HBox = (props: BoxProps) => Box(props, "h");

export const VBox = (props: BoxProps) => Box(props, "v");

function Box(props: BoxProps, orientation: Orientation): JSX.Element {
	const className = `${props.centered ? `c${orientation}box` : `${orientation}box`
		} ${props.className}`;
	return props.onClick ? (
		// biome-ignore lint/a11y/noStaticElementInteractions: false positive
		// biome-ignore lint/a11y/useKeyWithClickEvents: false positive
		<div
			className={className}
			id={props.id}
			onClick={props.onClick}
			style={props.style}
		>
			{props.children}
		</div>
	) : (
		<div className={className} id={props.id} style={props.style}>
			{props.children}
		</div>
	);
}
