import React, { forwardRef } from 'react';
import { CertificateData } from '../types';

interface CertificatePreviewProps {
  data: CertificateData;
}

// NOTE: Please create an 'assets' folder in your project's root directory
// and place your certificate template image inside it.
// The image should be named 'certificate_template.png' for this component to work correctly.
const certificateTemplateUrl = './assets/certificate_template.png';

export const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(({ data }, ref) => {
    
    const formattedGregorianDate = data.date ? new Date(data.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }) : '';

    return (
        <div 
            ref={ref} 
            className="w-full h-full bg-white text-black relative font-serif overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${certificateTemplateUrl})` }}
        >
            {/* This component uses a background image as the template. */}
            {/* All text elements are absolutely positioned on top of it. */}
            
            <div className="absolute inset-0">
                {/* Student Name */}
                <p className="absolute text-center w-full font-bold text-4xl" style={{ top: '40%', left: '40.5%', transform: 'translateX(-50%)', color: '#3a3a3a', fontFamily: 'serif' }}>
                    {data.studentName}
                </p>

                {/* Main Declaration Text */}
                <div className="absolute text-center text-lg leading-tight" style={{ top: '52.5%', left: '40.5%', transform: 'translateX(-50%)', width: '65%', fontFamily: 'sans-serif', color: '#3a3a3a' }}>
                    <p>Telah dinyatakan Lulus Ujian Syahadah Al-Qur'an Juz {data.juz}</p>
                    <p className="mt-1">
                        pada tanggal, <span className="font-bold">{formattedGregorianDate}</span>
                    </p>
                     <p>
                        dengan nilai : <span className="font-bold inline-block w-24 text-center">{data.grade}</span> dan predikat <span className="font-bold inline-block w-32 text-center">{data.predicate}</span>
                    </p>
                </div>
                
                {/* JUZ in Seal */}
                 <div className="absolute text-center" style={{ top: '58.5%', left: '80.5%', transform: 'translate(-50%, -50%)' }}>
                    <span className="text-yellow-900 font-bold text-3xl">{data.juz}</span>
                </div>

                {/* Signatures */}
                <div className="absolute text-white font-bold text-center" style={{ bottom: '11.8%', left: '16.5%', width: '15%', fontFamily: 'sans-serif', fontSize: '1.1rem' }}>
                    {data.mudirName}
                </div>
                <div className="absolute text-white font-bold text-center" style={{ bottom: '11.8%', left: '61.5%', width: '15%', fontFamily: 'sans-serif', fontSize: '1.1rem' }}>
                    {data.coordinatorName}
                </div>
            </div>
        </div>
    );
});
