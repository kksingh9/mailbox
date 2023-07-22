//import React, {Component} from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
//import { rende }
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = () => {
  const [userInfo, setuserInfo] = useState({
    title:"",
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
     [e.target.name]: e.target.value});
  };
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };
  const onSubmitHandler = async(event) => {
      event.preventDefault();
      try{
      
      const response = await  fetch("https://mail-box-43bb3-default-rtdb.firebaseio.com/mail.json",{
            method: "POST",
            body: JSON.stringify({
                email: userInfo.title,
                
                description: userInfo.description.value,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        console.log(data);
    }catch (err){
        console.log(err.message);
    }
    
  }

  return (
    <>
    <Container style={{margin: 'auto',maxWidth: "30rem", width:"90%"}} className="mt-3">
      <Card>
        <Form onSubmit={onSubmitHandler} style={{margin:"0 2rem"}}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="title"
            value={userInfo.title}
            onChange={onChangeValue}
          />

          <Form.Label>Description</Form.Label>
          <div style={{display:"flex !important" , }}>
          <Editor
            editorState={description}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            // toolbar={{
            //   inline: { inDropdown: true },
            //   list: { inDropdown: true },
            //   textAlign: { inDropdown: true },
            //   link: { inDropdown: true },
            //   history: { inDropdown: true },
            //   // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
            // }}
          />
          </div>
          {/* <FloatingLabel controlId="floatingTextarea2" label="Comments"> */}
        <textarea
          
        
          style={{ display:"none"}}
         disabled ref={(val) => userInfo.description = val}
          value={draftToHtml(convertToRaw(description.getCurrentContent())) }
        //   value={description}
        />
      {/* </FloatingLabel> */}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
      </Container>
    </>
  );
};

export default TextEditor;
