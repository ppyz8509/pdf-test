// PDFViewer.jsx

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from "../assets/sample.pdf"; // Replace with your PDF path
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  return (
    <div>
      <Document file={samplePDF}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
