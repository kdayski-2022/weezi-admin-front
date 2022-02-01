import * as React from "react";
import { Button, FormGroup, FormControlLabel,Checkbox, TextField } from '@material-ui/core'
// import LessonAddition from "./LessonAddition";
import TestQuestion from "./TestQuestion"
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import classes from './Components.module.css'

const LessonTest = props => {
	const addQuestion = () => {
		const id = Math.random().toString(36).slice(2)
		let newData = JSON.parse(JSON.stringify(props.data))
		newData.questions.push({
			id,
			title: "Новый вопрос",
			options: [
				{
					id: Math.random().toString(36).slice(2),
					correct: false,
					title: ''
				}
			]
		})
		props.changeData(newData)
	}

	const deleteQuestion = (q) => {
		let newData = JSON.parse(JSON.stringify(props.data))
		const newQuestions = newData.questions.filter((question) => q.id !== question.id)
		newData.questions = newQuestions
		props.changeData(newData)
	}

	const deleteOption = (questionId, o) => {
		console.log(o.id)
		let newData = JSON.parse(JSON.stringify(props.data))
		let question = newData.questions.find((question) => question.id === questionId)
		const questionIndex = newData.questions.indexOf(question)
		const options = question.options.filter((option) => option.id !== o.id)
		console.log(options)
		newData.questions[questionIndex].options = options
		props.changeData(newData)
	}

	const addOption = (questionId) => {
		const id = Math.random().toString(36).slice(2)
		console.log(id)
		let newData = JSON.parse(JSON.stringify(props.data))
		let question = newData.questions.find((question) => question.id === questionId)
		question.options.push({
			id,
			correct: false,
			value: 1,
			title: ''
		})
		const questionIndex = newData.questions.indexOf(question)
		newData.questions[questionIndex] = question
		props.changeData(newData)
	}

	const changeQuestionTitle = (event, questionId) => {
		// TODO На каждый инпут перезаписывается глобальный объект и тормозит из-за этого
		let newData = JSON.parse(JSON.stringify(props.data))
		let question = newData.questions.find((question) => question.id === questionId)
		question.title = event.target.value
		newData.question = question
		props.changeData(newData)
	}
	const changeQuestionPoints = (event, questionId) => {
		// TODO На каждый инпут перезаписывается глобальный объект и тормозит из-за этого
		let newData = JSON.parse(JSON.stringify(props.data))
		let question = newData.questions.find((question) => question.id === questionId)
		question.points = event.target.value
		newData.question = question
		props.changeData(newData)
	}
	const changeOptionTitle = (event, questionId, optionId) => {
		// TODO На каждый инпут перезаписывается глобальный объект и тормозит из-за этого
		let newData = JSON.parse(JSON.stringify(props.data))
		let question = newData.questions.find((question) => question.id === questionId)
		const questionIndex = newData.questions.indexOf(question)
		let option = question.options.find((option) => option.id === optionId)
		const optionIndex = question.options.indexOf(option)
		newData.questions[questionIndex].options[optionIndex].title = event.target.value
		props.changeData(newData)
	}
	
	const changeOptionCorrect = (event, questionId, optionId) => {
		// TODO На каждый инпут перезаписывается глобальный объект и тормозит из-за этого
		let newData = JSON.parse(JSON.stringify(props.data))
		let question = newData.questions.find((question) => question.id === questionId)
		const questionIndex = newData.questions.indexOf(question)
		let option = question.options.find((option) => option.id === optionId)
		const optionIndex = question.options.indexOf(option)
		newData.questions[questionIndex].options[optionIndex].correct = !newData.questions[questionIndex].options[optionIndex].correct
		props.changeData(newData)
	}
	const changeShuffleOption = (event, questionId, optionId) => {
		console.log('changeShuffleOption')
		let newData = JSON.parse(JSON.stringify(props.data))
		newData.shuffle = event.target.checked
		props.changeData(newData)
	}
	const changeShowCorrectOption = (event, questionId, optionId) => {
		console.log('changeShowCorrectOption')
		let newData = JSON.parse(JSON.stringify(props.data))
		newData.showCorrect = event.target.checked
		props.changeData(newData)
	}
	const changeTimeOption = (event, questionId, optionId) => {
		console.log('changeTimeOption')
		let newData = JSON.parse(JSON.stringify(props.data))
		newData.time = event.target.value
		props.changeData(newData)
	}
	return (
		<FormGroup className={classes.flex__inputs}>
			<FormControlLabel
				control={<Checkbox onChange = {changeShuffleOption} checked={props.data.shuffle ? 'checked': false}/>}
				label="Перемешивать вопросы"
				labelPlacement="end"
			/>
			<FormControlLabel
				control={<Checkbox onChange = {changeShowCorrectOption} checked={props.data.showCorrect ? 'checked': false}/>}
				label="Показать правильные/неправильные варианты ответа"
				labelPlacement="end"
			/>
			<TextField label="Время на выполнение (минуты)" variant="standard" onChange = {changeTimeOption} defaultValue={props.data.time}/>
			{props.data.questions.map((question) => <TestQuestion key={question.id} question={question} deleteQuestion={deleteQuestion} changeQuestionTitle={changeQuestionTitle} changeQuestionPoints={changeQuestionPoints} addOption={addOption} deleteOption={deleteOption} changeOptionTitle={changeOptionTitle} changeOptionCorrect={changeOptionCorrect} />)}
			<Button
				variant="contained"
				color="primary"
				onClick={addQuestion}
				className={`${classes.primary__button} ${classes.mt__20}`}
			>
				<span>Добавить вопрос</span>
				<InsertDriveFileOutlinedIcon />
			</Button>
			{/* <LessonAddition switchAddition={props.switchAddition} additions={props.additions} changeData={props.changeData} /> */}
		</FormGroup>
	)
};

export default LessonTest
