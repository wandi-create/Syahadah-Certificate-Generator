
import React, { useRef, useState } from 'react';
import { CertificateData } from '../types';
import { CertificatePreview } from '.@/assets/Syahadah_template_ikhwan.jpg';

interface CertificateViewerProps {
    data: CertificateData;
    onBack: () => void;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ data, onBack }) => {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGeneratePdf = async () => {
        if (!certificateRef.current) return;
        setIsGenerating(true);
        // FIX: Cast window to `any` to access globally-loaded libraries `jspdf` and `html2canvas`
        // without TypeScript errors. This resolves the "expression is not callable" error by
        // ensuring the libraries are treated as `any`, following the pattern used elsewhere in the app.
        const { jsPDF } = (window as any).jspdf;
        const html2canvas = (window as any).html2canvas;

        try {
            const canvas = await html2canvas(certificateRef.current, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height],
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Syahadah - ${data.studentName}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Gagal membuat PDF. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800" style={{fontFamily: 'serif'}}>Pratinjau Syahadah</h1>
                    <p className="text-gray-500 mt-1">Sertifikat untuk: <span className="font-semibold">{data.studentName}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={onBack}
                        className="w-full sm:w-auto bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
                    >
                        Kembali
                    </button>
                    <button
                        onClick={handleGeneratePdf}
                        disabled={isGenerating}
                        className="w-full sm:w-auto bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Membuat PDF...
                            </>
                        ) : (
                            'Download PDF'
                        )}
                    </button>
                </div>
            </div>
            
            <div className="aspect-[297/210] max-w-5xl mx-auto shadow-2xl rounded-lg overflow-hidden border border-gray-200">
                <CertificatePreview ref={certificateRef} data={data} />
            </div>
        </div>
    );
};

export default CertificateViewer;
