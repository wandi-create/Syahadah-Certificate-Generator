
import React from 'react';
import { CertificateData } from '../types';

interface SavedCertificatesListProps {
  certificates: CertificateData[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SavedCertificatesList: React.FC<SavedCertificatesListProps> = ({ certificates, onLoad, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-4">Saved Certificates</h2>
      {certificates.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No saved certificates yet.</p>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {certificates.map(cert => (
            <li key={cert.id} className="p-3 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between transition-all hover:shadow-md hover:border-teal-300">
              <div>
                <p className="font-semibold text-gray-800">{cert.studentName}</p>
                <p className="text-sm text-gray-500">{new Date(cert.date).toLocaleDateString('id-ID')}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onLoad(cert.id)}
                  className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(cert.id)}
                  className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
