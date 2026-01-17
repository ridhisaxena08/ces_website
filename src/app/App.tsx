import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { AdmissionForm } from '@/app/components/AdmissionForm';
import { CampusVisitForm } from '@/app/components/CampusVisitForm';
import { CareerPaths } from '@/app/components/CareerPaths';
import { HomePage } from '@/app/pages/HomePage';
import { ScholarshipPage } from '@/app/pages/ScholarshipPage';
import { SelectionProcessPage } from '@/app/pages/SelectionProcessPage';
import { CareerPathsPage } from '@/app/pages/CareerPathsPage';
import { HostelFacilitiesPage } from '@/app/pages/HostelFacilitiesPage';
import { LibraryAndStudyAreasPage } from '@/app/pages/LibraryAndStudyAreasPage';
import { CampusBuildingsPage } from '@/app/pages/CampusBuildingsPage';
import { ContactUsPage } from '@/app/pages/ContactUsPage';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCareerPathsOpen, setIsCareerPathsOpen] = useState(false);
  const [isCampusVisitOpen, setIsCampusVisitOpen] = useState(false);
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Header onApplyClick={() => setIsFormOpen(true)} />
        
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onApplyClick={() => setIsFormOpen(true)}
                  onCampusVisitClick={() => setIsCampusVisitOpen(true)}
                />
              } 
            />
            <Route path="/scholarship" element={<ScholarshipPage />} />
            <Route path="/selection-process" element={<SelectionProcessPage />} />
            <Route path="/career-paths" element={<CareerPathsPage />} />
            <Route path="/hostel-facilities" element={<HostelFacilitiesPage />} />
            <Route path="/library" element={<LibraryAndStudyAreasPage />} />
            <Route path="/campus-buildings" element={<CampusBuildingsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
          </Routes>
        </main>
        
        <Footer />
        
        <AdmissionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        <CampusVisitForm isOpen={isCampusVisitOpen} onClose={() => setIsCampusVisitOpen(false)} />
        <CareerPaths isOpen={isCareerPathsOpen} onClose={() => setIsCareerPathsOpen(false)} />
      </div>
    </Router>
  );
}