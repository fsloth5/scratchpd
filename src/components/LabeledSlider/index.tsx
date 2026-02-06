import Slider from "@mui/material/Slider";

import { VBox } from "../Container";
import Spacer from "../Spacer";

interface LabeledSliderProps {
	disabled: boolean;
	defaultValue: number;
	label: string;
	max: number;
	min: number;
	step: number;
	onChange: (value: number) => void;
}

export default function LabeledSlider(props: LabeledSliderProps): JSX.Element {
	return (
		<VBox centered={false}>
			<h4 className="fw-nm">{props.label}</h4>
			<Spacer amount="0.5em" />
			{props.onChange ? (
				<Slider
					disabled={props.disabled}
					defaultValue={props.defaultValue}
					max={props.max}
					min={props.min}
					onChange={(_, value) => props.onChange(value as number)}
					step={props.step}
					valueLabelDisplay="auto"
				/>
			) : (
				<Slider
					disabled={props.disabled}
					defaultValue={props.defaultValue}
					max={props.max}
					min={props.min}
					step={props.step}
					valueLabelDisplay="auto"
				/>
			)}
		</VBox>
	);
}
