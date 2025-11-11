
import React from 'react';
import { SyahadahData } from '../types';
import { SealIcon, CheckCircleIconDashboard, BookOpenIconDashboard } from './icons';

interface DashboardProps {
  syahadahList: SyahadahData[];
  isLoading: boolean;
}

const StatCard: React.FC<{ title: string; value: string; subtitle: string; icon: React.ReactNode; color: string; }> = ({ title, value, subtitle, icon, color }) => (
    <div className={`bg-white p-5 rounded-xl shadow-md border-l-4 ${color} flex items-start justify-between`}>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className={`text-4xl font-bold text-gray-800 mt-2`}>{value}</p>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="text-gray-300">
            {icon}
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ syahadahList, isLoading }) => {
    const totalSiswaDiuji = syahadahList.length;
    const rataRataNilai = totalSiswaDiuji > 0
        ? syahadahList.reduce((acc, curr) => acc + curr.nilaiAkhir, 0) / totalSiswaDiuji
        : 0;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <header style={{background: 'linear-gradient(90deg, #2a2a72 0%, #4a2f8c 100%)'}} className="text-white p-6 rounded-xl shadow-lg flex items-center">
                <div className="bg-white/10 p-3 rounded-lg mr-5">
                   <SealIcon className="w-8 h-8"/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Syahadah</h1>
                    <p className="text-indigo-200 mt-1">Lacak dan kelola pencapaian syahadah siswa</p>
                </div>
            </header>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Siswa Diuji"
                    value={totalSiswaDiuji.toString()}
                    subtitle="Siswa yang sudah diuji"
                    icon={<CheckCircleIconDashboard className="w-8 h-8" />}
                    color="border-orange-400"
                />
                <StatCard 
                    title="Total Syahadah Selesai"
                    value={totalSiswaDiuji.toString()}
                    subtitle="Total ujian yang telah dilakukan"
                    icon={<SealIcon className="w-8 h-8" />}
                    color="border-green-400"
                />
                <StatCard 
                    title="Rata-rata Nilai"
                    value={rataRataNilai.toFixed(1)}
                    subtitle="Nilai rata-rata (skala 100)"
                    icon={<BookOpenIconDashboard className="w-8 h-8" />}
                    color="border-purple-500"
                />
            </div>

            {/* Daftar Syahadah Table */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily: 'serif'}}>Daftar Syahadah</h2>
                <p className="text-gray-500 mt-1">Kelola dan lacak syahadah hafalan Al-Qur'an siswa ({syahadahList.length} data)</p>

                {isLoading ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg mt-6">
                        <p className="text-gray-600 font-medium">Memuat data dari database...</p>
                    </div>
                ) : syahadahList.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">Belum Ada Data</h3>
                        <p className="mt-2 text-gray-500">Silakan tambahkan data baru melalui menu Penilaian.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ujian</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predikat</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {syahadahList.map((cert, index) => (
                                    <tr key={cert.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{cert.namaSiswa}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.kelas}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                cert.gender === 'Akhwat' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {cert.gender}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Juz {cert.juz}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(cert.tanggalUjian).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-bold">{cert.nilaiAkhir.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                cert.predikat.includes("Murtafi") ? 'bg-purple-100 text-purple-800' :
                                                cert.predikat.includes("Mumtaz") ? 'bg-green-100 text-green-800' :
                                                cert.predikat.includes("Jayyid") ? 'bg-blue-100 text-blue-800' :
                                                cert.predikat.includes("Maqbul") ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {cert.predikat}
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

export default Dashboard;