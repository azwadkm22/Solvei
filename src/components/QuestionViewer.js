import React, { useState } from 'react'
import {Document, Page} from "react-pdf/dist/esm/entry.webpack";
import pdfFile from './HowtoReadPaper.pdf';
import './styles/QuestionViewer.css'

function QuestionViewer() {
    
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(2);

    function onDocumentSuccess({numPages}) {
        setNumPages(numPages);
    }

  return (
    <div className='question-container'>
        <Document file={pdfFile} onLoadSuccess={onDocumentSuccess}>
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}></Page>
        </Document>
    </div>
  )
}

export default QuestionViewer