  // Debug logs for received query params and PDF path
  console.log('PdfViewer loaded with params:', {
    viewOption,
    pdfFilename,
    pdfFile
  });
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// The worker is needed to render PDFs. You can host it yourself or use a CDN.
// Using a CDN is often the easiest way to get started.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PdfViewer() {
  // Responsive width for PDF page
  const getPageWidth = () => {
    if (typeof window !== 'undefined') {
      return Math.min(window.innerWidth * 0.9, 600); // 90vw, max 600px
    }
    return 600;
  };
  const [numPages, setNumPages] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get query params (e.g., ?ebookletId=123&view_option=full)
  const params = new URLSearchParams(location.search);
  const viewOption = params.get('view_option');
  const pdfFilename = params.get('pdf_filename') || 'B1_Boys.pdf';

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  // The PDF file is served from Django static files: backend/static/pdf/{pdfFilename}
  const pdfFile = `/static/pdf/${pdfFilename}`;

  // Access control logic
  if (viewOption !== 'full' && viewOption !== 'preview') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this PDF.</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>Go Back</button>
      </div>
    );
  }

  return (
    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from({ length: numPages }, (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          width={getPageWidth()}
        />
      ))}
    </Document>
  );
}

export default PdfViewer;