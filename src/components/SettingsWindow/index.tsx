import {
	type CodeWindowChange,
	CodeWindowEvents,
	withChange,
} from "../../CodeWindowEvents";
import { VBox } from "../Container";
import { LanguageDropdown } from "../LanguageTab";
import SceneTab from "../SceneTab";
import { ThemeDropdown } from "../ThemeTab";

import "./styles.scss";
import "../SettingsTabs/styles.scss";

interface ThemeSettingsWindowProps {
	onCodeWindowChange: CodeWindowChange;
	settings: {
		selectedLanguage: string;
		selectedTheme: string;
	};
	position: "s-left" | "left";
	animation: "slide-in" | "slide-out";
}

interface SceneSettingsWindowProps {
	onCodeWindowChange: CodeWindowChange;
	windowBgColor: string;
	position: "s-right" | "right";
	animation: "slide-in-right" | "slide-out-right";
}

export function ThemeSettingsWindow(
	props: ThemeSettingsWindowProps,
): JSX.Element {
	return (
		<VBox
			centered={false}
			className={`modal ${props.position} ${props.animation}`}
		>
			<ThemeDropdown
				onThemeChange={withChange(
					CodeWindowEvents.THEME,
					props.onCodeWindowChange,
				)}
			/>

			<LanguageDropdown
				onEditorLanguageChange={withChange(
					CodeWindowEvents.LANGUAGE,
					props.onCodeWindowChange,
				)}
			/>
		</VBox>
	);
}

export function SceneSettingsWindow(
	props: SceneSettingsWindowProps,
): JSX.Element {
	return (
		<VBox
			centered={true}
			className={`modal ${props.position} ${props.animation}`}
		>
			<SceneTab
				onSceneChange={props.onCodeWindowChange}
				windowBgColor={props.windowBgColor}
			/>
		</VBox>
	);
}
