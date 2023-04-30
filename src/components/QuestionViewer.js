import React, { useState } from 'react'
import './styles/QuestionViewer.css'

function QuestionViewer(props) {
  const link = props.pdfFile.split('?')[0].replace('view', 'preview')
  console.log("link", link)

  return (
    <iframe className='question-container' src={link} width="640" height="480" allow="autoplay"></iframe>
  )
}

export default QuestionViewer