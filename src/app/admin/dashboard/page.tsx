// src/app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { format, subDays, eachDayOfInterval, startOfWeek, isWithinInterval, isSameDay } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Application {
  id: string;
  emailAddress: string;
  submittedAt: string | Timestamp;
  status: 'new' | 'in_progress' | 'completed';
  updatedAt?: string | Timestamp;
}

interface Contact {
  id: string;
  email: string;
  submittedAt: string | Timestamp;
  status: 'new' | 'in_progress' | 'completed';
  updatedAt?: string | Timestamp;
}

interface StatusCounts {
  new: number;
  in_progress: number;
  completed: number;
  [key: string]: number;
}

const CHART_COLORS = {
  blue: 'rgba(99, 102, 241, 0.8)',
  yellow: 'rgba(249, 168, 37, 0.8)',
  green: 'rgba(16, 185, 129, 0.8)',
  blueLight: 'rgba(99, 102, 241, 0.2)',
  yellowLight: 'rgba(249, 168, 37, 0.2)',
  greenLight: 'rgba(16, 185, 129, 0.2)',
};

// Helper function to calculate average response time
function calculateAverageResponseTime(applications: Application[], contacts: Contact[]): string {
  const allItems = [...applications, ...contacts];
  let totalResponseTime = 0;
  let count = 0;

  allItems.forEach(item => {
    if (item.updatedAt && item.submittedAt) {
      const submitted = item.submittedAt instanceof Date ? item.submittedAt : item.submittedAt.toDate();
      const updated = item.updatedAt instanceof Date ? item.updatedAt : item.updatedAt.toDate();
      const diffInHours = (updated.getTime() - submitted.getTime()) / (1000 * 60 * 60);
      
      if (diffInHours > 0) {
        totalResponseTime += diffInHours;
        count++;
      }
    }
  });

  if (count === 0) return 'N/A';
  
  const avgHours = Math.round(totalResponseTime / count);
  if (avgHours < 24) return `${avgHours}h`;
  return `${Math.round(avgHours / 24)}d`;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days' | 'yearly'>('30days');
  
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalContacts: 0,
    pendingApplications: 0,
    pendingContacts: 0,
    applicationStatus: { new: 0, in_progress: 0, completed: 0 } as StatusCounts,
    contactStatus: { new: 0, in_progress: 0, completed: 0 } as StatusCounts,
  });

  // Fetch all necessary data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch applications
      const appsSnapshot = await getDocs(collection(db, 'application_enq'));
      const appsData = appsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt?.toDate ? doc.data().submittedAt.toDate() : new Date(doc.data().submittedAt || Date.now())
      })) as Application[];
      
      // Fetch contacts
      const contactsSnapshot = await getDocs(collection(db, 'contact_enq'));
      const contactsData = contactsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt?.toDate ? doc.data().submittedAt.toDate() : new Date(doc.data().submittedAt || Date.now())
      })) as Contact[];

      // Calculate status counts
      const appStatusCount = appsData.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      }, {} as StatusCounts);

      const contactStatusCount = contactsData.reduce((acc, contact) => {
        acc[contact.status] = (acc[contact.status] || 0) + 1;
        return acc;
      }, {} as StatusCounts);

      setApplications(appsData);
      setContacts(contactsData);
      setStats({
        totalApplications: appsData.length,
        totalContacts: contactsData.length,
        pendingApplications: appStatusCount.new || 0,
        pendingContacts: contactStatusCount.new || 0,
        applicationStatus: appStatusCount,
        contactStatus: contactStatusCount,
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Generate date range based on selected time range
  const getDateRange = useCallback(() => {
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case '7days':
        startDate = subDays(now, 7);
        break;
      case '30days':
        startDate = subDays(now, 30);
        break;
      case '90days':
        startDate = subDays(now, 90);
        break;
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = subDays(now, 30);
    }

    return { startDate, endDate: now };
  }, [timeRange]);

  // Prepare data for the applications trend chart
  const prepareChartData = useCallback(() => {
    const { startDate, endDate } = getDateRange();
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Group applications by day
    const dailyCounts = days.map(day => {
      const dayStart = new Date(day.setHours(0, 0, 0, 0));
      const dayEnd = new Date(day.setHours(23, 59, 59, 999));
      
      const dayApps = applications.filter(app => {
        const appDate = app.submittedAt instanceof Date ? app.submittedAt : new Date(app.submittedAt);
        return appDate >= dayStart && appDate <= dayEnd;
      });
      
      return {
        date: format(day, 'MMM d'),
        count: dayApps.length,
      };
    });

    // If too many days, group by week
    if (days.length > 30) {
      const weekCounts: { [key: string]: number } = {};
      
      applications.forEach(app => {
        const appDate = app.submittedAt instanceof Date ? app.submittedAt : new Date(app.submittedAt);
        if (appDate >= startDate && appDate <= endDate) {
          const weekStart = format(startOfWeek(appDate), 'MMM d');
          weekCounts[weekStart] = (weekCounts[weekStart] || 0) + 1;
        }
      });
      
      return {
        labels: Object.keys(weekCounts),
        data: Object.values(weekCounts),
      };
    }

    return {
      labels: dailyCounts.map(d => d.date),
      data: dailyCounts.map(d => d.count),
    };
  }, [applications, getDateRange]);

  // Chart data
  const { labels, data } = prepareChartData();
  
  const applicationsChartData = {
    labels,
    datasets: [
      {
        label: 'Applications',
        data,
        borderColor: CHART_COLORS.blue,
        backgroundColor: CHART_COLORS.blueLight,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: CHART_COLORS.blue,
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: CHART_COLORS.blue,
        pointHoverBorderColor: '#fff',
        pointHitRadius: 10,
        pointBorderWidth: 2,
      },
    ],
  };

  const statusChartData = {
    labels: ['New', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          stats.applicationStatus.new || 0,
          stats.applicationStatus.in_progress || 0,
          stats.applicationStatus.completed || 0
        ],
        backgroundColor: [
          CHART_COLORS.yellow,
          CHART_COLORS.blue,
          CHART_COLORS.green,
        ],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const contactStatusData = {
    labels: ['New', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          stats.contactStatus.new || 0,
          stats.contactStatus.in_progress || 0,
          stats.contactStatus.completed || 0
        ],
        backgroundColor: [
          CHART_COLORS.yellow,
          CHART_COLORS.blue,
          CHART_COLORS.green,
        ],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  // Chart options
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `${context.parsed.y} applications`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        grid: {
          borderDash: [3, 3],
        },
      },
    },
  };

  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Helper function to format numbers with K/M suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-lg">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your applications.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="yearly">This year</option>
          </select>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Applications Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats.totalApplications)}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Pending</span>
              <span className="text-sm font-medium text-yellow-600">{stats.pendingApplications}</span>
            </div>
          </div>
        </div>

        {/* Contacts Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats.totalContacts)}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Pending</span>
              <span className="text-sm font-medium text-yellow-600">{stats.pendingContacts}</span>
            </div>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalApplications > 0 
                  ? Math.round((stats.applicationStatus.completed / stats.totalApplications) * 100) 
                  : 0}%
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Completed</span>
              <span className="text-sm font-medium text-green-600">{stats.applicationStatus.completed || 0}</span>
            </div>
          </div>
        </div>

        {/* Response Time Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Response Time</p>
              <p className="text-2xl font-semibold text-gray-900">
                {calculateAverageResponseTime(applications, contacts)}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Last 30 days</span>
              <span className="text-xs text-blue-600 font-medium">View details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Applications Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Applications Trend</h3>
              <p className="text-sm text-gray-500">Number of applications over time</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeRange('7days')} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === '7days' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                7D
              </button>
              <button 
                onClick={() => setTimeRange('30days')} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === '30days' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                30D
              </button>
              <button 
                onClick={() => setTimeRange('90days')} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === '90days' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                90D
              </button>
              <button 
                onClick={() => setTimeRange('yearly')} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'yearly' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                1Y
              </button>
            </div>
          </div>
          <div className="h-80">
            <Line data={applicationsChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Status Distribution */}
        <div className="grid grid-rows-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Status</h3>
            <p className="text-sm text-gray-500 mb-4">Distribution of application statuses</p>
            <div className="h-48">
              <Pie data={statusChartData} options={{
                ...pieChartOptions,
                plugins: {
                  ...pieChartOptions.plugins,
                  title: {
                    display: true,
                    text: `Total: ${stats.totalApplications}`,
                    position: 'bottom' as const,
                  },
                },
              }} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Status</h3>
            <p className="text-sm text-gray-500 mb-4">Distribution of contact statuses</p>
            <div className="h-48">
              <Pie data={contactStatusData} options={{
                ...pieChartOptions,
                plugins: {
                  ...pieChartOptions.plugins,
                  title: {
                    display: true,
                    text: `Total: ${stats.totalContacts}`,
                    position: 'bottom' as const,
                  },
                },
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500">Latest applications and contacts</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {[...applications, ...contacts]
              .sort((a, b) => {
                const dateA = a.submittedAt instanceof Date ? a.submittedAt : new Date(a.submittedAt);
                const dateB = b.submittedAt instanceof Date ? b.submittedAt : new Date(b.submittedAt);
                return dateB.getTime() - dateA.getTime();
              })
              .slice(0, 5)
              .map((item) => {
                const isApplication = 'emailAddress' in item;
                const date = item.submittedAt instanceof Date 
                  ? format(item.submittedAt, 'MMM d, yyyy h:mm a') 
                  : format(item.submittedAt.toDate(), 'MMM d, yyyy h:mm a');
                
                return (
                  <div key={`${isApplication ? 'app' : 'contact'}-${item.id}`} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className={`p-2 rounded-lg mr-4 ${
                      isApplication ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {isApplication ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {isApplication 
                          ? `New application from ${item.emailAddress}`
                          : `New contact from ${'email' in item ? item.email : 'unknown'}`}
                      </p>
                      <p className="text-xs text-gray-500">{date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'in_progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                );
              })}
              
              {applications.length === 0 && contacts.length === 0 && (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new application or contact.</p>
                </div>
              )}
          </div>
        </div>
    </div>
  );
}