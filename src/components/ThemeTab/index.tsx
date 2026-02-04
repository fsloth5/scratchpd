import BrushIcon from "@mui/icons-material/Brush";
import * as EditorConstants from "../../EditorConstants";
import { VBox } from "../Container";
import LabeledIcon from "../LabledIcon";
import { ButtonList } from "../List";
import Section from "../Section";
import Selection from "../Selection";
import Spacer from "../Spacer";

interface ThemeTabProps {
	onThemeChange: (theme: string) => void;
	selectedTheme: string;
}

export function ThemeTab(props: ThemeTabProps): JSX.Element {
	return (
		<VBox id="theme-tab" className="tab-item" centered={false}>
			<LabeledIcon label="Themes">
				<BrushIcon />
			</LabeledIcon>
			<Spacer amount="0.5em" />
			<ButtonList
				labels={EditorConstants.THEMES}
				onClick={(event) =>
					props.onThemeChange((event.target as HTMLElement).innerText)
				}
				orientation="v"
				selected={props.selectedTheme}
			/>
		</VBox>
	);
}

interface ThemeDropdownProps {
	onThemeChange: (theme: string) => void;
}

export function ThemeDropdown(props: ThemeDropdownProps): JSX.Element {
	return (
		<Section title="Theme" icon={<BrushIcon />} spacerAmount={0.9}>
			{[
				<Selection
					defaultValue={4}
					key={0}
					label="Select a theme"
					onSelectionChange={props.onThemeChange}
					values={EditorConstants.THEMES}
				/>,
			]}
		</Section>
	);
}
