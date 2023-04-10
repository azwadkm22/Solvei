import React, { useState } from 'react'
import {Document, Page} from "react-pdf/dist/esm/entry.webpack";
import pdfFile from './HowtoReadPaper.pdf';

function QuestionViewer() {
    
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentSuccess({numPages}) {
        setNumPages(numPages);
    }

    

  return (
    <div className=''>
        
        <Document file={pdfFile} onLoadSuccess={onDocumentSuccess}>
            <Page pageNumber={pageNumber}></Page>
        </Document>
    </div>
  )
}

export default QuestionViewer