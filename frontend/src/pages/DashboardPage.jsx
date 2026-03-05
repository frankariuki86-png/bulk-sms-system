import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { campaignService } from '../services/campaignService';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/Loading';
import { Alert } from '../components/Alert';
import { formatDistanceToNow } from 'date-fns';

export function DashboardPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalMessages: 0,
    sentMessages: 0,
    failedMessages: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await campaignService.getCampaigns(user.id);
      setCampaigns(data);

      // Calculate stats
      let totalMessages = 0;
      let sentMessages = 0;
      let failedMessages = 0;

      for (const campaign of data) {
        const report = await campaignService.getDeliveryReport(campaign.id);
        totalMessages += campaign.total_sms || 0;
        sentMessages += report.sent || 0;
        failedMessages += report.failed || 0;
      }

      setStats({
        totalCampaigns: data.length,
        totalMessages,
        sentMessages,
        failedMessages,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'gray',
      sending: 'warning',
      completed: 'success',
      paused: 'warning',
    };
    return colors[status] || 'gray';
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardBody>
            <div className="text-gray-600 text-sm font-medium mb-2">Total Campaigns</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalCampaigns}</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-gray-600 text-sm font-medium mb-2">Total Messages</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalMessages.toLocaleString()}</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-gray-600 text-sm font-medium mb-2">Sent Messages</div>
            <div className="text-3xl font-bold text-green-600">{stats.sentMessages.toLocaleString()}</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-gray-600 text-sm font-medium mb-2">Failed Messages</div>
            <div className="text-3xl font-bold text-red-600">{stats.failedMessages.toLocaleString()}</div>
          </CardBody>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card>
        <CardHeader title="Your Campaigns" description="Manage and monitor your SMS campaigns" />
        <CardBody>
          {campaigns.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No campaigns yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map(campaign => (
                <div
                  key={campaign.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition gap-3 sm:gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{campaign.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{campaign.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {campaign.total_sms} messages • Created {formatDistanceToNow(new Date(campaign.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}











































































