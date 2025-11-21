// PDFMainPO.jsx
import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { leads } from '../data/mockdata'; // Adjust path as per your folder structure

const PDFClientPO = ({ show, onHide, poData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfContentRef = useRef();

  if (!poData) return null;

  // === Step 1: Resolve officeBranch from leadId ===
  const lead = leads.find(l => l.leadId === poData.leadId);
  const officeBranch = lead?.Officebranch || 'Kolkata';

  // === Step 2: Header image mapping ===
  const getHeaderImagePath = (branch) => {
    const branchMap = {
      'Kolkata': '/extra/pdfpreviewKolkata.jpeg',
      'Delhi': '/extra/pdfpreviewDelhi.jpeg',
      'Indore': '/extra/pdfpreviewIndore.jpeg',
      'Nagpur': '/extra/pdfpreviewNagpur.jpeg',
      'Mumbai': '/extra/pdfpreviewMumbai.jpeg',
      'Hyderabad': '/extra/pdfpreviewHyderabad.jpeg',
      'Chennai': '/extra/pdfpreviewChennai.jpeg',
      'Bangalore': '/extra/pdfpreviewBangalore.jpeg',
      'Pune': '/extra/pdfpreviewPune.jpeg',
      'Ahmedabad': '/extra/pdfpreviewAhmedabad.jpeg',
    };
    return branchMap[branch] || branchMap['Kolkata'];
  };

  const headerImagePath = getHeaderImagePath(officeBranch);

  // === Step 3: Generate PDF ===
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = pdfContentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `PO_${poData.poNumber || poData.poId}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PO PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // === Helper: Format currency ===
  const formatINR = (num) => {
    return Number(num || 0).toLocaleString('en-IN');
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Order Preview - {poData.poNumber || poData.poId}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div
          ref={pdfContentRef}
          style={{
            padding: '0',
            backgroundColor: 'white',
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
            width: '210mm',
            margin: '0 auto',
          }}
        >
          {/* ===== DYNAMIC HEADER IMAGE ===== */}
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              marginBottom: '10px',
              border: '2px solid #000',
              overflow: 'hidden',
            }}
          >
            <img
              src={headerImagePath}
              alt={`Header for ${officeBranch}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* ===== MAIN PO CONTENT ===== */}
          <div style={{ border: '2px solid #000', margin: '10px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #000' }}>
              <h1 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>PURCHASE ORDER</h1>
            </div>

            {/* PO Number & Date */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 10px',
                borderBottom: '1px solid #000',
                fontSize: '11px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{poData.poNumber || poData.poId}</span>
              <span>Date - {poData.poDate ? new Date(poData.poDate).toLocaleDateString('en-IN') : 'N/A'}</span>
            </div>

            {/* Client Details */}
            <div style={{ padding: '6px 10px', borderBottom: '1px solid #000', fontSize: '11px' }}>
              <div style={{ marginBottom: '3px' }}>
                <strong>To,</strong>
              </div>
              <div style={{ marginBottom: '2px', fontWeight: 'bold' }}>
                {poData.companyName || poData.clientName || 'Client Name'}
              </div>
              <div style={{ marginBottom: '2px' }}>{poData.siteAddress || 'Site Address'}</div>
              <div style={{ marginBottom: '2px' }}>
                GST: {poData.gstNumber || 'Not Provided'}
              </div>
            </div>

            {/* Subject */}
            <div style={{ padding: '6px 10px', borderBottom: '1px solid #000', fontSize: '11px' }}>
              <strong>Subject: Purchase Order for {poData.projectName || 'Office Furniture'}</strong>
            </div>

            {/* Greeting */}
            <div style={{ padding: '6px 10px', borderBottom: '1px solid #000', fontSize: '11px' }}>
              <div style={{ marginBottom: '3px' }}>
                <strong>Dear Sir/Madam,</strong>
              </div>
              <div>We are pleased to issue this Purchase Order as per the agreed terms:</div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#4A90E2', color: 'white' }}>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '8%' }}>S.No</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '50%' }}>Description</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '8%' }}>Unit</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '10%' }}>Qty</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '12%' }}>Rate</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '12%' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {poData.items?.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{index + 1}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', fontSize: '9px', lineHeight: '1.3' }}>
                      <div style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {item.material || 'ITEM'}
                      </div>
                      <div>{item.description}</div>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{item.unit}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                      {formatINR(item.quantity)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'right' }}>
                      {formatINR(item.rate)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'right' }}>
                      {formatINR(item.total || item.quantity * item.rate)}
                    </td>
                  </tr>
                ))}
                {/* Additional service items (e.g., delivery) */}
                {poData.additionalDetails?.map((item, index) => (
                  <tr key={`add-${index}`}>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>*</td>
                    <td style={{ padding: '8px', border: '1px solid #000', fontSize: '9px' }}>
                      <strong>{item.description}</strong>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{item.unit}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                      {formatINR(item.quantity)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'right' }}>
                      {formatINR(item.rate)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'right' }}>
                      {formatINR(item.total || item.quantity * item.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '200px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold' }}>Total Amount</td>
                      <td style={{ padding: '6px', border: '1px solid #000', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatINR(poData.totalAmount)}
                      </td>
                    </tr>
                    {poData.gstApplicable && (
                      <>
                        <tr>
                          <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold' }}>GST @ {poData.gstPercentage || 18}%</td>
                          <td style={{ padding: '6px', border: '1px solid #000', textAlign: 'right' }}>
                            {formatINR(poData.gstAmount)}
                          </td>
                        </tr>
                        <tr style={{ backgroundColor: '#4A90E2', color: 'white' }}>
                          <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold' }}>Grand Total</td>
                          <td style={{ padding: '6px', border: '1px solid #000', textAlign: 'right', fontWeight: 'bold' }}>
                            {formatINR(poData.totalInvoiceAmount || poData.totalAmount)}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Terms */}
            <div style={{ padding: '8px 10px', borderTop: '1px solid #000', fontSize: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>Payment Terms:</div>
              <div>
                {poData.termsAndConditions?.paymentTerms?.description ||
                  `${poData.advancePaymentPercentage || 0}% advance, ${poData.balancePaymentPercentage || 0}% on delivery`}
              </div>
            </div>

            {/* Delivery Schedule */}
            <div style={{ padding: '8px 10px', borderTop: '1px solid #000', fontSize: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>Delivery Schedule:</div>
              <div>
                Expected Delivery: {poData.expectedDeliveryDate ? new Date(poData.expectedDeliveryDate).toLocaleDateString('en-IN') : 'TBD'}
              </div>
              <div>
                Location: {poData.siteAddress}
              </div>
            </div>

            {/* Footer inside main border */}
            <div style={{ padding: '6px 10px', borderTop: '1px solid #000', fontSize: '10px', textAlign: 'center' }}>
              <div>Thank you for your order. We look forward to a successful collaboration.</div>
            </div>
          </div>

          {/* ===== FOOTER BANNER (same as quotation) ===== */}
          <div
            style={{
              padding: '8px 15px',
              fontSize: '9px',
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            <img
              src="/extra/pdfpreviewFooter.jpeg"
              style={{ width: '775px', height: '75px' }}
              alt="Footer Banner"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PDFClientPO;