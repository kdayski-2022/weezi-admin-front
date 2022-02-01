import * as React from 'react';
import { useSetLocale, TopToolbar, CreateButton, ExportButton, Button } from 'react-admin';
import classes from '../Model/components/Components.module.css'
const CustomListActions = (props) => {
	const langs = ["ru", "en", "es", "kk", "zh", "de", "it", "hi", "vi", "mn"]
	const createButton = props.create ? props.create : true
	const setLocale = useSetLocale();
	const changeLang = (lang) => {
		setLocale(lang)
		localStorage.setItem('locale', lang)
		window.location.reload()
	};
	return (
		<TopToolbar className={classes.display__block}>
			<div className={classes.flex__between}>
				<div>
					{
						langs.map((lang) => (
							<Button
								className={`${classes.label_no_padding} ${localStorage.getItem('locale') === lang ? classes.active__btn : ''}`}
								onClick={() => changeLang(lang)}
								label={lang}
							>
							</Button>
						))
					}
				</div>
				<div>
					{createButton ? <CreateButton />:''}
					<ExportButton />
				</div>
			</div>
		</TopToolbar>
	);
};

export default CustomListActions;