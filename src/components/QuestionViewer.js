import React, { useState } from 'react'
import {Document, Page} from "react-pdf/dist/esm/entry.webpack";
import pdfFile from './HowtoReadPaper.pdf';
import './styles/QuestionViewer.css'

function QuestionViewer() {
    
    const [numPages, setNumPages] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentSuccess({numPages}) {
        setNumPages(numPages);
    }

  function onNextClickHandler({ pageNumber }) {
      setPageNumber(pageNumber + 1);
    }

  function onPrevClickHandler({ pageNumber }) {
      setPageNumber(pageNumber - 1);
  }



  return (
    <div className='question-container'>
      <Document file={pdfFile} onLoadSuccess={onDocumentSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}></Page>
      </Document>
      <button onClick={onNextClickHandler}>Next Page</button>
      <button onClick={onPrevClickHandler}>Prev Page</button>
    </div>
  )
}

export default QuestionViewer