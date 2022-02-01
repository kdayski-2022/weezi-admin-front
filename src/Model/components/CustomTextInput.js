import React from 'react';
import { useInput } from 'ra-core';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomTextInput = (props) => {
  const app_apiurl = process.env.REACT_APP_APIURL || ''
  const uploadCallback = (file) =>{
    const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "file", 
        file
      ); 
     
      // Details of the uploaded file 
      // console.log(file); 
     
      // Request made to the backend api 
      // Send formData object 
      // return axios.post(app_apiurl + "/upload_image", formData)
    return new Promise(
      (resolve, reject) => {
      axios.post(app_apiurl + "/admin_panel/upload_image", formData).then(result=>{
        console.log(result)

        resolve({ data: { link: process.env.REACT_APP_IMAGEURL + '/' + result.data.link } });
      })
        
      }
    );
  }
  const toolbarOptions = {
      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
      
      image: {
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        uploadCallback: uploadCallback,
        previewImage: true,
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: { present: true, mandatory: false },
        defaultSize: {
          height: 'auto',
          width: 'auto',
        },
      },
    }
    const {
        classes: classesOverride,
        configureQuill,
        helperText,
        label,
        source,
        refSource,
        resource,
        variant,
        ...rest
    } = props;
    
    const {
        input: { value, onChange }
    } = useInput({ source, ...rest });

     const contentBlock = htmlToDraft(value);
     let editorStateHtml
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      editorStateHtml = EditorState.createWithContent(contentState);
    }
    const [editorState, setEditorState] = React.useState(editorStateHtml)
    const onEditorStateChange = (editorState) => {
      setEditorState(editorState);
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };
    return (
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          toolbar={toolbarOptions}
          localization={{
            locale: 'ru',
          }}
        />
    );
};

export default CustomTextInput;
