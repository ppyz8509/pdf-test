// PDFForm.jsx

import React, { useState } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";

const samplePDF = "/sample.pdf";

const PDFForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Load your existing PDF
    const existingPdfBytes = await fetch(samplePDF).then((res) =>
      res.arrayBuffer()
    );

    // Load the PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page of the document
    const page = pdfDoc.getPages()[0];

    // Get the font and font size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 500;

    // Draw the text fields onto the PDF
    page.drawText(formData.name, {
      x: 50,
      y: 500,
      size: fontSize,
      font: font,
    });

    page.drawText(formData.email, {
      x: 50,
      y: 475,
      size: fontSize,
      font: font,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the bytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "filled-form.pdf";
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      {/* Add more input fields for other form data */}

      <button type="submit">Download PDF</button>
    </form>
  );
};

export default PDFForm;
