import ScreenshotMonitor from "@mui/icons-material/ScreenshotMonitor";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import type React from "react";
import { FILE_EXTENSIONS } from "../../Constants";

import { HBox, VBox } from "../Container";
import Selection from "../Selection";
import Spacer from "../Spacer";

interface ScreenshotProps {
	appRef: React.RefObject<HTMLDivElement>;
	fileName: string;
	fileExtension: string;
	handleFileNameChange: (value: string) => void;
	handleFileExtensionChange: (value: string) => void;
}

export default function Screenshot(props: ScreenshotProps): JSX.Element {
	const handleScreenshot = () => {
		const fileName = props.fileName;

		if (!fileName) {
			return;
		}

		const fileExtension = capitalize(props.fileExtension);
		const screenshotMethod = fromFileExtension(fileExtension);

		if (!screenshotMethod) {
			console.log(`Unknown download method: ${fileExtension}`);
			return;
		}

		const target = props.appRef.current?.children[1].children[2] as
			| HTMLElement
			| undefined;

		if (!target) {
			console.log("No screenshot target!");
			return;
		}

		screenshotMethod(target).then((dataUrl) => {
			download(dataUrl, `${fileName}.${props.fileExtension}`);
		});
	};

	const onFileNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
		props.handleFileNameChange(e.target.value);

	const textField =
		props.fileName.length === 0 ? (
			<TextField
				error
				label="File name"
				onChange={onFileNameChanged}
				variant="outlined"
			/>
		) : (
			<TextField
				defaultValue={props.fileName}
				label="File name"
				onChange={onFileNameChanged}
				variant="outlined"
			/>
		);

	return (
		<VBox centered={false}>
			<HBox centered={false}>
				{textField}

				<Spacer amount="0.5em" />

				<Selection
					defaultValue={1}
					label="Export as"
					onSelectionChange={props.handleFileExtensionChange}
					values={FILE_EXTENSIONS}
				/>
			</HBox>

			<Spacer amount="1em" />

			<Button
				onClick={handleScreenshot}
				size="medium"
				startIcon={<ScreenshotMonitor />}
				variant="contained"
			>
				{"Screenshot"}
			</Button>
		</VBox>
	);
}

function capitalize(fileExtension: string): string {
	return fileExtension[0].toUpperCase() + fileExtension.slice(1);
}

function fromFileExtension(
	extension: string,
): ((target: HTMLElement) => Promise<string>) | null {
	switch (extension) {
		case "Svg":
			return htmlToImage.toSvg;
		case "Png":
			return htmlToImage.toPng;
		case "Jpeg":
			return htmlToImage.toJpeg;
		default:
			return null;
	}
}
