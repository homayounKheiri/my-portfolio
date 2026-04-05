'use client';

import PrintPage from '@/components/PrintPage/PrintPage';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';

export default function Print() {
  /* -------------------------------------------------------------------------- */
  /*                                     Ref                                    */
  /* -------------------------------------------------------------------------- */

  const printRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------- */
  /*                                     Pdf                                    */
  /* -------------------------------------------------------------------------- */

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'HomayounKheiri-Portfolio',
    pageStyle: `
    @page { size: A4; margin: 5mm; }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `,
  });

  const downloadPDF = () => {};

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex flex-col items-center pt-20">
      <Button onClick={handlePrint}>click to download</Button>

      <PrintPage ref={printRef} />
    </div>
  );
}
