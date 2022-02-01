import React from 'react'
import classes from './Title.module.css'

const Title = ({ children, ...props }) => {
	return (
		<div className={classes.title}>
			{children}
		</div>
	)
}

export default Title