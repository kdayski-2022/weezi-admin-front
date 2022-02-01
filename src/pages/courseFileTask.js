// in src/Foo.js
import React,{Component} from 'react'
import Card from '@material-ui/core/Card'
import axios from 'axios'
import {
	FormGroup,
  Button,
  TextField,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
  ButtonGroup
} from '@material-ui/core'
import classes from '../Model/components/Components.module.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import styled from 'styled-components'
import { formatDate, getHours } from '../lib/lib'


const serverUrl = process.env.REACT_APP_APIURL || ''
const fileUrl = process.env.REACT_APP_IMAGEURL || ''

const CommentWrapper = styled.div`
    padding-top: 20px;
`

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    .from {
        font-weight: 600;
        color: #2D0F19;
    }
    .date {
        color: #7E7E7E;
    }
`

const Comment = styled.div`
    padding-top: 10px;
    color: #7E7E7E;
`

const Attachments = styled.div`
    display: flex;
    padding-top: 10px;
`

const File = styled.div`
    display: flex;
    align-items: center;
    padding-right: 10px;
    span {
        padding-left: 4px;
    }
    &:hover {
        cursor: pointer;
    }
`
class App extends Component { 

    state = { 
      selectedFile: null,
      page: 1,
      rows:[],
      rowComments:[],
      token: localStorage.getItem('token')
    }; 
    
    onFileChange = event => { 
      this.setState({ selectedFile: event.target.files[0] }); 
    }; 
    componentDidMount = ()=>{
      console.log(this.state.token)
      this.getData()
    }
    getData = ()=>{
      axios.get(`${serverUrl}/admin_panel/course_task_file`).then((res)=>{
        this.setState({rows: res.data.rows})
      }) 
    }

    onFileUpload = () => { 
      const formData = new FormData(); 
      formData.append( 
        "file", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
     
      console.log(this.state.selectedFile); 
     
      axios.post(`${serverUrl}/admin_panel/import_catalog_user`, formData); 
    }
    changeTextField = (event,id) => {
      let rowComments = this.state.rowComments
      rowComments[id] = event.target.value
      this.setState({rowComments})
    }
    sendComment = (id,type) => {
      axios.post(`${serverUrl}/admin_panel/course_task_file`,
      {
        comment: this.state.rowComments[id],
        taskFileId: id,
        status: type
      }, {
        headers: { "A-Auth-Token": this.state.token },
      }).then((res)=>{
          this.getData()
        }) 
      }
     
    render() { 
      return ( 
        <Card> 
            <h2>Проверка заданий</h2> 
            {this.state.rows.length ? this.state.rows.map((row, index) => 
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <HourglassEmptyIcon color="primary"/> 
                <Typography>{row.courseName} UserId: {row.userId} </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.flex__column}>
              {
                row.comments ?
                    row.comments.map(({ id, from, createdAt, comment, files }) => (
                      <CommentWrapper>
                          <Head>
                              {
                                  from === 'user' ?
                                      <span className='md-font-size from'>Пользователь</span> :
                                      <span className='md-font-size from'>Преподаватель</span>
                              }
                              <span className='md-font-size date'>{`${formatDate(createdAt)} ${getHours(createdAt)}`}</span>
                          </Head>
                          <Comment className='md-font-size'>
                              {comment}
                          </Comment>
                          <Attachments>
                              {
                                  files ?
                                      files.map((file, index) => (
                                          <File
                                              key={`file-${index}`}
                                              onClick={() => window.open(`${fileUrl}/${file}`, "_blank")}
                                          >
                                              <AttachFileIcon size={16} />
                                              <span className='sm-font-size'>Файл задания</span>
                                          </File>
                                      )) : ''
                              }
                          </Attachments>
                      </CommentWrapper >
                    )) : ''
                }
              <h3>Оставить комментарий</h3> 
                <FormGroup row className={`${classes.flex__inputs} ${classes.align__center} ${classes.pt__40}`}>
                <TextField
                  
                  variant="filled"
                  fullWidth
                  className={classes.question_title__input}
                  onChange={(event) => this.changeTextField(event, row.id)}
                />       
                
                </FormGroup>
                <ButtonGroup>
                <Button
                  variant="contained"
                  color="danger"
                  onClick={()=> this.sendComment(row.id,-1)}
                  >
                  Отклонить
                </Button>{' '}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={()=> this.sendComment(row.id,0)}
                  >
                  Ожидание
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=> this.sendComment(row.id,1)}
                  >
                  Принять
                </Button>
                </ButtonGroup>
              </AccordionDetails>
              
            </Accordion>):'Нет ответов на задания'}

            
        </Card> 
      ); 
    } 
  } 
  
  export default App; 