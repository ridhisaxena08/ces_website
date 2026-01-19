import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import logo from '@/assets/logo1.png';
import {
  LayoutDashboard,
  FileText,
  Mail,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth(app);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  // Get the current path for active link highlighting
  const pathname = location.pathname;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getPageTitle = (path: string) => {
    if (path === '/admin/dashboard') return 'Dashboard';
    if (path.startsWith('/admin/applications')) return 'Applications';
    if (path.startsWith('/admin/contacts')) return 'Contact Messages';
    if (path.startsWith('/admin/gallery')) {
      if (path.endsWith('campus-building')) return 'Campus Building Gallery';
      if (path.endsWith('girls-hostel')) return 'Girls Hostel Gallery';
      if (path.endsWith('library')) return 'Library Gallery';
      if (path.endsWith('study-area')) return 'Study Area Gallery';
      return 'Gallery';
    }
    return 'Admin Panel';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center px-4 lg:pl-64">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <h1 className="ml-4 text-lg font-semibold text-gray-900">
              {getGreeting()}, Admin
            </h1>
          </div>
          <div className="flex items-center">
            {/* Add any user menu or notifications here */}
          </div>
        </div>
      </header>

      <div className="flex min-h-screen pt-10">

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 ml-3">
              <img 
                src={logo} 
                alt="CES Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-semibold text-gray-900">
                CES Admin
              </span>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
          <div className="flex-1 flex flex-col h-full">
            {/* Logo and Title */}
            <div className="flex items-center p-4 border-b border-gray-200">
              <img 
                src={logo} 
                alt="CES Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="ml-3 text-lg font-semibold text-gray-900">
                CES Dashboard
              </span>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              <Link
                to="/admin/dashboard"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${pathname === '/admin/dashboard' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeSidebar}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/admin/applications"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${pathname.startsWith('/admin/applications') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeSidebar}
              >
                <FileText className="mr-3 h-5 w-5" />
                Applications
              </Link>
              <Link
                to="/admin/contacts"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${pathname.startsWith('/admin/contacts') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeSidebar}
              >
                <Mail className="mr-3 h-5 w-5" />
                Contact Messages
              </Link>
              
              {/* Gallery Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                    ${pathname.startsWith("/admin/gallery")
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <div className="flex items-center">
                    <ImageIcon className="mr-3 h-5 w-5" />
                    <span>Gallery</span>
                  </div>
                  {isGalleryOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {isGalleryOpen && (
                  <div className="pl-8 space-y-1">
                    <Link
                      to="/admin/gallery/campus-building"
                      onClick={closeSidebar}
                      className={`block px-3 py-2 text-sm rounded-lg transition
                        ${pathname === "/admin/gallery/campus-building"
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      Campus Building
                    </Link>
                    <Link
                      to="/admin/gallery/girls-hostel"
                      onClick={closeSidebar}
                      className={`block px-3 py-2 text-sm rounded-lg transition
                        ${pathname === "/admin/gallery/girls-hostel"
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      Girls Hostel
                    </Link>
                    <Link
                      to="/admin/gallery/library"
                      onClick={closeSidebar}
                      className={`block px-3 py-2 text-sm rounded-lg transition
                        ${pathname === "/admin/gallery/library"
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      Library
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-gray-100 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-md bg-red-100">
                  <LogOut className="h-4 w-4" />
                </div>
                Logout
              </button>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="flex-1 overflow-auto lg:ml-64">
          <main className="p-4 sm:p-6 max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}