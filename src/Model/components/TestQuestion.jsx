import * as React from "react";
import {
	TextField,
	FormGroup,
	Button,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import QuestionOption from "./QuestionOption";
import classes from './Components.module.css'

const TestQuestion = ({ question, ...props }) => {
	// const [options, setOptions] = React.useState([])
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>{question.title}</Typography>
			</AccordionSummary>
			<AccordionDetails className={classes.flex__column}>
				<FormGroup row className={`${classes.flex__inputs} ${classes.align__center} ${classes.pt__40}`}>
					<TextField
						label="Вопрос"
						variant="filled"
						fullWidth
						placeholder="Вопрос"
						value={question.title}
						className={classes.question_title__input}
						onChange={(event) => props.changeQuestionTitle(event, question.id)}
					/>
					<TextField
						label="Баллы"
						variant="filled"
						
						placeholder="Баллы"
						value={question.points}
						className={classes.question_title__input}
						onChange={(event) => props.changeQuestionPoints(event, question.id)}
					/>
					<Button variant="contained" className={classes.delete__btn} onClick={() => props.deleteQuestion(question)}>
						<DeleteOutlinedIcon style={{ color: 'white' }} />
					</Button>
				</FormGroup>

				<FormGroup className={`${classes.pt__20}`}>
					{question.options.map((option) => <QuestionOption questionId={question.id} key={option.key} option={option} deleteOption={props.deleteOption} changeOptionTitle={props.changeOptionTitle} changeOptionCorrect={props.changeOptionCorrect} />)}
					<Button
						className={`${classes.mt__20} ${classes.secondary__button}`}
						variant="contained"
						onClick={() => props.addOption(question.id)}
					>
						<span>Добавить вариант</span>
						<HelpOutlineIcon />
					</Button>
				</FormGroup>
			</AccordionDetails>
		</Accordion>
	)
};

export default TestQuestion
