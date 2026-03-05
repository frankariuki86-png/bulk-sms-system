import { supabase } from '../lib/supabase';

export const queueService = {
  // Get pending messages for campaign
  async getPendingMessages(campaignId, limit = 50) {
    const { data, error } = await supabase
      .from('sms_queue')
      .select('*')
      .eq('campaign_id', campaignId)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  // Get failed messages for retry
  async getFailedMessages(limit = 50) {
    const { data, error } = await supabase
      .from('sms_queue')
      .select('*')
      .eq('status', 'failed')
      .lt('retry_count', supabase.raw('max_retries'))
      .order('last_retry_at', { ascending: true })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  // Update message status
  async updateMessageStatus(id, status, data = {}) {
    const updateData = {
      status,
      last_retry_at: new Date().toISOString(),
      ...data,
    };

    if (status === 'sent') {
      updateData.sent_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('sms_queue')
      .update(updateData)
      .eq('id', id);
    
    if (error) throw error;
  },

  // Increment retry count
  async incrementRetryCount(id) {
    const { error } = await supabase.rpc(
      'increment_retry',
      { message_id: id }
    );
    
    if (error) throw error;
  },

  // Bulk create queue entries from contacts
  async createQueueEntriesForCampaign(campaignId, contacts, message) {
    const queueEntries = contacts.map(contact => ({
      campaign_id: campaignId,
      phone_number: contact.phone_number,
      message,
      status: 'pending',
    }));

    // Batch insert
    const batchSize = 100;
    const results = [];

    for (let i = 0; i < queueEntries.length; i += batchSize) {
      const batch = queueEntries.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('sms_queue')
        .insert(batch)
        .select();

      if (error) throw error;
      results.push(...data);
    }

    return results;
  },

  // Get queue stats
  async getQueueStats(campaignId) {
    const { data, error } = await supabase
      .from('sms_queue')
      .select('status, COUNT(*) as count')
      .eq('campaign_id', campaignId)
      .group_by('status');
    
    if (error) throw error;

    const stats = {
      pending: 0,
      sent: 0,
      failed: 0,
      bounced: 0,
    };

    data?.forEach(row => {
      stats[row.status] = row.count;
    });

    return stats;
  },
};
