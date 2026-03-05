-- Test data for development and testing

-- Clear existing test data (be careful in production!)
DELETE FROM sms_queue WHERE campaign_id IN (
  SELECT id FROM campaigns WHERE name LIKE 'Test%'
);

DELETE FROM campaigns WHERE name LIKE 'Test%';
DELETE FROM contacts WHERE group_name = 'test';

-- Insert test contacts
INSERT INTO contacts (name, phone_number, group_name) VALUES
('Alice Johnson', '+254712345678', 'test'),
('Bob Smith', '+254712345679', 'test'),
('Carol White', '+254712345680', 'test'),
('David Brown', '+254712345681', 'test'),
('Emma Wilson', '+254712345682', 'test'),
('Frank Miller', '+254712345683', 'test'),
('Grace Lee', '+254712345684', 'test'),
('Henry Taylor', '+254712345685', 'test'),
('Ivy Anderson', '+254712345686', 'test'),
('Jack Thomas', '+254712345687', 'test');

-- Insert test marketing contacts
INSERT INTO contacts (name, phone_number, group_name) VALUES
('Lisa Marketing', '+254712345700', 'marketing'),
('Mark Marketing', '+254712345701', 'marketing'),
('Nancy Marketing', '+254712345702', 'marketing'),
('Oscar Marketing', '+254712345703', 'marketing'),
('Patricia Marketing', '+254712345704', 'marketing');

-- Create a test campaign
INSERT INTO campaigns (
  name,
  message,
  status,
  created_by,
  total_sms
) VALUES (
  'Test Campaign',
  'Hello! This is a test message.',
  'draft',
  'test-user-id-here',
  10
);

-- Get campaign ID for next step
-- SELECT id FROM campaigns WHERE name = 'Test Campaign' LIMIT 1;

-- Insert test queue entries (replace CAMPAIGN_ID with actual ID)
-- This will be inserted programmatically in the real flow
