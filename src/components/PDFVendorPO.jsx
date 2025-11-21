import React, { useState, useRef } from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFVendorPO = ({ show, onHide, vendorPODataArray }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // For multiple POs
  const pdfContentRef = useRef();

  if (!vendorPODataArray || vendorPODataArray.length === 0) return null;

  const currentPO = vendorPODataArray[activeTab];

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

  const headerImagePath = getHeaderImagePath('Kolkata'); // Default branch

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

      const fileName = `VendorPO_${currentPO.vendorPoId}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating Vendor PO PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatINR = (num) => {
    return Number(num || 0).toLocaleString('en-IN');
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Vendor PO Preview - {currentPO.vendorPoId}
          {vendorPODataArray.length > 1 && (
            <span style={{ fontSize: '0.85rem', marginLeft: '10px', color: '#666' }}>
              ({activeTab + 1} of {vendorPODataArray.length})
            </span>
          )}
        </Modal.Title>
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
              alt="Header"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* ===== MAIN VENDOR PO CONTENT ===== */}
          <div style={{ border: '2px solid #000', margin: '10px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #000' }}>
              <h1 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                PURCHASE ORDER (VENDOR)
              </h1>
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
              <span style={{ fontWeight: 'bold' }}>{currentPO.vendorPoId}</span>
              <span>
                Date - {currentPO.poDate ? new Date(currentPO.poDate).toLocaleDateString('en-IN') : 'N/A'}
              </span>
            </div>

            {/* Work Order Reference */}
            <div style={{ padding: '6px 10px', borderBottom: '1px solid #000', fontSize: '11px', backgroundColor: '#f9f9f9' }}>
              <div style={{ marginBottom: '2px' }}>
                <strong>Work Order Reference:</strong> {currentPO.workOrderId}
              </div>
              <div style={{ marginBottom: '2px' }}>
                <strong>Client PO:</strong> {currentPO.clientPoId}
              </div>
            </div>

            {/* Vendor Details */}
            <div style={{ padding: '6px 10px', borderBottom: '1px solid #000', fontSize: '11px' }}>
              <div style={{ marginBottom: '3px' }}>
                <strong>To,</strong>
              </div>
              <div style={{ marginBottom: '2px', fontWeight: 'bold' }}>
                {currentPO.vendorName || 'Vendor Name'}
              </div>
              <div style={{ marginBottom: '2px' }}>{currentPO.vendorAddress || 'Vendor Address'}</div>
              <div style={{ marginBottom: '2px' }}>
                GST: {currentPO.vendorGST || 'Not Provided'}
              </div>
              {currentPO.vendorContactPerson && (
                <div style={{ marginBottom: '2px' }}>
                  {/* Contact: {currentPO.vendorContactPerson} - {currentPO.vendorContactMobile} */}
                </div>
              )}
                <div className='mt-2'>
              <strong>Dear sir,</strong> <br/>
               <strong>We are pleased to place the order only </strong>
            </div>

            </div>

          
            {/* Delivery Info */}
            {/* <div style={{ padding: '6px 10px', borderBottom: '1px solid #000', fontSize: '11px' }}>
              <div><strong>Delivery No:</strong> {currentPO.deliveryNumber || 'N/A'}</div>
              <div><strong>Dispatch Date:</strong> {currentPO.dispatchDate ? new Date(currentPO.dispatchDate).toLocaleDateString('en-IN') : 'TBD'}</div>
              <div><strong>Expected Delivery:</strong> {currentPO.expectedDeliveryDate ? new Date(currentPO.expectedDeliveryDate).toLocaleDateString('en-IN') : 'TBD'}</div>
              <div><strong>Delivery Method:</strong> {currentPO.deliveryMethod || 'Not Specified'}</div>
            </div> */}

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#4A90E2', color: 'white' }}>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '8%' }}>S.No</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '40%' }}>Description</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '10%' }}>Unit</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '10%' }}>Qty</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '12%' }}>Rate</th>
                  <th style={{ padding: '6px', border: '1px solid #000', textAlign: 'center', width: '15%' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentPO.items?.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{index + 1}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', fontSize: '9px', lineHeight: '1.3' }}>
                      <div style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {item.material || 'MATERIAL'}
                      </div>
                      <div>{item.description}</div>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{item.unit}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                      {formatINR(item.poOrderQty || item.quantity)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'right' }}>
                      {formatINR(item.rate)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'right' }}>
                      {formatINR(item.amount || (item.poOrderQty || item.quantity) * item.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '250px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold' }}>Basic Amount</td>
                      <td style={{ padding: '6px', border: '1px solid #000', textAlign: 'right', fontWeight: 'bold' }}>
                        ₹{formatINR(currentPO.basicAmount)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold' }}>
                        GST @ {currentPO.gstPercentage || 18}%
                      </td>
                      <td style={{ padding: '6px', border: '1px solid #000', textAlign: 'right' }}>
                        ₹{formatINR(currentPO.gst)}
                      </td>
                    </tr>
                    {currentPO.tds > 0 && (
                      <tr>
                        <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold' }}>TDS</td>
                        <td style={{ padding: '6px', border: '1px solid #000', textAlign: 'right' }}>
                          -₹{formatINR(currentPO.tds)}
                        </td>
                      </tr>
                    )}
                    <tr style={{ backgroundColor: '#4A90E2', color: 'white' }}>
                      <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold' }}>Grand Total</td>
                      <td style={{ padding: '6px', border: '1px solid #000', textAlign: 'right', fontWeight: 'bold' }}>
                        ₹{formatINR(currentPO.grandTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
           <div style={{ padding: '8px 10px', borderTop: '1px solid #000', fontSize: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>Billing Adress</div>
              <div>{currentPO.billingAddress}</div>
            </div>

            {/* Payment Terms */}
            <div style={{ padding: '8px 10px', borderTop: '1px solid #000', fontSize: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>Payment Terms:</div>
              <div>{currentPO.paymentTerms || 'As per agreement'}</div>
            </div>

            {/* Terms & Conditions */}
            <div style={{ padding: '8px 10px', borderTop: '1px solid #000', fontSize: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>Terms & Conditions:</div>
              <div>{currentPO.terms || 'Standard terms apply.'}</div>
            </div>

            {/* Footer inside main border */}
            <div style={{ padding: '6px 10px', borderTop: '1px solid #000', fontSize: '10px', display:"flex", justifyContent:"space-between"}}>
             <span><strong>Signature :</strong>
             <span style={{ borderBottom: '1px solid #000', width: '100px', display: 'inline-block', marginLeft: '5px' }}></span></span>

             <span><strong>NLF Solutions PVT LTD</strong></span>
             
            </div>
          </div>

          {/* ===== FOOTER BANNER ===== */}
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
        {/* Navigation for multiple POs */}
        
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button className='add-customer-btn' onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PDFVendorPO;