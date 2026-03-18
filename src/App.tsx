import { createTheme } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { CodeWindowEvents } from "./CodeWindowEvents";
import { FILE_EXTENSIONS, FONTS, LANGUAGES, THEMES } from "./Constants";
import CodeWindow from "./components/CodeWindow";
import { HBox, VBox } from "./components/Container";
import Screenshot from "./components/Screenshot";
import { default as EditorMenu } from "./components/SettingsMenus";
import SettingsTabs from "./components/SettingsTabs";
import Spacer from "./components/Spacer";
import type * as Utils from "./Utils";

import "./scss/index.scss";

interface GithubBannerProps {
	children: JSX.Element | readonly JSX.Element[];
}

const GithubBanner = (props: GithubBannerProps): JSX.Element => (
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

const GithubRibbon = (): JSX.Element => (
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

export default function App(): JSX.Element {
	const defaultTheme = THEMES[3];

	const appRef = useRef<HTMLDivElement>(null);

	const [editorFont, setEditorFont] = useState<string>(FONTS[1]);
	const [editorFontSize, setEditorFontSize] = useState<number>(21);
	const [editorLanguage, setEditorLanguage] = useState<string>(LANGUAGES[42]);
	const [editorLineHeight, setEditorLineHeight] = useState<number>(1.2);
	const [editorTheme, setEditorTheme] = useState<string>(defaultTheme);
	const [fileExtension, setFileExtension] = useState<string>(
		FILE_EXTENSIONS[0],
	);
	const [fileName, setFileName] = useState<string>("HelloWorld");
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
	const [openSceneWindow, setOpenSceneWindow] = useState<boolean>(false);
	const [openThemeWindow, setOpenThemeWindow] = useState<boolean>(false);
	const [sceneWindowEverOpened, setSceneWindowEverOpened] =
		useState<boolean>(false);
	const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
	const [showWindowDropShadow, setShowWindowDropShadow] =
		useState<boolean>(true);
	const [themeWindowEverOpened, setThemeWindowEverOpened] =
		useState<boolean>(false);
	const [titlebarTheme, setTitlebarTheme] = useState<string>("macos");
	const [windowBgColor, setWindowBgColor] = useState<string>(
		createTheme().palette.primary.main,
	);
	const [windowDropShadowAlpha, setWindowDropShadowAlpha] =
		useState<number>(20);
	const [windowDropShadowOffsetX, setWindowDropShadowOffsetX] =
		useState<number>(1);
	const [windowDropShadowOffsetY, setWindowDropShadowOffsetY] =
		useState<number>(2);
	const [windowPaddingH, setWindowPaddingH] = useState<number>(5);
	const [windowPaddingV, setWindowPaddingV] = useState<number>(5);

	// Initialize theme on mount
	useEffect(() => {
		updateTheme(defaultTheme);
	}, [defaultTheme]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "a") {
				e.preventDefault();
				setOpenThemeWindow((prev) => !prev);
				setThemeWindowEverOpened(true);
			}
			if (e.ctrlKey && e.key === "d") {
				e.preventDefault();
				setOpenSceneWindow((prev) => !prev);
				setSceneWindowEverOpened(true);
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);

	// Window resize
	useEffect(() => {
		const handleWindowSizeChange = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleWindowSizeChange);
		return () => window.removeEventListener("resize", handleWindowSizeChange);
	}, []);

	const handleThemeButtonPress = useCallback(
		(show: boolean, everPressed: boolean) => {
			setOpenThemeWindow(show);
			setThemeWindowEverOpened(everPressed);
		},
		[],
	);

	const handleSceneButtonPress = useCallback(
		(show: boolean, everPressed: boolean) => {
			setOpenSceneWindow(show);
			setSceneWindowEverOpened(everPressed);
		},
		[],
	);

	const handleFileNameChange = useCallback((newFileName: string): void => {
		const cutOff = 20;
		setFileName(
			newFileName.length <= cutOff ? newFileName : newFileName.slice(0, cutOff),
		);
	}, []);

	const handleFileExtensionChange = useCallback(
		(newFileExtension: string): void => {
			setFileExtension(newFileExtension);
		},
		[],
	);

	const handleLanguageChange = useCallback(
		(newLanguage: string): void => {
			newLanguage = newLanguage.toLowerCase();
			if (editorLanguage !== newLanguage) {
				setEditorLanguage(newLanguage);
			}
		},
		[editorLanguage],
	);

	const handleThemeChange = useCallback(
		(theme: string): void => {
			theme = theme.toLowerCase();
			const updatedTheme = theme.slice().replace(/\s/g, "-");

			if (editorTheme === updatedTheme) return;

			updateTheme(updatedTheme);
			setEditorTheme(theme);
		},
		[editorTheme],
	);

	const handleCodeWindowChanges = useCallback(
		(change: CodeWindowEvents, value: Utils.Primitive): void => {
			switch (change) {
				case CodeWindowEvents.THEME:
					handleThemeChange(value as string);
					return;
				case CodeWindowEvents.LANGUAGE:
					handleLanguageChange(value as string);
					return;
				case CodeWindowEvents.EDITOR_FONT_CHANGED:
					setEditorFont(value as string);
					break;
				case CodeWindowEvents.BG_COLOR:
					setWindowBgColor(value as string);
					break;
				case CodeWindowEvents.TITLEBAR:
					setTitlebarTheme(value as string);
					break;
				case CodeWindowEvents.EDITOR_FONT_SIZE_INCREASED:
					setEditorFontSize(value as number);
					break;
				case CodeWindowEvents.VERTICAL_PADDING:
					setWindowPaddingV(value as number);
					break;
				case CodeWindowEvents.HORIZONTAL_PADDING:
					setWindowPaddingH(value as number);
					break;
				case CodeWindowEvents.SHADOW_OFFSET_X:
					setWindowDropShadowOffsetX(value as number);
					break;
				case CodeWindowEvents.SHADOW_OFFSET_Y:
					setWindowDropShadowOffsetY(value as number);
					break;
				case CodeWindowEvents.SHADOW_ALPHA:
					setWindowDropShadowAlpha(value as number);
					break;
				case CodeWindowEvents.SHADOW_TOGGLED:
					setShowWindowDropShadow(value as boolean);
					break;
				case CodeWindowEvents.EDITOR_LINES_INCREASED:
					setEditorLineHeight(value as number);
					break;
				case CodeWindowEvents.EDITOR_LINES_TOGGLED:
					setShowLineNumbers(value as boolean);
					break;
				default:
					console.error("Unexpected change!:\n", value);
					return;
			}
		},
		[handleThemeChange, handleLanguageChange],
	);

	const spacerAmount = "2em";

	return (
		<div ref={appRef}>
			<GithubBanner>
				<GithubRibbon />
			</GithubBanner>

			<VBox centered={true}>
				<HBox centered={true}>
					<h1 id="header">Scratchpad</h1>
				</HBox>
				<Spacer amount={spacerAmount} />
				<CodeWindow
					dropShadowAlpha={windowDropShadowAlpha}
					dropShadowOffsets={{
						x: windowDropShadowOffsetX,
						y: windowDropShadowOffsetY,
					}}
					editorFontSize={editorFontSize}
					editorFont={editorFont}
					editorLanguage={editorLanguage}
					editorLineHeight={editorLineHeight}
					editorTheme={editorTheme}
					fileName={fileName}
					showDropShadow={showWindowDropShadow}
					showEditorLineNumbers={showLineNumbers}
					titlebarTheme={titlebarTheme}
					windowBgColor={windowBgColor}
					windowPadding={{ x: windowPaddingH, y: windowPaddingV }}
				/>

				<Spacer amount={spacerAmount} />

				<Screenshot
					appRef={appRef}
					fileName={fileName}
					fileExtension={fileExtension}
					handleFileNameChange={handleFileNameChange}
					handleFileExtensionChange={handleFileExtensionChange}
				/>
				<Spacer amount="1em" />

				{isMobile ? (
					<SettingsTabs
						onCodeWindowChange={handleCodeWindowChanges}
						selectedLanguage={editorLanguage}
						selectedTheme={editorTheme}
						windowBgColor={windowBgColor}
						shadowsToggled={showWindowDropShadow}
						lineNumbersToggled={showLineNumbers}
					/>
				) : (
					<EditorMenu
						openThemeWindow={openThemeWindow}
						themeWindowEverOpened={themeWindowEverOpened}
						openSceneWindow={openSceneWindow}
						sceneWindowEverOpened={sceneWindowEverOpened}
						editorLanguage={editorLanguage}
						editorTheme={editorTheme}
						windowBgColor={windowBgColor}
						shadowsToggled={showWindowDropShadow}
						lineNumbersToggled={showLineNumbers}
						handleCodeWindowChanges={handleCodeWindowChanges}
						handleThemeButtonPress={handleThemeButtonPress}
						handleSceneButtonPress={handleSceneButtonPress}
					/>
				)}
			</VBox>
		</div>
	);
}

function updateTheme(theme: string): void {
	document.head.querySelectorAll("link").forEach((link) => {
		if (link.dataset.id === "editor-theme") {
			link.remove();
		}
	});

	const style = document.createElement("link");
	style.dataset.id = "editor-theme";
	style.href = `/styles/${theme}.css`;
	style.rel = "stylesheet";

	document.head.appendChild(style);
}
