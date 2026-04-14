import CodeIcon from "@mui/icons-material/Code";
import PaletteIcon from "@mui/icons-material/Palette";
import WindowIcon from "@mui/icons-material/Window";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import {
	type CodeWindowChange,
	CodeWindowEvents,
	withChange,
} from "../../CodeWindowEvents";
import { VBox } from "../Container";
import { LanguageTab } from "../LanguageTab";
import SceneTab from "../SceneTab";
import { ThemeTab } from "../ThemeTab";

import "./styles.scss";

interface SettingsTabsProps {
	onCodeWindowChange: CodeWindowChange;
	selectedLanguage: string;
	selectedTheme: string;
	windowBgColor: string;
	shadowsToggled: boolean;
	lineNumbersToggled: boolean;
	editorFontSize: number;
}

function switchTab(
	index: number,
	props: SettingsTabsProps,
): JSX.Element | null {
	switch (index) {
		case 0:
			return (
				<ThemeTab
					onThemeChange={withChange(
						CodeWindowEvents.THEME,
						props.onCodeWindowChange,
					)}
					selectedTheme={props.selectedTheme}
				/>
			);
		case 1:
			return (
				<LanguageTab
					onEditorLanguageChange={withChange(
						CodeWindowEvents.LANGUAGE,
						props.onCodeWindowChange,
					)}
					selectedLanguage={props.selectedLanguage}
				/>
			);
		case 2:
			return (
				<SceneTab
					shadowsToggled={props.shadowsToggled}
					lineNumbersToggled={props.lineNumbersToggled}
					onSceneChange={props.onCodeWindowChange}
					windowBgColor={props.windowBgColor}
					editorFontSize={props.editorFontSize}
				/>
			);
		default:
			return null;
	}
}

export default function SettingsTabs(props: SettingsTabsProps): JSX.Element {
	const [value, setValue] = React.useState(0);

	const handleChange = (
		_: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setValue(newValue);
	};

	const newTab = switchTab(value, props);

	return newTab ? (
		<VBox id="settings-tab" centered={false}>
			<Tabs onChange={handleChange} value={value} variant="fullWidth">
				<Tab icon={<PaletteIcon />} />
				<Tab icon={<CodeIcon />} />
				<Tab icon={<WindowIcon />} />
			</Tabs>
			{newTab}
		</VBox>
	) : (
		<VBox id="settings-tab" centered={false}>
			<Tabs onChange={handleChange} value={value} variant="fullWidth">
				<Tab icon={<PaletteIcon />} />
				<Tab icon={<CodeIcon />} />
				<Tab icon={<WindowIcon />} />
			</Tabs>
		</VBox>
	);
}
