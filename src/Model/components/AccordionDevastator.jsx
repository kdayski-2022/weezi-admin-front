import * as React from "react";
import { Button, FormGroup } from '@material-ui/core'
// import LessonAddition from "./LessonAddition";
import Accordion from "./Accordion"
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import classes from './Components.module.css'

const AccordionInput = props => {
	const addRow = () => {
		const id = Math.random().toString(36).slice(2)
		let newData = JSON.parse(JSON.stringify(props.data))
		let elem = {id}
		if(props.fields.length){
			props.fields.forEach(field => {
				elem[field] = field === 'title' ? 'Новый элемент' : ''
			});
		}
		newData.push(elem)
		props.changeData(newData)
	}

	const deleteRow = (e) => {
		let newData = JSON.parse(JSON.stringify(props.data))
		const newElems = newData.filter((element) => e.id !== element.id)
		props.changeData(newElems)
	}

	const changeField = (event, field, id) => {
		console.log(field)
		// TODO На каждый инпут перезаписывается глобальный объект и тормозит из-за этого
		let newData = JSON.parse(JSON.stringify(props.data))
		let elem = newData.find((element) => element.id === id)
		elem[field] = event.target.value
		
		props.changeData(newData)
	}


	return (
		
		<FormGroup className={classes.flex__inputs}>
			{props.data.map((element) => <Accordion fields={props.fields} key={element.id} element={element} deleteRow={deleteRow} changeField={changeField}  />)}
			<Button
				variant="contained"
				color="primary"
				onClick={addRow}
				className={`${classes.primary__button} ${classes.mt__20}`}
			>
				<span>Добавить элемент</span>
				<InsertDriveFileOutlinedIcon />
			</Button>
		</FormGroup>
	)
};

export default AccordionInput
