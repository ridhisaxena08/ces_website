'use client';

import { GalleryManager } from '../components/GalleryManager';

export default function CampusBuildingGallery() {
  return (
    <div className="container mx-auto p-6">
      <GalleryManager category="campus-building" />
    </div>
  );
}
