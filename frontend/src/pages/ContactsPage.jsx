import { useState, useEffect } from 'react';
import { contactService } from '../services/contactService';
import { Card, CardBody, CardHeader, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Alert } from '../components/Alert';
import { LoadingSpinner } from '../components/Loading';
import { Badge } from '../components/Badge';

export function ContactsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [groupCounts, setGroupCounts] = useState({});
  const [groupName, setGroupName] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const contactGroups = await contactService.getContactGroups();
      setGroups(contactGroups);

      // Get counts for each group
      const counts = {};
      for (const group of contactGroups) {
        const groupContacts = await contactService.getContactsByGroup(group);
        counts[group] = groupContacts.length;
      }
      setGroupCounts(counts);
    } catch (err) {
      setError('Failed to load contacts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length === 0) return [];

    // Parse header
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const nameIndex = headers.findIndex(h => h.includes('name'));
    const phoneIndex = headers.findIndex(h => h.includes('phone'));

    if (nameIndex === -1 || phoneIndex === -1) {
      throw new Error('CSV must contain "Name" and "Phone" columns');
    }

    // Parse data rows
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length > Math.max(nameIndex, phoneIndex)) {
        data.push({
          name: values[nameIndex],
          phone_number: values[phoneIndex],
        });
      }
    }

    return data;
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error('Failed to read file');

        const data = parseCSV(text);
        setCsvFile(file);
        setPreviewData(data.slice(0, 5)); // Preview first 5 rows
        setShowPreview(true);
        setError('');
      } catch (err) {
        setError('Error parsing CSV: ' + err.message);
        setCsvFile(null);
        setPreviewData([]);
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!csvFile) {
      setError('Please select a CSV file');
      return;
    }

    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }

    try {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const text = e.target?.result;
          if (typeof text !== 'string') throw new Error('Failed to read file');

          const data = parseCSV(text);
          await contactService.uploadContacts(data, groupName.trim());

          setSuccess(`Successfully uploaded ${data.length} contacts to "${groupName}"`);
          setGroupName('');
          setCsvFile(null);
          setPreviewData([]);
          setShowPreview(false);

          // Reload contacts
          await loadContacts();

          // Clear success message after 5 seconds
          setTimeout(() => setSuccess(''), 5000);
        } catch (err) {
          setError('Upload failed: ' + err.message);
        }
      };
      reader.readAsText(csvFile);
    } catch (err) {
      setError('Error uploading contacts: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGroup = async (group) => {
    if (!window.confirm(`Are you sure you want to delete all contacts in "${group}"?`)) {
      return;
    }

    try {
      await contactService.deleteContactGroup(group);
      setSuccess(`Deleted all contacts in "${group}"`);
      await loadContacts();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError('Failed to delete group: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      {/* Upload Section */}
      <Card>
        <CardHeader
          title="Upload Contacts"
          description="Import contacts from a CSV file to create a new group or add to existing one"
        />
        <CardBody>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Group Name"
                type="text"
                placeholder="e.g., VIP Customers, Newsletter"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  CSV File <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">
                  CSV Format: Name, Phone (e.g., John Doe, +234812345678)
                </p>
              </div>
            </div>

            {showPreview && previewData.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">Preview (showing first 5 rows)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-200">
                        <th className="text-left py-2 px-3 font-medium text-blue-900">Name</th>
                        <th className="text-left py-2 px-3 font-medium text-blue-900">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, idx) => (
                        <tr key={idx} className="border-b border-blue-100">
                          <td className="py-2 px-3 text-blue-800">{row.name}</td>
                          <td className="py-2 px-3 text-blue-800">{row.phone_number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button
            variant="secondary"
            onClick={() => {
              setGroupName('');
              setCsvFile(null);
              setPreviewData([]);
              setShowPreview(false);
            }}
          >
            Clear
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!csvFile || !groupName.trim() || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Contacts'}
          </Button>
        </CardFooter>
      </Card>

      {/* Contact Groups */}
      <Card>
        <CardHeader
          title="Contact Groups"
          description={`You have ${groups.length} contact groups`}
        />
        <CardBody>
          {groups.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No contact groups yet. Upload a CSV file to create one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {groups.map(group => (
                <div
                  key={group}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{group}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {groupCounts[group] || 0} contacts
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="primary">
                      {groupCounts[group] || 0}
                    </Badge>
                    <button
                      onClick={() => handleDeleteGroup(group)}
                      className="px-3 py-1.5 text-sm font-medium text-danger hover:bg-red-50 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Instructions Card */}
      <Card>
        <CardHeader title="CSV Upload Instructions" />
        <CardBody>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">File Format</h4>
              <p>Your CSV file should have at least two columns: <code className="bg-gray-100 px-2 py-1 rounded">Name</code> and <code className="bg-gray-100 px-2 py-1 rounded">Phone</code></p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Example CSV Content</h4>
              <div className="bg-gray-100 p-3 rounded font-mono text-xs">
                Name,Phone<br/>
                John Doe,+234812345678<br/>
                Jane Smith,+234912345678<br/>
                Mike Johnson,+234712345678
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure phone numbers are properly formatted</li>
                <li>First row should contain column headers</li>
                <li>You can have additional columns, but Name and Phone are required</li>
                <li>Group names help organize contacts for different campaigns</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
