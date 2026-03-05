import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { campaignService } from '../services/campaignService';
import { contactService } from '../services/contactService';
import { queueService } from '../services/queueService';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { LoadingSpinner } from '../components/Loading';

export function CreateCampaignPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [creatingNewGroup, setCreatingNewGroup] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    groupName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.message || !formData.groupName) {
      setError('All fields are required');
      return;
    }

    if (formData.message.length > 160) {
      setError('Message must be 160 characters or less');
      return;
    }

    try {
      setLoading(true);

      // resolve group name when creating new one
      const selectedGroup = creatingNewGroup ? formData.groupName : formData.groupName;

      // Get contacts for the group
      const contacts = await contactService.getContactsByGroup(selectedGroup);

      if (contacts.length === 0) {
        setError('No contacts found in selected group');
        return;
      }

      // Create campaign
      const campaign = await campaignService.createCampaign({
        name: formData.name,
        message: formData.message,
        group_name: formData.groupName,
        userId: user.id,
        totalSms: contacts.length,
      });

      // Create queue entries
      await queueService.createQueueEntriesForCampaign(
        campaign.id,
        contacts,
        formData.message
      );

      setSuccess(`Campaign created with ${contacts.length} messages`);
      setTimeout(() => navigate('/campaigns'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to create campaign');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const g = await contactService.getContactGroups();
        setGroups(g);
      } catch (err) {
        console.error('Failed to load contact groups', err);
      }
    };

    loadGroups();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader title="Create Campaign" description="Set up a new SMS campaign" />
        <CardBody>
          {error && <Alert type="error" message={error} onClose={() => setError('')} className="mb-6" />}
          {success && <Alert type="success" message={success} className="mb-6" />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Campaign Name"
              name="name"
              placeholder="e.g., March Marketing Campaign"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your SMS message (max 160 characters)"
                maxLength={160}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.message.length}/160 characters
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Contact Group <span className="text-danger">*</span></label>
              <select
                name="groupName"
                value={formData.groupName}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '__new__') {
                    setCreatingNewGroup(true);
                    setFormData(prev => ({ ...prev, groupName: '' }));
                  } else {
                    setCreatingNewGroup(false);
                    setFormData(prev => ({ ...prev, groupName: val }));
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">-- Select group --</option>
                {groups.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
                <option value="__new__">Create new group...</option>
              </select>

              {creatingNewGroup && (
                <Input
                  label="New Group Name"
                  name="groupName"
                  placeholder="Enter new group name"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The campaign will be created with all contacts from the selected group. 
                You can track the sending progress in real-time.
              </p>
            </div>
          </form>
        </CardBody>

        <CardFooter>
          <Button variant="secondary" onClick={() => navigate('/campaigns')}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Create Campaign'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
