import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useSetLocale } from 'react-admin';
// import { useLocale } from 'react-admin';
const LocaleSwitcher = () => {
  const langs = ["ru", "en", "es", "kk", "zh", "de", "it", "hi", "vi", "mn"]

  // const locale = useLocale();
  const locale = localStorage.getItem('locale')
  const setLocale = useSetLocale();

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    base: {
      color: 'white'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const changeLang = (event) => {
    console.log(event)
    console.log(locale)
    setLocale(event.target.value)
    localStorage.setItem('locale', event.target.value)
    window.location.reload()
  };
  // const setLocale = (locale)=>{localStorage.setItem('locale', locale);}
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.base} id="demo-simple-select-label">lang</InputLabel>
        <Select
          className={classes.base}
          labelId="language-select-label"
          id="language-select"
          value={locale}
          onChange={changeLang}
        >
          {langs.map((lang, i) => {
            return (<MenuItem key={i} value={lang}>{lang}</MenuItem>)
          })}

        </Select>
      </FormControl>
    </div>
  );
};

export default LocaleSwitcher;