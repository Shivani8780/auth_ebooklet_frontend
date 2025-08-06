import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { backendBaseUrl } from '../../config/backend';

import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;

const PdfViewer = () => {
  const location = useLocation();
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // First try static PDF endpoint
        console.log('Trying static PDF endpoint...');
        const response = await fetch(`${backendBaseUrl}/api/ebooklet/${ebookletId}/pdf/`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            
            // Check if we got a static PDF URL
            if (data.pdf_url) {
              console.log('Got static PDF URL:', data.pdf_url);
              setPdfData(data.pdf_url);
              setLoading(false);
              return;
            } else if (data.error) {
              console.log('Static PDF error:', data.error);
              throw new Error(data.error);
            }
          }
        }
        
        // If static PDF fails, try dynamic PDF endpoint
        console.log('Static PDF failed, trying dynamic PDF endpoint...');
        const pdfResponse = await fetch(`${backendBaseUrl}/api/ebooklet/${ebookletId}/pdf-dynamic/`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/pdf',
          },
        });
        
        if (pdfResponse.ok) {
          const blob = await pdfResponse.blob();
          const url = URL.createObjectURL(blob);
          console.log('Got dynamic PDF blob URL');
          setPdfData(url);
          setLoading(false);
        } else {
          throw new Error(`Failed to load PDF: ${pdfResponse.status} ${pdfResponse.statusText}`);
        }
        
      } catch (err) {
        console.error('PDF loading error:', err);
        setError(`Failed to load PDF: ${err.message}`);
        setLoading(false);
      }
    };
    fetchPdf();
  }, [location.search]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const goPrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev < numPages ? prev + 1 : prev));
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
      <h1 className="text-3xl font-bold mb-4">PDF Viewer</h1>
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
      <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess} loading="" renderMode="svg">
        <Page pageNumber={currentPage} width={window.innerWidth * 0.6} scale={1.5} />
      </Document>
    </div>
  );
};

export default PdfViewer;
