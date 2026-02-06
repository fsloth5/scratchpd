import DataObjectIcon from "@mui/icons-material/DataObject";
import { LANGUAGES } from "../../Constants";
import { VBox } from "../Container";
import LabeledIcon from "../LabledIcon";
import { ButtonList } from "../List";
import Section from "../Section";
import Selection from "../Selection";
import Spacer from "../Spacer";

interface LanguageTabProps {
	onEditorLanguageChange: (language: string) => void;
	selectedLanguage: string;
}

export function LanguageTab(props: LanguageTabProps): JSX.Element {
	return (
		<VBox id="lang-tab" className="tab-item" centered={false}>
			<LabeledIcon label="Language">
				<DataObjectIcon />
			</LabeledIcon>
			<Spacer amount="0.5em" />
			<ButtonList
				labels={LANGUAGES}
				onClick={(event) =>
					props.onEditorLanguageChange((event.target as HTMLElement).innerText)
				}
				orientation="v"
				selected={props.selectedLanguage}
			/>
		</VBox>
	);
}

interface LanguageDropdownProps {
	onEditorLanguageChange: (language: string) => void;
}

export function LanguageDropdown(props: LanguageDropdownProps): JSX.Element {
	return (
		<Section title="Language" icon={<DataObjectIcon />} spacerAmount={0.9}>
			{[
				<Selection
					defaultValue={43}
					key={0}
					label="Select a language"
					onSelectionChange={props.onEditorLanguageChange}
					values={LANGUAGES}
				/>,
			]}
		</Section>
	);
}
