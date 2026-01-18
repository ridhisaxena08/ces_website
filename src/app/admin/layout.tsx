// src/app/admin/layout.tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo1.png';
import {
  LayoutDashboard,
  FileText,
  Mail,
  LogOut
} from "lucide-react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">

        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          
          {/* Logo / Brand */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                <img 
                  src={logo} 
                  alt="CES Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                CES Dashboard
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">

            <Link
              to="/admin/dashboard"
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
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
              </div>
              Logout
            </button>
          </div>
        </div>


        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}