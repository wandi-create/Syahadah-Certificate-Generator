
import React from 'react';
import { CertificateData } from '../types';

interface CertificateFormProps {
  data: CertificateData;
  setData: React.Dispatch<React.SetStateAction<CertificateData>>;
  onGeneratePdf: () => void;
  isGenerating: boolean;
  onSave: () => void;
  onNew: () => void;
}

const InputField: React.FC<{
    id: keyof CertificateData | 'hijriDate';
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    readOnly?: boolean;
}> = ({ id, label, value, onChange, type = 'text', readOnly = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm read-only:bg-gray-100 read-only:cursor-not-allowed"
        />
    </div>
);

const getPredicate = (grade: number): string => {
    if (isNaN(grade) || grade < 0 || grade > 100) return '';
    if (grade === 100) return "Mumtaz Murtafi'";
    if (grade >= 90) return "Mumtaz";
    if (grade >= 80) return "Jayyid Jiddan";
    if (grade >= 70) return "Jayyid";
    if (grade >= 60) return "Maqbul";
    return "Rasib";
};


export const CertificateForm: React.FC<CertificateFormProps> = ({ data, setData, onGeneratePdf, isGenerating, onSave, onNew }) => {
  // @ts-ignore
  const HijriDate = window.HijriDate;
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'grade') {
        const gradeValue = value === '' ? NaN : parseInt(value, 10);
        const predicate = getPredicate(gradeValue);
        setData(prevData => ({
            ...prevData,
            grade: value,
            predicate: predicate,
        }));
    } else if (name === 'date') {
        const gregorianDate = new Date(value);
        const hijriDateString = HijriDate && !isNaN(gregorianDate.getTime())
            ? new HijriDate(gregorianDate).toHijriString('iDD iMMMM iYYYY')
            : '';

        setData(prevData => ({
            ...prevData,
            date: value,
            hijriDate: hijriDateString,
        }));
    }
    else {
        setData(prevData => ({
          ...prevData,
          [name]: value,
        }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Syahadah Generator</h2>
      <div className="space-y-4">
        <InputField id="studentName" label="Nama Siswa/i" value={data.studentName} onChange={handleChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField id="date" label="Tanggal Masehi" value={data.date} onChange={handleChange} type="date" />
            <InputField id="hijriDate" label="Tanggal Hijriah" value={data.hijriDate} onChange={() => {}} readOnly={true} />
        </div>
        <InputField id="juz" label="Juz" value={data.juz} onChange={handleChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField id="grade" label="Nilai" value={data.grade} onChange={handleChange} type="number" />
            <InputField id="predicate" label="Predikat" value={data.predicate} onChange={handleChange} readOnly={true} />
        </div>
        <InputField id="mudirName" label="Nama Mudir" value={data.mudirName} onChange={handleChange} />
        <InputField id="coordinatorName" label="Nama Koordinator Tahfizh" value={data.coordinatorName} onChange={handleChange} />
        
        <div className="flex flex-col space-y-3 pt-4">
            <div className="flex space-x-3">
                <button
                    onClick={onSave}
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                    {data.id ? 'Update Saved' : 'Save Certificate'}
                </button>
                 <button
                    onClick={onNew}
                    className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
                >
                    New Certificate
                </button>
            </div>
            <button
              onClick={onGeneratePdf}
              disabled={isGenerating}
              className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                </>
              ) : (
                'Download PDF'
              )}
            </button>
        </div>
      </div>
    </div>
  );
};
