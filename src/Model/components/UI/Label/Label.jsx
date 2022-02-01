import React from 'react'
import classes from './Label.module.css'

const Label = ({ children, ...props }) => {
	console.log(props)
	return (
		<label {...props} className={classes.label}>
			{children}
		</label>
	)
}

export default Label