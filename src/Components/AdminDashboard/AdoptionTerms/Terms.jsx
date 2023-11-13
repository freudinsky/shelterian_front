import React from 'react'
import DOMPurify from 'dompurify';

function Terms({terms}) {
    const sanitizedTerms = DOMPurify.sanitize(terms)


  return <div className='terms' dangerouslySetInnerHTML={{ __html: sanitizedTerms }} />;
}

export default Terms