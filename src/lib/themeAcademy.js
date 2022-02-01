import { createMuiTheme } from '@material-ui/core'
const theme = createMuiTheme({
	typography: {
		"fontFamily": `"Exo 2"`,
	},
	palette: {
		primary: {
			main: '#000000'
		}
	},
	overrides: {
		MuiButton: {
			label: {
				alignItems: 'center'
			}
		},
		MuiAccordion: {
			root: {
				border: 'none',
				boxShadow: 'none'
			}
		},
		MuiAccordionSummary: {
			content: {
				margin: '10px !important',
			},
			expanded: {
				margin: '10px !important',
			},
			root: {
				border: '1px solid #b1b1b1',
				boxSizing: 'border-box',
				borderRadius: '0',
				background: '#EEEEEE',
				minHeight: '48px !important',
				padding: '0',
			}
		},
		MuiAccordionDetails: {
			root: {
				padding: '0',
			}
		},
		MuiTextField: {
			root: {
				backgroundColor: '#ffffff',
			}
		},
		MuiSelect: {
			root: {
				backgroundColor: '#EFEFEF',

			},
			select: {
				border: '1px solid #2D0F19',
				borderRadius: '3px'
			},
			icon: {
				top: 'calc(50%)'
			}
		},
		MuiToolbar: {
			regular: {
				display: 'block !important'
			}
		},
		MuiTablePagination: {
			toolbar: {
				display: 'flex !important'
			},
			selectIcon: {
				top: 'calc(12%)'
			}
		},
		MuiFilledInput: {
			root: {
				'&:hover': {
					backgroundColor: '#ffffff',
				},
				'&$focused': {
					backgroundColor: '#ffffff',
				},
				backgroundColor: '#ffffff',

			},
			inputMarginDense: {
				backgroundColor: '#EFEFEF',
				marginTop: '25px!important',
				padding: '9px!important',
				border: '1px solid #2D0F19',
				borderRadius: '3px'
			}
		},
		RaReferenceField:{
			link:{
				textDecoration : 'underline!important',
			}

		}
	},
	props: {
		MuiTextField: {
			InputLabelProps: {
				shrink: true,
			},
			InputProps: {
				disableUnderline: true
			}
		},
		MuiSelect: {
			InputLabelProps: {
				shrink: true,
			},
			InputProps: {
				disableUnderline: true
			}
		},
	}
})

export default theme