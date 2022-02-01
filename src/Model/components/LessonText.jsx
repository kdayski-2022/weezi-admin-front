import * as React from "react";
import LessonAddition from "./LessonAddition";

const LessonText = props => {
	return (
		<div>
			<div>я текст</div>
			<LessonAddition switchAddition={props.switchAddition} additions={props.additions} />
		</div>
	)
};

export default LessonText
