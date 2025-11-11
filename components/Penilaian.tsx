
import React, { useState, useEffect } from 'react';
import { NewSyahadahEntry } from '../types';

const InputField: React.FC<{
    label: string;
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
}> = ({ label, id, value, onChange, type = 'text', placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);

interface PenilaianProps {
  onSave: (data: NewSyahadahEntry) => Promise<void>;
}


const Penilaian: React.FC<PenilaianProps> = ({ onSave }) => {
    const [formData, setFormData] = useState({
        namaSiswa: '',
        kelas: '',
        gender: '',
        juz: '',
        tanggalUjian: new Date().toISOString().split('T')[0],
        jmlKetuk: 0,
        jmlTuntun: 0,
        jmlTajwid: 0,
    });
    
    const [isSaving, setIsSaving] = useState(false);

    const [hasil, setHasil] = useState({
        nilaiAkhir: 100,
        predikat: "Mumtaz Murtafi'",
        status: 'Lulus'
    });

    useEffect(() => {
        const { jmlKetuk, jmlTuntun, jmlTajwid } = formData;
        
        const nilaiAkhir = 100 - (jmlKetuk * 0.5) - (jmlTuntun * 1) - (jmlTajwid * 0.25);
        const clampedNilai = Math.max(0, nilaiAkhir);

        let predikat = '';
        if (clampedNilai === 100) predikat = "Mumtaz Murtafi'";
        else if (clampedNilai >= 90) predikat = "Mumtaz";
        else if (clampedNilai >= 80) predikat = "Jayyid Jiddan";
        else if (clampedNilai >= 70) predikat = "Maqbul";
        else predikat = "Rasib";
        
        const status = clampedNilai >= 75 ? 'Lulus' : 'Tidak Lulus';

        setHasil({
            nilaiAkhir: clampedNilai,
            predikat,
            status
        });

    }, [formData.jmlKetuk, formData.jmlTuntun, formData.jmlTajwid]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.startsWith('jml') ? Math.max(0, parseInt(value, 10) || 0) : value
        }));
    };
    
    const handleSave = async () => {
        if (!formData.namaSiswa || !formData.kelas || !formData.gender || !formData.juz) {
            alert("Harap lengkapi semua data diri siswa dan detail ujian.");
            return;
        }

        setIsSaving(true);
        const dataToSave: NewSyahadahEntry = {
            ...formData,
            ...hasil,
        };
        await onSave(dataToSave);
        setIsSaving(false);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800" style={{fontFamily: 'serif'}}>Form Penilaian Syahadah</h1>
                <p className="text-gray-500 mt-1">Isi data siswa dan nilai ujian untuk syahadah.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Data Diri Siswa */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">Data Diri Siswa</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-6">Masukkan informasi dasar mengenai siswa yang mengikuti ujian.</p>
                        <div className="space-y-4">
                            <InputField 
                                label="Nama Siswa"
                                id="namaSiswa"
                                value={formData.namaSiswa}
                                onChange={handleChange}
                                placeholder="Contoh: Muhammad Al-Fatih"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField 
                                    label="Kelas"
                                    id="kelas"
                                    value={formData.kelas}
                                    onChange={handleChange}
                                    placeholder="Contoh: 6A"
                                />
                                 <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select 
                                        id="gender" 
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Pilih Gender</option>
                                        <option value="Ikhwan">Ikhwan</option>
                                        <option value="Akhwat">Akhwat</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detail dan Hasil Ujian */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                         <h2 className="text-xl font-bold text-gray-800">Detail dan Hasil Ujian</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-6">Pilih juz yang diuji dan input jumlah kesalahan siswa.</p>
                        <div className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="juz" className="block text-sm font-medium text-gray-700 mb-1">Juz yang Diuji</label>
                                    <select 
                                        id="juz" 
                                        name="juz"
                                        value={formData.juz}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Pilih Juz</option>
                                        {[...Array(30)].map((_, i) => <option key={i+1} value={i+1}>Juz {i+1}</option>)}
                                    </select>
                                </div>
                                <InputField
                                    label="Tanggal Ujian"
                                    id="tanggalUjian"
                                    type="date"
                                    value={formData.tanggalUjian}
                                    onChange={handleChange}
                                />
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <InputField 
                                    label="Jml. Ketuk"
                                    id="jmlKetuk"
                                    type="number"
                                    value={formData.jmlKetuk}
                                    onChange={handleChange}
                                />
                                <InputField 
                                    label="Jml. Tuntun"
                                    id="jmlTuntun"
                                    type="number"
                                    value={formData.jmlTuntun}
                                    onChange={handleChange}
                                />
                                 <InputField 
                                    label="Jml. Tajwid"
                                    id="jmlTajwid"
                                    type="number"
                                    value={formData.jmlTajwid}
                                    onChange={handleChange}
                                />
                           </div>
                        </div>
                    </div>
                </div>

                {/* Ringkasan Hasil */}
                <div className="lg:col-span-1 sticky top-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                        <h2 className="text-xl font-bold text-gray-800">Ringkasan Hasil</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-6">Hasil akhir dihitung secara otomatis berdasarkan input nilai.</p>
                        
                        <div className="my-6">
                            <p className="text-sm text-gray-500">Nilai Akhir</p>
                            <p className="text-5xl font-bold text-blue-600 my-1">{hasil.nilaiAkhir.toFixed(2)}</p>
                        </div>

                        <div className="my-6">
                            <p className="text-sm text-gray-500">Predikat</p>
                            <p className="text-2xl font-semibold text-gray-800">{hasil.predikat}</p>
                        </div>
                        
                        <div className="my-6">
                             <p className="text-sm text-gray-500">Status</p>
                             <p className={`text-xl font-bold ${hasil.status === 'Lulus' ? 'text-green-600' : 'text-red-600'}`}>{hasil.status}</p>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan Penilaian'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Penilaian;