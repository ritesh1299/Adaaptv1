import React, { useState, useEffect } from 'react';
import { AdaaptLogo } from '../AdaabtLogo';

interface DatasetSelectScreenProps {
  preselectedDataset?: string;
  onComplete: (dataset: string, user?: string) => void;
  onSkip: () => void;
}

interface Dataset {
  id: string;
  name: string;
  meta: string;
  department: 'Sales' | 'Marketing' | 'Finance' | 'Support' | 'HR';
  source: 'Sample' | 'Snowflake' | 'BigQuery' | 'Postgres' | 'Sheets' | 'S3';
  lastUpdated: string;
  rows: string;
  status: 'Ready' | 'Syncing' | 'Error';
}

export function DatasetSelectScreen({ preselectedDataset, onComplete, onSkip }: DatasetSelectScreenProps) {
  // D4) Seed five rows - EXACT SPECS
  const datasets: Dataset[] = [
    {
      id: 'sales_transactions',
      name: 'Sales_Transactions',
      meta: 'Sample',
      department: 'Sales',
      source: 'Sample',
      lastUpdated: '3d ago',
      rows: '1.2M',
      status: 'Ready'
    },
    {
      id: 'regional_sales',
      name: 'Regional_Sales',
      meta: 'Sample',
      department: 'Sales',
      source: 'Sample',
      lastUpdated: '4d',
      rows: '620k',
      status: 'Ready'
    },
    {
      id: 'finance_analysis',
      name: 'Finance_Analysis',
      meta: 'Sample',
      department: 'Finance',
      source: 'Sample',
      lastUpdated: '2d',
      rows: '240k',
      status: 'Ready'
    },
    {
      id: 'product_performance',
      name: 'Product_Performance',
      meta: 'Sample',
      department: 'Sales',
      source: 'Sample',
      lastUpdated: '4d',
      rows: '340k',
      status: 'Ready'
    },
    {
      id: 'marketing_leads',
      name: 'Marketing_Leads',
      meta: 'Sample',
      department: 'Marketing',
      source: 'Sample',
      lastUpdated: '5d',
      rows: '710k',
      status: 'Ready'
    }
  ];

  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Sales');
  const [adminCanView, setAdminCanView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  // Preselect based on Quick Start choice
  useEffect(() => {
    if (preselectedDataset === 'Sales — Sample') {
      setSelectedDataset('sales_transactions');
      setSelectedRowIndex(0);
    }
  }, [preselectedDataset]);

  const teammates = [
    { name: 'Jane D.', role: 'Analyst' },
    { name: 'Sam K.', role: 'Manager' },
    { name: 'Priya R.', role: 'Viewer' }
  ];

  const departments = ['Sales', 'Marketing', 'Finance', 'Support', 'HR'];
  const statuses = ['Ready', 'Syncing', 'Error'];
  const sources = ['Sample', 'Snowflake', 'BigQuery', 'Postgres', 'Sheets', 'S3'];

  // Filter datasets
  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || dataset.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || dataset.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || dataset.source === sourceFilter;
    return matchesSearch && matchesDepartment && matchesStatus && matchesSource;
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedRowIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : filteredDatasets.length - 1;
          setSelectedDataset(filteredDatasets[newIndex]?.id || '');
          return newIndex;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedRowIndex(prev => {
          const newIndex = prev < filteredDatasets.length - 1 ? prev + 1 : 0;
          setSelectedDataset(filteredDatasets[newIndex]?.id || '');
          return newIndex;
        });
      } else if (e.key === 'Enter' && selectedDataset) {
        handleContinue();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredDatasets, selectedDataset]);

  const handleRowClick = (dataset: Dataset, index: number) => {
    setSelectedDataset(dataset.id);
    setSelectedRowIndex(index);
  };

  // D4) Continue sets current_dataset; Skip leaves it to "Sales — Sample"; both go → 02
  const handleContinue = () => {
    if (selectedDataset) {
      const dataset = datasets.find(d => d.id === selectedDataset);
      onComplete(dataset?.name || selectedDataset, selectedUser);
    }
  };

  const getStatusPillStyle = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Syncing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Error':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDepartmentPillStyle = (department: string) => {
    const colors = {
      'Sales': 'bg-purple-100 text-purple-700 border-purple-200',
      'Marketing': 'bg-orange-100 text-orange-700 border-orange-200',
      'Finance': 'bg-green-100 text-green-700 border-green-200',
      'Support': 'bg-blue-100 text-blue-700 border-blue-200',
      'HR': 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getSourceLogo = (source: string) => {
    const icons = {
      'Sample': '📊',
      'Snowflake': '❄️',
      'BigQuery': '🔍',
      'Postgres': '🐘',
      'Sheets': '📋',
      'S3': '🗄️'
    };
    return icons[source as keyof typeof icons] || '📊';
  };

  return (
    <div className="root-background min-h-screen px-6 py-8">
      <div className="container-dataset relative z-20">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="logo-48 flex items-center justify-center">
            <AdaaptLogo size="lg" />
          </div>
        </div>

        {/* D4) 1040 container; left 720 table, right 320 allotment card */}
        <div className="flex gap-8 max-w-[1040px] mx-auto">
          
          {/* Left Column - Dataset Table (720px) */}
          <div className="w-[720px] tile-solid overflow-hidden">
            
            {/* Top: Search + filters */}
            <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search datasets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-standard pl-10 pr-4 text-meta"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <select 
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="input-standard text-meta"
                  >
                    <option value="All">Department ▾</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-standard text-meta"
                  >
                    <option value="All">Status ▾</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  
                  <select 
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="input-standard text-meta"
                  >
                    <option value="All">Source ▾</option>
                    {sources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Table: sticky header, 56h rows, zebra, hover shadow; selected row left border 2px brand */}
            <div className="overflow-auto max-h-96">
              <table className="w-full">
                
                <thead className="table-header">
                  <tr>
                    <th className="text-left p-4 text-label text-xs uppercase tracking-wide">Name</th>
                    <th className="text-left p-4 text-label text-xs uppercase tracking-wide">Department</th>
                    <th className="text-left p-4 text-label text-xs uppercase tracking-wide">Source</th>
                    <th className="text-left p-4 text-label text-xs uppercase tracking-wide">Last Updated</th>
                    <th className="text-left p-4 text-label text-xs uppercase tracking-wide">Rows</th>
                    <th className="text-left p-4 text-label text-xs uppercase tracking-wide">Status</th>
                    <th className="text-left p-4 text-label text-xs uppercase tracking-wide">⋯</th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredDatasets.map((dataset, index) => (
                    <tr 
                      key={dataset.id}
                      className={`
                        table-row border-b cursor-pointer transition-all duration-200
                        ${index % 2 === 1 ? 'table-zebra' : ''}
                        ${selectedDataset === dataset.id ? 'table-selected' : ''}
                        table-hover
                      `}
                      style={{ borderColor: 'var(--border-subtle)' }}
                      onClick={() => handleRowClick(dataset, index)}
                    >
                      {/* Columns: Name (icon + meta), Department (pill), Source (logo chip), Last updated, Rows, Status (pill), ⋯ actions */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm">📊</span>
                          </div>
                          <div>
                            <div className="text-meta font-medium">{dataset.name}</div>
                            <div className="text-xs text-muted">· {dataset.meta}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDepartmentPillStyle(dataset.department)}`}>
                          {dataset.department}
                        </span>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{getSourceLogo(dataset.source)}</span>
                          <span className="text-meta">{dataset.source}</span>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <span className="text-meta">{dataset.lastUpdated}</span>
                      </td>
                      
                      <td className="p-4">
                        <span className="text-meta font-medium">{dataset.rows}</span>
                      </td>
                      
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusPillStyle(dataset.status)}`}>
                          {dataset.status}
                        </span>
                      </td>
                      
                      <td className="p-4">
                        <button 
                          className="text-gray-400 hover:text-gray-600 p-1"
                          title="Preview schema, Sample 1000 rows, Manage access"
                        >
                          <span className="text-lg">⋯</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom: results meta left; pagination right */}
            <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="text-meta text-muted">
                {filteredDatasets.length} datasets • 2 sources
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-meta">Rows per page</span>
                  <select 
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="border border-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value={10}>▾ 10</option>
                    <option value={25}>▾ 25</option>
                    <option value={50}>▾ 50</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    ‹ Prev
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    Next ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Side card: teammate ▾, department scope ▾, toggle, helper text, buttons */}
          <div className="w-[320px] tile-solid p-6 h-fit">
            <div className="space-y-6">
              
              <div>
                <h2 className="text-h2 mb-2">Allot to a teammate (optional)</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-label block mb-2">Teammate ▾</label>
                  <select 
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="input-standard w-full text-meta"
                  >
                    <option value="">Select...</option>
                    {teammates.map((teammate, index) => (
                      <option key={index} value={teammate.name}>
                        {teammate.name} ({teammate.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-label block mb-2">Department scope ▾</label>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input-standard w-full text-meta"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="adminView"
                    checked={adminCanView}
                    onChange={(e) => setAdminCanView(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="adminView" className="text-meta">
                    Admin can view all data
                  </label>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200/50">
                  <p className="text-meta text-muted">
                    You can manage access later in Settings → Organization.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button 
                  onClick={handleContinue}
                  disabled={!selectedDataset}
                  className="button-primary w-full"
                >
                  Continue
                </button>
                
                <button 
                  onClick={onSkip}
                  className="button-outline w-full"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted">
            Use ↑/↓ to navigate, Enter to continue
          </p>
        </div>
      </div>
    </div>
  );
}