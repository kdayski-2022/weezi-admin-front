// in src/Foo.js
import React,{Component} from 'react'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_APIURL || ''
class App extends Component { 

    state = { 
      selectedFile: null
    }; 
     
    onFileChange = event => { 
      this.setState({ selectedFile: event.target.files[0] }); 
    }; 
     
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
    fileData = () => { 
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>Информация о файле:</h2> 
            <p>Имя файла: {this.state.selectedFile.name}</p> 
            <p>Тип файла: {this.state.selectedFile.type}</p> 
            <p> 
              Последнее изменение:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            
          </div> 
        ); 
      } 
    }; 
     
    render() { 
      return ( 
        <Card> 
            <h1> 
            Импорт информации о покупках
            </h1> 
            
            <CardContent> 
                <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Загрузить 
                </button> 
            </CardContent> 
          {this.fileData()} 
        </Card> 
      ); 
    } 
  } 
  
  export default App; 