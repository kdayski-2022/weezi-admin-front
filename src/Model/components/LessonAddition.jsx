import * as React from "react";
import { FormGroup, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import classes from './Components.module.css'

const LessonAddition = props => {
	return (
		<FormGroup row className={classes.flex__inputs}>
			<FormControl variant="filled" fullWidth>
				<InputLabel id="lessonTypeLabel">Дополнение к уроку</InputLabel>
				<Select
					labelId="lessonTypeLabel"
					id="lessonType"
					onChange={props.switchAddition}
				>
					<MenuItem value="" disabled>
						<span>Добавить дополнительные материала (видео, текст, картинки, инфографика)</span>
					</MenuItem>
					{props.additions.map((addition) => <MenuItem value={addition.type}>{addition.name}</MenuItem>)}
				</Select>
			</FormControl>
		</FormGroup>
	)
};

export default LessonAddition
