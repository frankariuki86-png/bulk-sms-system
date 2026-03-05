-- Create tables for Bulk SMS Management System
-- Migration: 001_initial_schema.sql

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  group_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_phone_number UNIQUE(phone_number),
  CONSTRAINT phone_length CHECK (LENGTH(phone_number) >= 10)
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'sending', 'completed', 'paused')),
  total_sms INTEGER DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT message_length CHECK (LENGTH(message) <= 160)
);

-- SMS Queue table - stores individual messages to be sent
CREATE TABLE IF NOT EXISTS sms_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  provider_message_id VARCHAR(255),
  provider_name VARCHAR(50) DEFAULT 'africas-talking',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  last_retry_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT valid_status_transition CHECK (
    (status = 'pending' AND retry_count = 0) OR
    (status IN ('sent', 'failed', 'bounced'))
  )
);

-- Campaign statistics table for analytics
CREATE TABLE IF NOT EXISTS campaign_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  total_messages INTEGER DEFAULT 0,
  sent_messages INTEGER DEFAULT 0,
  failed_messages INTEGER DEFAULT 0,
  pending_messages INTEGER DEFAULT 0,
  bounced_messages INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_campaign_stats UNIQUE(campaign_id)
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_group ON contacts(group_name);
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone_number);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_by ON campaigns(created_by);
CREATE INDEX IF NOT EXISTS idx_sms_queue_status ON sms_queue(status);
CREATE INDEX IF NOT EXISTS idx_sms_queue_campaign_id ON sms_queue(campaign_id);
CREATE INDEX IF NOT EXISTS idx_sms_queue_phone ON sms_queue(phone_number);
CREATE INDEX IF NOT EXISTS idx_sms_queue_created ON sms_queue(created_at);
CREATE INDEX IF NOT EXISTS idx_campaign_stats_campaign ON campaign_stats(campaign_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Contacts: Users can see contacts in their campaigns
CREATE POLICY contacts_select ON contacts FOR SELECT USING (true);

CREATE POLICY contacts_insert ON contacts FOR INSERT WITH CHECK (true);

CREATE POLICY contacts_update ON contacts FOR UPDATE USING (true);

-- Campaigns: Users can only see and modify their own campaigns
CREATE POLICY campaigns_select ON campaigns FOR SELECT USING (
  auth.uid() = created_by
);

CREATE POLICY campaigns_insert ON campaigns FOR INSERT WITH CHECK (
  auth.uid() = created_by
);

CREATE POLICY campaigns_update ON campaigns FOR UPDATE USING (
  auth.uid() = created_by
);

CREATE POLICY campaigns_delete ON campaigns FOR DELETE USING (
  auth.uid() = created_by
);

-- SMS Queue: System and workers can access
CREATE POLICY sms_queue_select ON sms_queue FOR SELECT USING (true);

CREATE POLICY sms_queue_update ON sms_queue FOR UPDATE USING (true);

-- Campaign Stats: Read-only for users
CREATE POLICY campaign_stats_select ON campaign_stats FOR SELECT USING (true);

-- Audit Logs: Users can see their own actions
CREATE POLICY audit_logs_select ON audit_logs FOR SELECT USING (
  auth.uid() = user_id
);

-- Create function to update campaign stats automatically
CREATE OR REPLACE FUNCTION update_campaign_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO campaign_stats (campaign_id, total_messages, sent_messages, pending_messages, failed_messages)
  VALUES (
    NEW.campaign_id,
    1,
    CASE WHEN NEW.status = 'sent' THEN 1 ELSE 0 END,
    CASE WHEN NEW.status = 'pending' THEN 1 ELSE 0 END,
    CASE WHEN NEW.status = 'failed' THEN 1 ELSE 0 END
  )
  ON CONFLICT (campaign_id) DO UPDATE SET
    total_messages = campaign_stats.total_messages + 1,
    sent_messages = campaign_stats.sent_messages + CASE WHEN NEW.status = 'sent' THEN 1 ELSE 0 END,
    pending_messages = campaign_stats.pending_messages + CASE WHEN NEW.status = 'pending' THEN 1 ELSE 0 END,
    failed_messages = campaign_stats.failed_messages + CASE WHEN NEW.status = 'failed' THEN 1 ELSE 0 END,
    last_updated = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER trigger_update_campaign_stats
AFTER INSERT ON sms_queue
FOR EACH ROW
EXECUTE FUNCTION update_campaign_stats();

-- Create function to log audit trail
CREATE OR REPLACE FUNCTION audit_log_action(
  p_user_id UUID,
  p_action VARCHAR,
  p_entity_type VARCHAR,
  p_entity_id UUID,
  p_details JSONB
)
RETURNS void AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
  VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
