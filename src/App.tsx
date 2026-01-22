import DvrIcon from "@mui/icons-material/Dvr";
import FormatPaintRounded from "@mui/icons-material/FormatPaintRounded";
import Button from "@mui/material/Button";
import React, { createRef } from "react";
import { CodeWindowEvents } from "./CodeWindowEvents";
import CodeWindow from "./components/CodeWindow";
import { HBox, VBox } from "./components/Container";
// import SettingsTabs from "./components/SettingsTabs";
import Screenshot from "./components/Screenshot";
import {
	SceneSettingsWindow,
	ThemeSettingsWindow,
} from "./components/SettingsWindow";
import Spacer from "./components/Spacer";
import { THEMES } from "./EditorConstants";
import type * as Utils from "./Utils";

import "./scss/index.scss";

interface GithubBannerProps {
	children: JSX.Element | readonly JSX.Element[];
}

const GithubBanner = (props: GithubBannerProps): JSX.Element => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-end",
			}}
		>
			{props.children}
		</div>
	);
};

const GithubRibbon = (): JSX.Element => {
	return (
		<a
			href="https://github.com/fsloth5/scratchpad.git"
			target="_blank"
			rel="noopener noreferrer"
			className="shimmer-container shimmer-screen"
		>
			<img
				loading="lazy"
				decoding="async"
				width="140"
				height="140"
				src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png"
				className="attachment-full size-full"
				alt="Fork me on GitHub"
			/>
		</a>
	);
};

interface AppState {
	editorExtraThemes: string[];
	editorFont: string;
	editorFontSize: number;
	editorLanguage: string;
	editorLineHeight: number;
	editorTheme: string;
	fileName: string;
	showLineNumbers: boolean;
	showWindowDropShadow: boolean;
	titlebarTheme: string;
	windowBgColor: string;
	windowDropShadowAlpha: number;
	windowDropShadowOffsetX: number;
	windowDropShadowOffsetY: number;
	windowPaddingH: number;
	windowPaddingV: number;
	desktopMenuState: {
		openThemeWindow: boolean;
		openSceneWindow: boolean;
	};
}

export default class App extends React.Component<Utils.Empty, AppState> {
	private appRef: React.RefObject<HTMLDivElement> = createRef();

	handleKeyPress = (e: KeyboardEvent) => {
		// Check for specific key combinations
		if (e.key === "a" || (e.shiftKey && e.key === "a")) {
			e.preventDefault();
			this.setState({
				desktopMenuState: {
					openThemeWindow: !this.state.desktopMenuState.openThemeWindow,
					openSceneWindow: this.state.desktopMenuState.openSceneWindow,
				},
			});
		}

		if (e.key === "d" || (e.shiftKey && e.key === "d")) {
			e.preventDefault();
			this.setState({
				desktopMenuState: {
					openThemeWindow: this.state.desktopMenuState.openThemeWindow,
					openSceneWindow: !this.state.desktopMenuState.openSceneWindow,
				},
			});
		}
	};

	constructor(props: Utils.Empty) {
		super(props);

		const defaultTheme = THEMES[3];

		this.state = {
			editorExtraThemes: [],
			editorFont: "Fira code",
			editorFontSize: 21,
			editorLanguage: "javascript",
			editorLineHeight: 1.2,
			editorTheme: defaultTheme,
			fileName: "",
			showLineNumbers: true,
			showWindowDropShadow: true,
			titlebarTheme: "macos",
			windowBgColor: "#1565c0",
			windowDropShadowAlpha: 20,
			windowDropShadowOffsetX: 1,
			windowDropShadowOffsetY: 2,
			windowPaddingH: 5,
			windowPaddingV: 5,
			desktopMenuState: { openThemeWindow: false, openSceneWindow: false },
		};

		updateTheme(defaultTheme);
	}

	componentDidMount() {
		window.addEventListener("keydown", this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.handleKeyPress);
	}

	render() {
		const spacerAmount = "2em";

		return (
			<div ref={this.appRef}>
				<GithubBanner>
					<GithubRibbon />
				</GithubBanner>

				<VBox centered={true}>
					<HBox centered={true}>
						<h1 id="header">Scratchpad</h1>
					</HBox>

					<Spacer amount={spacerAmount} />

					<CodeWindow
						dropShadowAlpha={this.state.windowDropShadowAlpha}
						dropShadowOffsets={{
							x: this.state.windowDropShadowOffsetX,
							y: this.state.windowDropShadowOffsetY,
						}}
						editorFontSize={this.state.editorFontSize}
						editorFont={this.state.editorFont}
						editorLanguage={this.state.editorLanguage}
						editorLineHeight={this.state.editorLineHeight}
						editorTheme={this.state.editorTheme}
						fileName={this.state.fileName}
						showDropShadow={this.state.showWindowDropShadow}
						showEditorLineNumbers={this.state.showLineNumbers}
						titlebarTheme={this.state.titlebarTheme}
						windowBgColor={this.state.windowBgColor}
						windowPadding={{
							x: this.state.windowPaddingH,
							y: this.state.windowPaddingV,
						}}
					/>

					<Spacer amount={spacerAmount} />

					<Screenshot
						onFileNameChange={this.handleFileNameChange}
						appRef={this.appRef}
					/>

					<Spacer amount={"1em 0"} />

					{this.state.desktopMenuState.openThemeWindow ? (
						<ThemeSettingsWindow
							onCodeWindowChange={this.handleCodeWindowChanges}
							position={"left"}
							animation={"slide-in"}
							settings={{
								selectedLanguage: this.state.editorLanguage,
								selectedTheme: this.state.editorTheme,
							}}
						/>
					) : (
						<ThemeSettingsWindow
							onCodeWindowChange={this.handleCodeWindowChanges}
							position={"s-left"}
							animation={"slide-out"}
							settings={{
								selectedLanguage: this.state.editorLanguage,
								selectedTheme: this.state.editorTheme,
							}}
						/>
					)}
					{this.state.desktopMenuState.openSceneWindow ? (
						<SceneSettingsWindow
							onCodeWindowChange={this.handleCodeWindowChanges}
							windowBgColor={this.state.windowBgColor}
							position={"right"}
							animation={"slide-in-right"}
						/>
					) : (
						<SceneSettingsWindow
							onCodeWindowChange={this.handleCodeWindowChanges}
							windowBgColor={this.state.windowBgColor}
							position={"s-right"}
							animation={"slide-out-right"}
						/>
					)}

					<HBox centered={true}>
						<Button
							onClick={() =>
								this.setState({
									desktopMenuState: {
										openSceneWindow:
											this.state.desktopMenuState.openSceneWindow,
										openThemeWindow:
											!this.state.desktopMenuState.openThemeWindow,
									},
								})
							}
							size="large"
							startIcon={<FormatPaintRounded />}
							variant="contained"
						>
							{"Theme"}
						</Button>

						<Spacer amount={"0 4em 6em 4em"} />

						<Button
							onClick={() =>
								this.setState({
									desktopMenuState: {
										openSceneWindow:
											!this.state.desktopMenuState.openSceneWindow,
										openThemeWindow:
											this.state.desktopMenuState.openThemeWindow,
									},
								})
							}
							size="large"
							startIcon={<DvrIcon />}
							variant="contained"
						>
							{"Scene"}
						</Button>
					</HBox>
				</VBox>
			</div>
		);
	}

	private handleFileNameChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		const cutOff = 20;
		const fileName: string = event.target.value;
		this.setState({
			fileName:
				fileName.length <= cutOff ? fileName : fileName.slice(0, cutOff),
		});
	};

	private handleLanguageChange = (newLanguage: string): void => {
		newLanguage = newLanguage.toLowerCase();
		if (this.state.editorLanguage !== newLanguage) {
			this.setState({ editorLanguage: newLanguage });
		}
	};

	private handleThemeChange = (theme: string): void => {
		theme = theme.toLowerCase();

		const updatedTheme = theme.slice().replace(/\s/g, "-");

		if (this.state.editorTheme === updatedTheme) {
			return;
		}

		updateTheme(updatedTheme);

		this.setState({
			editorTheme: theme,
		});
	};

	private handleCodeWindowChanges = (
		change: CodeWindowEvents,
		value: Utils.Primitive,
	): void => {
		switch (change) {
			case CodeWindowEvents.THEME:
				this.handleThemeChange(value as string);
				return;
			case CodeWindowEvents.LANGUAGE:
				this.handleLanguageChange(value as string);
				return;
			case CodeWindowEvents.EDITOR_FONT_CHANGED:
				this.setState({ editorFont: value as string });
				break;
			case CodeWindowEvents.BG_COLOR:
				this.setState({ windowBgColor: value as string });
				break;
			case CodeWindowEvents.TITLEBAR:
				this.setState({ titlebarTheme: value as string });
				break;
			case CodeWindowEvents.EDITOR_FONT_SIZE_INCREASED:
				this.setState({ editorFontSize: value as number });
				break;
			case CodeWindowEvents.VERTICAL_PADDING:
				this.setState({ windowPaddingV: value as number });
				break;
			case CodeWindowEvents.HORIZONTAL_PADDING:
				this.setState({ windowPaddingH: value as number });
				break;
			case CodeWindowEvents.SHADOW_OFFSET_X:
				this.setState({ windowDropShadowOffsetY: value as number });
				break;
			case CodeWindowEvents.SHADOW_OFFSET_Y:
				this.setState({ windowDropShadowOffsetX: value as number });
				break;
			case CodeWindowEvents.SHADOW_ALPHA:
				this.setState({ windowDropShadowAlpha: value as number });
				break;
			case CodeWindowEvents.SHADOW_TOGGLED:
				this.setState({ showWindowDropShadow: value as boolean });
				break;
			case CodeWindowEvents.EDITOR_LINES_INCREASED:
				this.setState({ editorLineHeight: value as number });
				break;
			case CodeWindowEvents.EDITOR_LINES_TOGGLED:
				this.setState({ showLineNumbers: value as boolean });
				break;
			default:
				console.error("Unexpected change!:\n", value);
				return;
		}
	};
}

function updateTheme(theme: string): void {
	document.head.querySelectorAll("link").forEach((link) => {
		if (link.dataset.id === "editor-theme") {
			link.remove();
			return;
		}
	});

	const style = document.createElement("link");
	style.dataset.id = "editor-theme";
	style.href = `/styles/${theme}.css`;
	style.rel = "stylesheet";

	document.head.appendChild(style);
}
