import {
	type CodeWindowChange,
	CodeWindowEvents as CodeWindowEvents_1,
	withChange,
} from "../../CodeWindowEvents";
import { LanguageDropdown } from "../LanguageTab";
import SceneTab from "../SceneTab";
import { ThemeDropdown } from "../ThemeTab";
import "../SettingsTabs/styles.scss";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import MonitorIcon from "@mui/icons-material/Monitor";
import { HBox, VBox } from "../Container";
import LabeledIcon from "../LabledIcon";
import Spacer from "../Spacer";
import "./styles.scss";
import Button from "@mui/material/Button";

interface ThemeSettingsWindowProps {
	onSceneChange: CodeWindowChange;
	settings: {
		selectedLanguage: string;
		selectedTheme: string;
	};
	position: "s-left" | "left";
	animation: "" | "slide-in" | "slide-out";
}

interface SceneSettingsWindowProps {
	windowBgColor: string;
	shadowsToggled: boolean;
	lineNumbersToggled: boolean;
	editorFontSize: number;
	onSceneChange: CodeWindowChange;
	position: "s-right" | "right";
	animation: "" | "slide-in-right" | "slide-out-right";
}

const ThemeMenu = (props: { onSceneChange: CodeWindowChange }): JSX.Element => {
	return (
		<VBox centered={false} className="tab-item">
			<LabeledIcon label="Theme">
				<FormatColorTextIcon />
			</LabeledIcon>

			<Spacer amount="0.5em" />

			<ThemeDropdown
				onThemeChange={withChange(
					CodeWindowEvents_1.THEME,
					props.onSceneChange,
				)}
			/>

			<LanguageDropdown
				onEditorLanguageChange={withChange(
					CodeWindowEvents_1.LANGUAGE,
					props.onSceneChange,
				)}
			/>
		</VBox>
	);
};

const ThemeSettingsMenu = (props: ThemeSettingsWindowProps): JSX.Element => {
	return (
		<VBox
			centered={false}
			className={`modal ${props.position} ${props.animation}`}
		>
			<ThemeMenu onSceneChange={props.onSceneChange} />
		</VBox>
	);
};

const SceneSettingsMenu = (props: SceneSettingsWindowProps): JSX.Element => {
	return (
		<VBox
			centered={true}
			className={`modal ${props.position} ${props.animation}`}
		>
			<SceneTab
				shadowsToggled={props.shadowsToggled}
				lineNumbersToggled={props.lineNumbersToggled}
				windowBgColor={props.windowBgColor}
				onSceneChange={props.onSceneChange}
				editorFontSize={props.editorFontSize}
			/>
		</VBox>
	);
};

interface EditorMenuProps {
	openThemeWindow: boolean;
	themeWindowEverOpened: boolean;
	openSceneWindow: boolean;
	sceneWindowEverOpened: boolean;
	editorLanguage: string;
	editorTheme: string;
	windowBgColor: string;
	shadowsToggled: boolean;
	lineNumbersToggled: boolean;
	editorFontSize: number;
	handleCodeWindowChanges: CodeWindowChange;
	handleThemeButtonPress: (open: boolean, everOpened: boolean) => void;
	handleSceneButtonPress: (open: boolean, everOpened: boolean) => void;
}

export default (props: EditorMenuProps): JSX.Element => {
	return (
		<div>
			<ThemeSettingsMenu
				onSceneChange={props.handleCodeWindowChanges}
				position={props.openThemeWindow ? "left" : "s-left"}
				animation={
					!props.themeWindowEverOpened
						? ""
						: props.openThemeWindow
							? "slide-in"
							: "slide-out"
				}
				settings={{
					selectedLanguage: props.editorLanguage,
					selectedTheme: props.editorTheme,
				}}
			/>

			<SceneSettingsMenu
				shadowsToggled={props.shadowsToggled}
				lineNumbersToggled={props.lineNumbersToggled}
				windowBgColor={props.windowBgColor}
				onSceneChange={props.handleCodeWindowChanges}
				editorFontSize={props.editorFontSize}
				position={props.openSceneWindow ? "right" : "s-right"}
				animation={
					!props.sceneWindowEverOpened
						? ""
						: props.openSceneWindow
							? "slide-in-right"
							: "slide-out-right"
				}
			/>

			<HBox centered={true}>
				<Button
					onClick={() =>
						props.handleThemeButtonPress(!props.openThemeWindow, true)
					}
					size="medium"
					startIcon={<FormatColorTextIcon />}
					variant="contained"
				>
					{"Theme"}
				</Button>

				<Spacer amount={"1em"} />

				<Button
					onClick={() =>
						props.handleSceneButtonPress(!props.openSceneWindow, true)
					}
					size="medium"
					endIcon={<MonitorIcon />}
					variant="contained"
				>
					{"Scene"}
				</Button>
			</HBox>
		</div>
	);
};
