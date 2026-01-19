// src/app/App.tsx
import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase';
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
import ContactUsPage from '@/app/pages/ContactUsPage';
import { AdminLayout } from '@/app/admin/layout';
import AdminDashboard from '@/app/admin/dashboard/page';
import AdminApplications from '@/app/admin/applications/page';
import AdminContacts from '@/app/admin/contacts/page';
import AdminLogin from '@/app/admin/login/page';
import { GalleryRoutes } from '@/app/admin/gallery';

// Create Auth Context
export const AuthContext = createContext<{
  currentUser: User | null;
  loading: boolean;
}>({ currentUser: null, loading: true });

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCareerPathsOpen, setIsCareerPathsOpen] = useState(false);
  const [isCampusVisitOpen, setIsCampusVisitOpen] = useState(false);
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Header and Footer */}
          <Route path="/*" element={
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
                  <Route path="/scholarships" element={<ScholarshipPage />} />
                  <Route path="/selection-process" element={<SelectionProcessPage />} />
                  <Route path="/career-paths" element={<CareerPathsPage />} />
                  <Route path="/hostel-facilities" element={<HostelFacilitiesPage />} />
                  <Route path="/library" element={<LibraryAndStudyAreasPage />} />
                  <Route path="/campus" element={<CampusBuildingsPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  
                  {/* Redirect to home for unknown routes */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              
              <Footer />
              
              <AdmissionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
              <CareerPaths isOpen={isCareerPathsOpen} onClose={() => setIsCareerPathsOpen(false)} />
              <CampusVisitForm isOpen={isCampusVisitOpen} onClose={() => setIsCampusVisitOpen(false)} />
            </div>
          } />
          
          {/* Admin Routes without Header and Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="gallery/*" element={<GalleryRoutes />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}