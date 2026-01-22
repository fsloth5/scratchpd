import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import React from "react";

import "./styles.scss";

interface SelectionProps {
	defaultValue: number;
	label: string;
	onSelectionChange: (value: string) => void;
	values: readonly string[];
}

export default function Selection(props: SelectionProps): JSX.Element {
	const [value, setValue] = React.useState(String(props.defaultValue));

	const values = props.values.map((label, i) => (
		// biome-ignore lint/suspicious: false positive
		<MenuItem key={i} value={i + 1}>
			{label}
		</MenuItem>
	));

	const handleChange = (event: SelectChangeEvent) => {
		const newValue = event.target.value as string;

		setValue(newValue);

		props.onSelectionChange(props.values[Number(newValue) - 1]);
	};

	return (
		<FormControl fullWidth>
			<InputLabel>{props.label}</InputLabel>
			<Select
				style={{ zIndex: 2000 }}
				value={value}
				label={props.label}
				onChange={handleChange}
			>
				{values}
			</Select>
		</FormControl>
	);
}
