
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Penilaian from './components/Penilaian';
import Dashboard from './components/Dashboard';
import CertificateViewer from './components/CertificateViewer';
import { getSyahadahList, addSyahadah, updateSyahadah, deleteSyahadah } from './firebase';
import { SyahadahData, NewSyahadahEntry, CertificateData } from './types';

const App: React.FC = () => {
  const [syahadahList, setSyahadahList] = useState<SyahadahData[]>([]);
  const [activeView, setActiveView] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [syahadahToEdit, setSyahadahToEdit] = useState<SyahadahData | null>(null);
  const [certificateToView, setCertificateToView] = useState<CertificateData | null>(null);

  const fetchSyahadahData = useCallback(async () => {
    setIsLoading(true);
    const data = await getSyahadahList();
    setSyahadahList(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSyahadahData();
  }, [fetchSyahadahData]);

  const handleSaveOrUpdatePenilaian = async (penilaianData: NewSyahadahEntry, id?: string) => {
    try {
      if (id) {
        await updateSyahadah(id, penilaianData);
        alert("Data penilaian berhasil diperbarui!");
      } else {
        await addSyahadah(penilaianData);
        alert("Data penilaian berhasil disimpan!");
      }
      setSyahadahToEdit(null);
      await fetchSyahadahData();
      setActiveView('Dashboard');
    } catch (error) {
      console.error("Failed to save or update penilaian:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  };
  
  const handleEdit = (syahadah: SyahadahData) => {
    setSyahadahToEdit(syahadah);
    setActiveView('Penilaian');
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await deleteSyahadah(id);
        await fetchSyahadahData();
        alert("Data berhasil dihapus!");
      } catch (error) {
        console.error("Failed to delete syahadah:", error);
        alert("Gagal menghapus data. Silakan coba lagi.");
      }
    }
  };

  const handleViewCertificate = (syahadah: SyahadahData) => {
    const certificateData: CertificateData = {
        id: syahadah.id,
        studentName: syahadah.namaSiswa,
        gender: syahadah.gender,
        date: syahadah.tanggalUjian.split('T')[0],
        hijriDate: syahadah.tanggalUjianHijriah,
        juz: syahadah.juz,
        grade: syahadah.nilaiAkhir.toFixed(2),
        predicate: syahadah.predikat,
        mudirName: 'Ust. Fulan, S.Pd.I', // Placeholder
        coordinatorName: 'Ust. Fulanah, Al-Hafizhah' // Placeholder
    };
    setCertificateToView(certificateData);
    setActiveView('Lihat Syahadah');
  };

  const handleBackToDashboard = () => {
      setCertificateToView(null);
      setActiveView('Dashboard');
  };

  const handleCancelEdit = () => {
      setSyahadahToEdit(null);
      setActiveView('Dashboard');
  };

  const handleNavClick = (name: string) => {
    if (name === 'Penilaian') {
      setSyahadahToEdit(null);
    }
    setCertificateToView(null);
    setActiveView(name);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Penilaian':
        return <Penilaian onSave={handleSaveOrUpdatePenilaian} syahadahToEdit={syahadahToEdit} onCancelEdit={handleCancelEdit} />;
      case 'Lihat Syahadah':
        return certificateToView && <CertificateViewer data={certificateToView} onBack={handleBackToDashboard} />;
      case 'Dashboard':
      default:
        return <Dashboard syahadahList={syahadahList} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} onView={handleViewCertificate} />;
    }
  };


  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header activeItem={activeView} onItemClick={handleNavClick} />
      <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
      </main>
    </div>
  );
};

export default App;