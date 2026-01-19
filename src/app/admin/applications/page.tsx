// src/app/admin/applications/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { collection, getDocs, query, orderBy, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Application {
  id: string;
  name: string;
  studentFullName?: string;
  emailAddress: string;
  mobileNumber: string;
  submittedAt: string;
  status: 'new' | 'in_progress' | 'completed';
  [key: string]: any;
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, endDate] = dateRange;
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Function to calculate date range
  const getDateRange = (range: string) => {
    const now = new Date();
    const result = { start: new Date(0), end: new Date() }; // Default to all time
    
    switch (range) {
      case '7days':
        result.start = subDays(new Date(), 7);
        break;
      case '30days':
        result.start = subDays(new Date(), 30);
        break;
      case '90days':
        result.start = subDays(new Date(), 90);
        break;
      case 'yearly':
        result.start = new Date(now.getFullYear(), 0, 1); // Start of current year
        break;
      case 'all':
      default:
        result.start = new Date(0); // The beginning of time
    }
    
    return result;
  };

  useEffect(() => {
    fetchApplications();
  }, [dateFilter, dateRange, searchQuery]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let q = query(collection(db, 'application_enq'), orderBy('submittedAt', 'desc'));
      
      if (dateRange[0] && dateRange[1]) {
        // Use custom date range if selected
        q = query(
          q,
          where('submittedAt', '>=', dateRange[0]),
          where('submittedAt', '<=', new Date(dateRange[1].setHours(23, 59, 59, 999)))
        );
      } else if (dateFilter !== 'all') {
        // Use preset date range if selected
        const { start } = getDateRange(dateFilter);
        q = query(q, where('submittedAt', '>=', start));
      }

      const querySnapshot = await getDocs(q);
      const apps = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Application[];

      const filteredApps = apps.filter(app => 
        app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.emailAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.mobileNumber?.includes(searchQuery)
      );

      setApplications(filteredApps);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'application_enq', id), {
        status: newStatus
      });
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      if (selectedApplication?.id === id) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const openModal = (app: Application) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedApplication(null), 300);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string } } = {
      new: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      in_progress: { bg: 'bg-primary', text: 'text-white' },
      completed: { bg: 'bg-green-100', text: 'text-green-800' }
    };
    const { bg, text } = statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const formatFieldName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim();
  };

  const formatFieldValue = (value: any) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object' && !(value instanceof Date)) return JSON.stringify(value, null, 2);
    if (value instanceof Date || (typeof value === 'string' && value.includes('T'))) {
      try {
        return format(new Date(value), 'PPpp');
      } catch {
        return value;
      }
    }
    return value;
  };

  const excludedFields = ['id', 'status'];

  return (
    <div className="p-3 sm:p-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Applications</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:flex-1">
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                setDateFilter('custom');
              }}
              isClearable={true}
              placeholderText="Select date range"
              className="border rounded-lg px-4 py-2 w-full sm:w-48"
            />
            <select
              className="border rounded-lg px-4 py-2 w-full sm:w-40"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setDateRange([null, null]);
              }}
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="yearly">This Year</option>
              <option value="custom" disabled={!dateRange[0] || !dateRange[1]}>
                {dateRange[0] && dateRange[1] 
                  ? `${format(dateRange[0], 'MMM d')} - ${format(dateRange[1], 'MMM d, yyyy')}`
                  : 'Custom Range'}
              </option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Phone</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Submitted</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {app.studentFullName || app.name}
                        </div>
                        <div className="text-xs text-gray-500 sm:hidden">
                          {app.emailAddress}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm text-gray-600 truncate max-w-[150px]">{app.emailAddress}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.mobileNumber || 'N/A'}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-xs text-gray-500">{format(new Date(app.submittedAt), 'MMM d, yyyy')}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-start sm:justify-start">
                          {getStatusBadge(app.status)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 sm:space-x-2 text-right">
                        <button
                          onClick={() => openModal(app)}
                          className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <select
                          className="border border-gray-300 rounded-md shadow-sm py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isModalOpen && selectedApplication && (
        <div 
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mt-8 mb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                <p className="text-sm text-gray-500 mt-1">ID: {selectedApplication.id}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(selectedApplication)
                  .filter(([key]) => !excludedFields.includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-3">
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        {formatFieldName(key)}
                      </dt>
                      <dd className="text-sm text-gray-900 break-words whitespace-pre-wrap">
                        {formatFieldValue(value)}
                      </dd>
                    </div>
                  ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-2 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select
                  className="border rounded-lg px-3 py-2 text-sm"
                  value={selectedApplication.status}
                  onChange={(e) => updateStatus(selectedApplication.id, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}