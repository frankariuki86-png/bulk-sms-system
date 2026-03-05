import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { LoadingSpinner } from '../components/Loading';

export function AccountSettingsPage() {
  const { user, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Profile update state
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      await updateProfile({
        full_name: profileData.fullName,
        phone: profileData.phone,
      });
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError('All password fields are required');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setError('New password must be different from current password');
      return;
    }

    try {
      setLoading(true);
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <Card>
        <CardHeader
          title="Account Settings"
          description="Manage your account information and security"
        />
        <CardBody>
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 font-medium rounded-lg transition text-sm sm:text-base ${
                activeTab === 'profile'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Update Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-4 py-2 font-medium rounded-lg transition text-sm sm:text-base ${
                activeTab === 'password'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Change Password
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile} className="space-y-4 sm:space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>Email:</strong> {user?.email} (cannot be changed)
                </p>
              </div>

              <Input
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                value={profileData.fullName}
                onChange={handleProfileChange}
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="e.g., +234812345678"
                value={profileData.phone}
                onChange={handleProfileChange}
              />

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700">
                  Last updated: {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Never'}
                </p>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? <LoadingSpinner size="sm" /> : 'Save Profile'}
              </Button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handleChangePassword} className="space-y-4 sm:space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-orange-800">
                  <strong>Security:</strong> Make sure to use a strong password with a mix of uppercase, lowercase, numbers, and symbols.
                </p>
              </div>

              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />

              <Input
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />

              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Password Requirements:</strong>
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 mt-2 space-y-1">
                  <li>Minimum 6 characters</li>
                  <li>Cannot be the same as your current password</li>
                  <li>Use a mix of letters, numbers, and symbols for better security</li>
                </ul>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? <LoadingSpinner size="sm" /> : 'Change Password'}
              </Button>
            </form>
          )}
        </CardBody>
      </Card>

      {/* Account Info Card */}
      <Card>
        <CardHeader title="Account Information" />
        <CardBody>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Email Address</span>
              <span className="text-xs sm:text-sm text-gray-900">{user?.email}</span>
            </div>
            <div className="border-t border-gray-200"></div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Account Created</span>
              <span className="text-xs sm:text-sm text-gray-900">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="border-t border-gray-200"></div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Account Status</span>
              <span className="text-xs sm:text-sm">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Active
                </span>
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
