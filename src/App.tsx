import { createTheme } from "@mui/material/styles";
import React, { createRef } from "react";
import { CodeWindowEvents } from "./CodeWindowEvents";
import CodeWindow from "./components/CodeWindow";
import { HBox, VBox } from "./components/Container";
// import SettingsTabs from "./components/SettingsTabs";
import Screenshot from "./components/Screenshot";
import { default as EditorMenu } from "./components/SettingsMenus";
import Spacer from "./components/Spacer";
import { FONTS, THEMES } from "./EditorConstants";
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

	openThemeWindow: boolean;
	openSceneWindow: boolean;
	themeWindowEverOpened: boolean;
	sceneWindowEverOpened: boolean;
}

export default class App extends React.Component<Utils.Empty, AppState> {
	private appRef: React.RefObject<HTMLDivElement> = createRef();

	private handleKeyPress = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "a") {
			e.preventDefault();
			this.setState({
				openThemeWindow: !this.state.openThemeWindow,
				themeWindowEverOpened: true,
			});
		}

		if (e.ctrlKey && e.key === "d") {
			e.preventDefault();
			this.setState({
				openSceneWindow: !this.state.openSceneWindow,
				sceneWindowEverOpened: true,
			});
		}
	};

	constructor(props: Utils.Empty) {
		super(props);

		const defaultTheme = THEMES[3];

		this.state = {
			editorExtraThemes: [],
			editorFont: FONTS[1],
			editorFontSize: 21,
			editorLanguage: "javascript",
			editorLineHeight: 1.2,
			editorTheme: defaultTheme,
			fileName: "",
			showLineNumbers: true,
			showWindowDropShadow: true,
			titlebarTheme: "macos",
			windowBgColor: createTheme().palette.primary.main,
			windowDropShadowAlpha: 20,
			windowDropShadowOffsetX: 1,
			windowDropShadowOffsetY: 2,
			windowPaddingH: 5,
			windowPaddingV: 5,
			openThemeWindow: false,
			openSceneWindow: false,
			themeWindowEverOpened: false,
			sceneWindowEverOpened: false,
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
					<Spacer amount="1em" />

					<EditorMenu
						openThemeWindow={this.state.openThemeWindow}
						themeWindowEverOpened={this.state.themeWindowEverOpened}
						openSceneWindow={this.state.openSceneWindow}
						sceneWindowEverOpened={this.state.sceneWindowEverOpened}
						editorLanguage={this.state.editorLanguage}
						editorTheme={this.state.editorTheme}
						windowBgColor={this.state.windowBgColor}
						shadowsToggled={this.state.showWindowDropShadow}
						lineNumbersToggled={this.state.showLineNumbers}
						handleCodeWindowChanges={this.handleCodeWindowChanges}
						handleThemeButtonPress={this.handleThemeButtonPress}
						handleSceneButtonPress={this.handleSceneButtonPress}
					/>

					<Spacer amount="1em" />
				</VBox>
			</div>
		);
	}

	private handleThemeButtonPress = (show: boolean, everPressed: boolean) =>
		this.setState({
			openThemeWindow: show,
			themeWindowEverOpened: everPressed,
		});

	private handleSceneButtonPress = (show: boolean, everPressed: boolean) =>
		this.setState({
			openSceneWindow: show,
			sceneWindowEverOpened: everPressed,
		});

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
				this.setState({ windowDropShadowOffsetX: value as number });
				break;
			case CodeWindowEvents.SHADOW_OFFSET_Y:
				this.setState({ windowDropShadowOffsetY: value as number });
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
