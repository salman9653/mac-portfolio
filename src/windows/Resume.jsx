import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (numPages ? Math.min(prev + 1, numPages) : prev));
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />

        <h2>Resume.pdf</h2>

        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <div className="flex items-center justify-evenly bg-gray-200/50 shadow-md p-1 font-semibold">
        <ChevronLeft
          className="icon bg-gray-200 border border-gray-300 cursor-pointer"
          onClick={handlePreviousPage}
        />
        <p className="text-xs">
          Page {currentPage} of {numPages || "?"}
        </p>

        <ChevronRight
          className="icon bg-gray-200 border border-gray-300 cursor-pointer"
          onClick={handleNextPage}
        />
      </div>
      <Document
        file="files/resume.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page pageNumber={currentPage} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
