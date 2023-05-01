import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/RichTextEditor.css';
import ImageUploader from 'quill-image-uploader';

Quill.register('modules/imageUploader', ImageUploader);

const RichTextEditor = () => {
    const [text, setText] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            // [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
        ],

        

        // To my Backend developer, this is how Image should be uploaded
        // uncommenting this will result in error, without proper link I assume
        // imageUploader: {
        //     upload: (file) => {
        //         return new Promise((resolve, reject) => {
        //             const formData = new FormData();
        //             formData.append('image', file);

        //             // Replace the URL below with your own server URL that handles image uploads
        //             fetch('https://example.com/upload', {
        //                 method: 'POST',
        //                 body: formData
        //             })
        //                 .then(response => response.json())
        //                 .then(result => {
        //                     if (result.success) {
        //                         resolve(result.url);
        //                     } else {
        //                         reject(result.message);
        //                     }
        //                 })
        //                 .catch(error => {
        //                     reject(error.message);
        //                 });
        //         });
        //     }
        // },
    };

    return (

        <div>
        <div className="quill-container">
            <ReactQuill
                theme="snow"
                value={text}
                onChange={setText}
                modules={modules}
            />
        </div>


        <div dangerouslySetInnerHTML={{__html: text}}/>
            {text}
        
        </div>
    );
};

export default RichTextEditor;