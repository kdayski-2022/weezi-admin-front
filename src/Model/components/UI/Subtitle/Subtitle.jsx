import React from 'react'
import classes from './Subtitle.module.css'

const Subtitle = ({ children, ...props }) => {
	return (
		<div className={classes.subtitle}>
			{children}
		</div>
	)
}

export default Subtitle