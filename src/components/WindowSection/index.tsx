import WebAssetIcon from "@mui/icons-material/WebAsset";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { HexColorPicker } from "react-colorful";
import * as CodeWindowEvents from "../../CodeWindowEvents";
import { HBox, VBox } from "../Container";
import LabeledSlider from "../LabeledSlider";
import { List } from "../List";
import Section from "../Section";
import SettingAccordion from "../SettingAccordion";
import Spacer from "../Spacer";
import TitleBar from "../TitleBar";

interface WindowSectionProps {
	onSceneChange: CodeWindowEvents.CodeWindowChange;
	windowBgColor: string;
}

interface TitleBarOptionsProps {
	onWindowTitleBarChange: (value: string) => void;
}

interface WindowPaddingOptionsProps {
	onHPaddingChange: (value: number) => void;
	onVPaddingChange: (value: number) => void;
}

interface WindowBackdropOptionsProps {
	onWindowBgColorChange: (value: string) => void;
	onWindowShadowAlphaChange: (value: number) => void;
	onWindowShadowToggleChange: (value: boolean) => void;
	onWindowShadowXChange: (value: number) => void;
	onWindowShadowYChange: (value: number) => void;
	windowBgColor: string;
}

interface TitleBarThemeContainerProps {
	onnClick: (value: string) => void;
	theme: string;
}

interface ColorPickerProps {
	color: string;
	onColorChange: (value: string) => void;
}

export default function WindowSection(props: WindowSectionProps): JSX.Element {
	return (
		<Section title="Window" icon={<WebAssetIcon />}>
			<SettingAccordion
				subTitle="Adjust the window's titlebar style"
				title="Window Controls"
			>
				<TitleBarOptions
					onWindowTitleBarChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.TITLEBAR,
						props.onSceneChange,
					)}
				/>
			</SettingAccordion>

			<SettingAccordion
				subTitle="Adjust the window's padding"
				title="Window Padding"
			>
				<WindowPaddingOptions
					onHPaddingChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.HORIZONTAL_PADDING,
						props.onSceneChange,
					)}
					onVPaddingChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.VERTICAL_PADDING,
						props.onSceneChange,
					)}
				/>
			</SettingAccordion>

			<SettingAccordion
				subTitle="Adjust the window's backdrop"
				title="Window Backdrop"
			>
				<WindowBackdropOptions
					onWindowBgColorChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.BG_COLOR,
						props.onSceneChange,
					)}
					onWindowShadowAlphaChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.SHADOW_ALPHA,
						props.onSceneChange,
					)}
					onWindowShadowToggleChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.SHADOW_TOGGLED,
						props.onSceneChange,
					)}
					onWindowShadowXChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.SHADOW_OFFSET_X,
						props.onSceneChange,
					)}
					onWindowShadowYChange={CodeWindowEvents.withChange(
						CodeWindowEvents.CodeWindowEvents.SHADOW_OFFSET_Y,
						props.onSceneChange,
					)}
					windowBgColor={props.windowBgColor}
				/>
			</SettingAccordion>
		</Section>
	);
}

function TitleBarOptions(props: TitleBarOptionsProps): JSX.Element {
	return (
		<VBox centered={false}>
			<List orientation="h">
				<TitleBarThemeContainer
					onnClick={props.onWindowTitleBarChange}
					theme="macos"
				/>

				<TitleBarThemeContainer
					onnClick={props.onWindowTitleBarChange}
					theme="windows"
				/>
			</List>
		</VBox>
	);
}

function TitleBarThemeContainer(
	props: TitleBarThemeContainerProps,
): JSX.Element {
	return (
		<div onClick={() => props.onnClick(props.theme)} className="rounded-border">
			<TitleBar theme={props.theme} />
		</div>
	);
}

function WindowPaddingOptions(props: WindowPaddingOptionsProps): JSX.Element {
	return (
		<VBox className="pd-s" centered={false}>
			<LabeledSlider
				defaultValue={5}
				label="Horizontal Padding"
				max={20}
				min={1}
				onChange={props.onHPaddingChange}
				step={1}
			/>
			<Spacer amount="1em" />
			<LabeledSlider
				defaultValue={5}
				label="Vertical Padding"
				max={20}
				min={1}
				onChange={props.onVPaddingChange}
				step={1}
			/>
		</VBox>
	);
}

function WindowBackdropOptions(props: WindowBackdropOptionsProps): JSX.Element {
	const spacerAmount = "0.7em";
	return (
		<VBox className="pd-s" centered={false}>
			<FormControlLabel
				control={
					<Checkbox
						defaultChecked={true}
						onChange={(event) =>
							props.onWindowShadowToggleChange(event.target.checked)
						}
					/>
				}
				label="Show shadows"
			/>

			<Spacer amount={spacerAmount} />

			<ColorPicker
				color={props.windowBgColor}
				onColorChange={props.onWindowBgColorChange}
			/>

			<Spacer amount={spacerAmount} />

			<LabeledSlider
				defaultValue={1}
				label="Horizontal offset"
				max={100}
				min={1}
				onChange={props.onWindowShadowXChange}
				step={1}
			/>

			<Spacer amount={spacerAmount} />
			<LabeledSlider
				defaultValue={2}
				label="Vertical offset"
				max={100}
				min={1}
				onChange={props.onWindowShadowYChange}
				step={1}
			/>
			<Spacer amount={spacerAmount} />
			<LabeledSlider
				defaultValue={2}
				label="Transparency"
				max={100}
				min={1}
				onChange={props.onWindowShadowAlphaChange}
				step={1}
			/>
		</VBox>
	);
}

function ColorPicker(props: ColorPickerProps): JSX.Element {
	const spacerAmount = "0.7em";
	return (
		<VBox centered={false}>
			<h4 className="fw-n">{`Background color`}</h4>
			<Spacer amount={spacerAmount} />
			<HexColorPicker
				color={props.color}
				onChange={props.onColorChange}
				style={{ width: "100%" }}
			/>
			<Spacer amount={spacerAmount} />
			<HBox centered={false}>
				<TextField
					fullWidth={false}
					label="Hex color"
					onChange={(event) => props.onColorChange(event.target.value)}
					size="medium"
					value={props.color}
					variant="outlined"
				/>
				<Spacer amount="0.2em" />
			</HBox>
		</VBox>
	);
}
