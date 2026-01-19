// src/app/admin/layout.tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '@/assets/logo1.png';
import {
  LayoutDashboard,
  FileText,
  Mail,
  LogOut,
  Menu,
  X
} from "lucide-react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2 ml-3">
            <img 
              src={logo} 
              alt="CES Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg font-semibold text-gray-900">
              CES Dashboard
            </span>
          </div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          
          {/* Logo / Brand */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                <img 
                  src={logo} 
                  alt="CES Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                CES
              </span>
            </div>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">

            <Link
              to="/admin/dashboard"
              onClick={closeSidebar}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                ${location.pathname === "/admin/dashboard"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="h-9 w-9 flex items-center justify-center rounded-lg
                bg-primary/10 text-primary">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              Dashboard
            </Link>

            <Link
              to="/admin/applications"
              onClick={closeSidebar}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                ${location.pathname === "/admin/applications"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="h-9 w-9 flex items-center justify-center rounded-lg
                bg-gray-100 group-hover:bg-gray-200">
                <FileText className="h-5 w-5" />
              </div>
              Applications
            </Link>

            <Link
              to="/admin/contacts"
              onClick={closeSidebar}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                ${location.pathname === "/admin/contacts"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="h-9 w-9 flex items-center justify-center rounded-lg
                bg-gray-100 group-hover:bg-gray-200">
                <Mail className="h-5 w-5" />
              </div>
              Contact Messages
            </Link>
          </nav>


          {/* Logout */}
          <div className="px-3 py-4 border-t border-gray-100">
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


        {/* Main Content */}
        <div className="flex-1 overflow-auto lg:ml-0 pt-16 lg:pt-0">
          <main className="p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}