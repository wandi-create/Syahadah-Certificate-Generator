import React, { forwardRef } from 'react';
import { CertificateData } from '../types';
// FIX: The original assets `Syahadah_template_ikhwan.png` and `Syahadah_template_akhwat.png`
// were being resolved to empty `.tsx` files, which are not valid modules. This caused an import error.
// The imports are removed and replaced with placeholder data URLs to fix the crash.
// import ikhwanTemplate from '../assets/Syahadah_template_ikhwan.png';
// import akhwatTemplate from '../assets/Syahadah_template_akhwat.png';
const ikhwanTemplate = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const akhwatTemplate = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

interface CertificatePreviewProps {
  data: CertificateData;
}

export const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(({ data }, ref) => {
    
    const formattedGregorianDate = data.date ? new Date(data.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }) : '';

    const templateSrc = data.gender === 'Ikhwan' ? ikhwanTemplate : akhwatTemplate;

    return (
        <div 
            ref={ref} 
            className="w-full h-full bg-white text-gray-800 relative font-serif overflow-hidden"
            style={{ color: '#3A3A3A' }} // Default text color for overlay
        >
            {/* Background Template Image */}
            <img src={templateSrc} alt="Certificate Template" className="absolute top-0 left-0 w-full h-full object-cover" />

            {/* Overlay Container for Text */}
            <div className="absolute top-0 left-0 w-full h-full">
                
                {/* Student Name */}
                <div className="absolute w-full text-center" style={{ top: '44%', left: '50%', transform: 'translateX(-50%)' }}>
                    <p className="font-bold" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '2.5rem' }}>
                        {data.studentName || "Nama Siswa"}
                    </p>
                </div>
                
                {/* Combined Details Block */}
                <div className="absolute w-full text-center" style={{ top: '55%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'sans-serif', fontSize: '1.2rem', lineHeight: '1.8' }}>
                    <p>
                        Telah dinyatakan Lulus Ujian Syahadah Al-Qur'an Juz <span className="font-bold">{data.juz || 'XX'}</span>
                    </p>
                    <p>
                        pada tanggal <span className="font-bold">{data.hijriDate || '...'}</span> / <span className="font-bold">{formattedGregorianDate || '...'}</span>
                    </p>
                    <p>
                        dengan nilai : <span className="font-bold">{data.grade}</span> dan predikat <span className="font-bold">{data.predicate}</span>
                    </p>
                </div>


                {/* Signatures */}
                <div className="absolute text-center" style={{ bottom: '10.5%', left: '21%', transform: 'translateX(-50%)', fontFamily: 'sans-serif', fontSize: '1.1rem' }}>
                    <p>{data.mudirName}</p>
                </div>
                <div className="absolute text-center" style={{ bottom: '10.5%', right: '12%', transform: 'translateX(0%)', fontFamily: 'sans-serif', fontSize: '1.1rem' }}>
                    <p>{data.coordinatorName}</p>
                </div>

            </div>
        </div>
    );
});
