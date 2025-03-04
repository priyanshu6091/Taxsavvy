import { FileText, Download } from 'lucide-react';

const documents = [
  {
    id: 'w2-2023',
    name: 'W-2 Form 2023',
    type: 'Tax Form',
    date: '2024-02-01',
    status: 'verified',
  },
  {
    id: '1099-misc',
    name: '1099-MISC',
    type: 'Tax Form',
    date: '2024-02-05',
    status: 'pending_review',
  },
  {
    id: 'mortgage',
    name: 'Mortgage Interest Statement',
    type: 'Financial',
    date: '2024-02-10',
    status: 'verified',
  },
  {
    id: 'donations',
    name: 'Charitable Donations Receipt',
    type: 'Receipt',
    date: '2024-02-15',
    status: 'verified',
  },
  {
    id: 'expenses',
    name: 'Business Expense Records',
    type: 'Financial',
    date: '2024-02-20',
    status: 'needs_action',
  },
];

function Documents() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs_action':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending_review':
        return 'Pending Review';
      case 'needs_action':
        return 'Needs Action';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tax Documents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize your tax-related documents
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
          Upload Document
        </button>
      </div>

      <div className="overflow-hidden bg-white shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {doc.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{doc.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {new Date(doc.date).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    {getStatusText(doc.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-primary hover:text-primary/80">
                    <Download className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Documents;
