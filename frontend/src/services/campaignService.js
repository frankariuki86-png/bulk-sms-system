import { supabase } from '../lib/supabase';

export const campaignService = {
  // Create campaign
  async createCampaign(data) {
    const { data: result, error } = await supabase
      .from('campaigns')
      .insert([{
        name: data.name,
        message: data.message,
        group_name: data.group_name,
        created_by: data.userId,
        total_sms: data.totalSms || 0,
      }])
      .select();
    
    if (error) throw error;
    return result[0];
  },

  // Get all campaigns for user
  async getCampaigns(userId) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get single campaign
  async getCampaign(id) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update campaign status
  async updateCampaignStatus(id, status) {
    const updateData = { status };
    
    if (status === 'sending') {
      updateData.started_at = new Date().toISOString();
    } else if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('campaigns')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Get campaign statistics
  async getCampaignStats(campaignId) {
    const { data, error } = await supabase
      .from('campaign_stats')
      .select('*')
      .eq('campaign_id', campaignId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get campaign delivery report
  async getDeliveryReport(campaignId) {
    const { data, error } = await supabase
      .from('sms_queue')
      .select('status, COUNT(*) as count')
      .eq('campaign_id', campaignId)
      .group_by('status');
    
    if (error) throw error;
    
    const report = {
      pending: 0,
      sent: 0,
      failed: 0,
      bounced: 0,
    };
    
    data?.forEach(row => {
      report[row.status] = row.count;
    });
    
    return report;
  },

  // Delete campaign
  async deleteCampaign(id) {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};
