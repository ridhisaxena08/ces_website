import { Routes, Route } from 'react-router-dom';
import { GalleryManager } from '../components/GalleryManager';

export function GalleryRoutes() {
  return (
    <Routes>
      <Route 
        path="campus-building" 
        element={
          <div className="container mx-auto p-6">
            <GalleryManager category="campus-building" />
          </div>
        } 
      />
      <Route 
        path="girls-hostel" 
        element={
          <div className="container mx-auto p-6">
            <GalleryManager category="girls-hostel" />
          </div>
        } 
      />
      <Route 
        path="library" 
        element={
          <div className="container mx-auto p-6">
            <GalleryManager category="library" />
          </div>
        } 
      />
    </Routes>
  );
}
