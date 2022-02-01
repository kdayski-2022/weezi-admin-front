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
import classes from './Components.module.css'

const AccordionRow = ({ element, ...props }) => {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>{element.title}</Typography>
			</AccordionSummary>
			<AccordionDetails className={classes.flex__column}>
				{props.fields.map((field, index) => 
				(<FormGroup row className={`${classes.flex__inputs} ${classes.align__center} ${classes.pt__40}`}>
					<TextField
						label={field}
						variant="filled"
						fullWidth
						placeholder={field}
						value={element[field]}
						className={classes.question_title__input}
						onChange={(event) => props.changeField(event, field, element.id)}
					/>
					{index === 0 && <Button variant="contained" className={classes.delete__btn} onClick={() => props.deleteRow(element)}>
						<DeleteOutlinedIcon style={{ color: 'white' }} />
					</Button>}
					
				</FormGroup>))}

			</AccordionDetails>
		</Accordion>
	)
};

export default AccordionRow
