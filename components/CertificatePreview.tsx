import React, { forwardRef } from 'react';
import { CertificateData } from '../types';

interface CertificatePreviewProps {
  data: CertificateData;
}

export const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(({ data }, ref) => {
    
    const formattedGregorianDate = data.date ? new Date(data.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }) : '';

    return (
        <div 
            ref={ref} 
            className="w-full h-full bg-white text-gray-800 relative font-serif overflow-hidden p-12 border-8 border-teal-700 flex flex-col items-center justify-between"
        >
            <div className="text-center">
                <h1 className="font-bold text-5xl tracking-wider text-teal-800">SYAHADAH</h1>
                <h2 className="text-3xl mt-2 text-gray-700">Tahfizh Al - Qur'an</h2>
                <div className="w-48 h-1 bg-teal-600 mx-auto mt-4"></div>
            </div>

            <div className="text-center my-8">
                <p className="text-xl">Diberikan kepada :</p>
                <p className="font-bold text-4xl mt-4" style={{ fontFamily: 'serif' }}>
                    {data.studentName}
                </p>
            </div>
            
            <div className="text-center text-lg leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                <p>Telah dinyatakan Lulus Ujian Syahadah Al-Qur'an Juz <span className="font-bold">{data.juz}</span></p>
                <p className="mt-1">
                    pada tanggal <span className="font-bold">{formattedGregorianDate}</span>
                </p>
                 <p>
                    dengan nilai <span className="font-bold">{data.grade}</span> dan predikat <span className="font-bold">{data.predicate}</span>
                </p>
            </div>

            <div className="w-full flex justify-around mt-16 pt-8 text-center text-lg" style={{ fontFamily: 'sans-serif' }}>
                <div>
                    <p className="font-bold">Mudir</p>
                    <p className="mt-20 border-t border-gray-400 px-8 pt-2">{data.mudirName}</p>
                </div>
                <div>
                    <p className="font-bold">Koordinator Tahfizh</p>
                    <p className="mt-20 border-t border-gray-400 px-8 pt-2">{data.coordinatorName}</p>
                </div>
            </div>
        </div>
    );
});
