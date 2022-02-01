import * as React from "react";
import { TextField, FormGroup, Button } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import classes from './Components.module.css'

const TestQuestion = ({ option, ...props }) => {
	return (
		<FormGroup row className={`${classes.flex__inputs} ${classes.align__center} ${classes.pt__10}`}>
			<Button
				variant="contained"
				className={option.correct ? classes.success_btn : classes.delete__btn}
				onClick={(event) => props.changeOptionCorrect(event, props.questionId, option.id)}
			>
				{option.correct ? <CheckIcon style={{ color: 'white' }} /> : <CloseIcon style={{ color: 'white' }} />}
			</Button>
			<TextField
				label="Вариант"
				variant="filled"
				fullWidth
				placeholder="Вариант"
				value={option.title}
				onChange={(event) => props.changeOptionTitle(event, props.questionId, option.id)} />
			<Button variant="contained" className={classes.delete__btn} onClick={() => props.deleteOption(props.questionId, option)}>
				<DeleteOutlinedIcon style={{ color: 'white' }} />
			</Button>
		</FormGroup>
	)
};

export default TestQuestion
