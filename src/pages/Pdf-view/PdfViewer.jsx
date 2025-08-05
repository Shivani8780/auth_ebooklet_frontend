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
        const response = await fetch(`${backendBaseUrl}/api/ebooklet/${ebookletId}/pdf/`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/pdf',
          },
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
