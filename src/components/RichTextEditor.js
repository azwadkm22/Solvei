import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/RichTextEditor.css';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);

const RichTextEditor = (props) => {
    const [text, setText] = useState('');
    console.log("text: ", text)
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            // [{ 'font': [] }],
            [{ 'align': [] }],
            // [{ 'color': [] }, { 'background': [] }],
            ['clean'],
        ]
    };

    const handleQuillInput = (e) => {
        setText(e)
        props.solutionTxtHandler(text)
    }

    return (

        <div>
        <div className="quill-container">
            <ReactQuill
                theme="snow"
                value={text}
                onChange={handleQuillInput}
                modules={modules}
            />
        </div>


        {/* <div dangerouslySetInnerHTML={{__html: text}}/> */}
            {/* {text} */}
            
        
        </div>
    );
};

export default RichTextEditor;