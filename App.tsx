
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Penilaian from './components/Penilaian';
import Dashboard from './components/Dashboard';
import { getSyahadahList, addSyahadah } from './firebase';
import { SyahadahData, NewSyahadahEntry } from './types';

const App: React.FC = () => {
  const [syahadahList, setSyahadahList] = useState<SyahadahData[]>([]);
  const [activeView, setActiveView] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Firebase on initial load
  const fetchSyahadahData = useCallback(async () => {
    setIsLoading(true);
    const data = await getSyahadahList();
    setSyahadahList(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSyahadahData();
  }, [fetchSyahadahData]);

  const handleSavePenilaian = async (penilaianData: NewSyahadahEntry) => {
    try {
      await addSyahadah(penilaianData);
      // After saving, refresh the list to show the new entry
      await fetchSyahadahData();
      // Optionally, switch to dashboard to see the new entry
      alert("Data penilaian berhasil disimpan!");
      setActiveView('Dashboard');
    } catch (error) {
      console.error("Failed to save penilaian:", error);
      // Here you could show an error message to the user
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Penilaian':
        return <Penilaian onSave={handleSavePenilaian} />;
      case 'Dashboard':
      default:
        // Pass loading state to dashboard to show a spinner or message
        return <Dashboard syahadahList={syahadahList} isLoading={isLoading} />;
    }
  };


  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header activeItem={activeView} onItemClick={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
      </main>
    </div>
  );
};

export default App;