
import React from 'react';
import { CertificateData } from '../types';
import { DocumentTextIcon } from './icons';

interface RekapSyahadahProps {
  certificates: CertificateData[];
}

const RekapSyahadah: React.FC<RekapSyahadahProps> = ({ certificates }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="flex items-center border-b pb-4 mb-6">
            <DocumentTextIcon className="h-8 w-8 text-teal-600 mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">Rekap Syahadah</h1>
        </div>
        {certificates.length === 0 ? (
           <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700">No Data Available</h2>
              <p className="mt-2 text-gray-500">
                  There are no saved certificates to display.
              </p>
              <p className="mt-1 text-gray-500">
                  Go to the Dashboard to create and save a new certificate.
              </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Juz</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certificates.map((cert, index) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{cert.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(cert.date).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.juz}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cert.predicate.includes("Mumtaz") ? 'bg-green-100 text-green-800' :
                        cert.predicate.includes("Jayyid") ? 'bg-blue-100 text-blue-800' :
                        cert.predicate.includes("Maqbul") ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {cert.predicate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RekapSyahadah;
