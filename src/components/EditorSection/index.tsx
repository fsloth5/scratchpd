import EditorIcon from "@mui/icons-material/Wysiwyg";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import * as CodeWindowEvents from "../../CodeWindowEvents";
import { FONTS } from "../../Constants";
import { VBox } from "../Container";
import LabeledSlider from "../LabeledSlider";
import Section from "../Section";
import Selection from "../Selection";
import SettingAccordion from "../SettingAccordion";
import Spacer from "../Spacer";

interface EditorSectionProps {
	toggleLineNumbers: boolean;
	onEditorSettingsChange: CodeWindowEvents.CodeWindowChange;
}

interface EditorLinesOptionsProps {
	toggleLineNumbers: boolean;
	onEditorLineHeightChange: (value: number) => void;
	onEditorLinesToggle: (value: boolean) => void;
}

interface EditorFontOptionsProps {
	onEditorFontChange: (value: string) => void;
	onEditorFontSizeChange: (value: number) => void;
}

export default function EditorSection(props: EditorSectionProps): JSX.Element {
	return (
		<Section title="Editor" icon={<EditorIcon />}>
			<SettingAccordion
				subTitle="Adjust the editor's font settings"
				title="Font"
			>
				<EditorFontOptions
					onEditorFontChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.EDITOR_FONT_CHANGED,
						props.onEditorSettingsChange,
					)}
					onEditorFontSizeChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.EDITOR_FONT_SIZE_INCREASED,
						props.onEditorSettingsChange,
					)}
				/>
			</SettingAccordion>

			<SettingAccordion
				subTitle="Adjust the editor's line settings"
				title="Lines"
			>
				<EditorLinesOptions
					toggleLineNumbers={props.toggleLineNumbers}
					onEditorLineHeightChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.EDITOR_LINES_INCREASED,
						props.onEditorSettingsChange,
					)}
					onEditorLinesToggle={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.EDITOR_LINES_TOGGLED,
						props.onEditorSettingsChange,
					)}
				/>
			</SettingAccordion>
		</Section>
	);
}

function EditorLinesOptions(props: EditorLinesOptionsProps): JSX.Element {
	return (
		<VBox className="pd-s" centered={false}>
			<FormControlLabel
				control={
					<Checkbox
						checked={props.toggleLineNumbers}
						onChange={(event) =>
							props.onEditorLinesToggle(event.target.checked)
						}
					/>
				}
				label="Show line numbers"
			/>

			<Spacer amount="1em" />

			<LabeledSlider
				disabled={!props.toggleLineNumbers}
				defaultValue={1.2}
				label="Line height"
				max={100}
				min={1}
				onChange={props.onEditorLineHeightChange}
				step={0.1}
			/>
		</VBox>
	);
}

function EditorFontOptions(props: EditorFontOptionsProps): JSX.Element {
	const spacerAmount = "1em";

	return (
		<VBox className="pd-s" centered={false}>
			<Selection
				defaultValue={2}
				label="Select a font"
				onSelectionChange={props.onEditorFontChange}
				values={FONTS}
			/>

			<Spacer amount={spacerAmount} />

			<LabeledSlider
				disabled={false}
				defaultValue={21}
				label="Font size"
				max={100}
				min={1}
				onChange={props.onEditorFontSizeChange}
				step={1}
			/>
		</VBox>
	);
}
