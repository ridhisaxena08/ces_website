// src/app/admin/contacts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'in_progress' | 'completed';
  [key: string]: any;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, endDate] = dateRange;
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedContact) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedContact]);

  useEffect(() => {
    fetchContacts();
  }, [dateFilter, dateRange, searchQuery]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      let q = query(collection(db, 'contact_enq'), orderBy('submittedAt', 'desc'));
      
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
      const contactData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[];

      // Apply search filter
      const filteredContacts = contactData.filter(contact => 
        contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.message?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setContacts(filteredContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'contact_enq', id), {
        status: newStatus
      });
      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string } } = {
      new: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-800' },
      completed: { bg: 'bg-green-100', text: 'text-green-800' }
    };
    const { bg, text } = statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search messages..."
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <tr 
                      key={contact.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-2 max-w-xs">
                          {contact.message || 'No message'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {format(new Date(contact.submittedAt), 'MMM d, yyyy')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(contact.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={contact.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateStatus(contact.id, e.target.value);
                          }}
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
                      No contact messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}