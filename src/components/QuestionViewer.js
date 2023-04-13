import React, { useState } from 'react'
import {Document, Page} from "react-pdf/dist/esm/entry.webpack";
import pdfFile from './HowtoReadPaper.pdf';
import './styles/QuestionViewer.css'

function QuestionViewer() {
    
    const [numPages, setNumPages] = useState(3);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentSuccess({numPages}) {
        setNumPages(numPages);
        // console.log("number of pages"+ numPages);
        // console.log("page num: "+ pageNumber);
    }

  function onNextClickHandler() {
      if(pageNumber + 1 <= numPages)
        setPageNumber( (pageNumber + 1) );
      console.log("page num: "+ pageNumber);
    }

  function onPrevClickHandler() {
    if(pageNumber - 1 > 0)
      setPageNumber(pageNumber - 1);
    console.log("page num: "+ pageNumber);
  }



  return (
    // <div className='question-container'>
    //   <Document file={pdfFile} onLoadSuccess={onDocumentSuccess}>
    //       <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}></Page>
    //   </Document>
    //   <button onClick={onPrevClickHandler}>Prev Page</button>
    //   <button onClick={onNextClickHandler}>Next Page</button>
      
    // </div>
    <iframe className='question-container' src="https://drive.google.com/file/d/1WRQZT11QwwUJIskuUczZpWsNPEqLIysA/preview" width="640" height="480" allow="autoplay"></iframe>
  )
}

export default QuestionViewer