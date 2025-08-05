 import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
// Removed problematic CSS import for react-pdf annotation layer
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set workerSrc to local file to avoid CORS issues and version mismatch
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfViewerWithFlip = () => {
  const location = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const flipBook = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Helper to get query params
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  useEffect(() => {
    const fetchPdf = async () => {
      const ebookletId = getQueryParam('ebookletId');
      if (!ebookletId) {
        setError('No ebooklet specified.');
        setLoading(false);
        return;
      }
      try {
// const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const isDevelopment = import.meta.env.MODE === 'development';
const backendBaseUrl = isDevelopment ? import.meta.env.VITE_BACKEND_URL: import.meta.env.VITE_API_BASE_URL_DEPLOY

        const response = await fetch(`${backendBaseUrl}/api/ebooklet/${ebookletId}/pdf/`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to load PDF');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfData(url);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPdf();
  }, [location.search]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onFlip = (e) => {
    const pageNumber = e.data + 1; // zero-based index
    setCurrentPage(pageNumber);
  };

  const goPrev = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  };

  const goNext = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  if (loading) {
    return <div>Loading PDF...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pdfData) {
    return <div>No PDF available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">PDF Viewer with Flip</h1>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          &larr; Prev
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === numPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Next &rarr;
        </button>
      </div>
      <HTMLFlipBook
        width={600}
        height={800}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        maxShadowOpacity={0.5}
        showCover={false}
        mobileScrollSupport={true}
        ref={flipBook}
        onFlip={onFlip}
        startPage={currentPage - 1}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={index + 1} className="page" style={{ width: '100%', height: '100%' }}>
            <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess} loading="">
              <Page pageNumber={index + 1} width={600} />
            </Document>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default PdfViewerWithFlip;
