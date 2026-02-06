import MonitorIcon from "@mui/icons-material/Monitor";
import type { CodeWindowChange } from "../../CodeWindowEvents";
import { VBox } from "../Container";
import EditorSection from "../EditorSection";
import LabeledIcon from "../LabledIcon";
import { List } from "../List";
import Spacer from "../Spacer";
import WindowSection from "../WindowSection";

interface SceneTabProps {
	windowBgColor: string;
	shadowsToggled: boolean;
	lineNumbersToggled: boolean;
	onSceneChange: CodeWindowChange;
}

export default function SceneTab(props: SceneTabProps): JSX.Element {
	return (
		<VBox id="scene-tab" className="tab-item" centered={false}>
			<LabeledIcon label="Scene">
				<MonitorIcon />
			</LabeledIcon>
			<Spacer amount="0.5em" />
			<List orientation="v">
				<WindowSection
					windowBgColor={props.windowBgColor}
					shadowsToggled={props.shadowsToggled}
					onSceneChange={props.onSceneChange}
				/>
				<EditorSection
					toggleLineNumbers={props.lineNumbersToggled}
					onEditorSettingsChange={props.onSceneChange}
				/>
			</List>
		</VBox>
	);
}
