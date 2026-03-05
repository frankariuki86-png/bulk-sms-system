// Supabase Edge Function for creating SMS queue entries
// Deploy to: functions/create-sms-queue
// Usage: Called when a campaign is created

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { campaignId, message, groupName } = await req.json();

    // Validate input
    if (!campaignId || !message || !groupName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Get contacts from the group
    const { data: contacts, error: contactError } = await supabase
      .from('contacts')
      .select('phone_number')
      .eq('group_name', groupName);

    if (contactError) {
      throw contactError;
    }

    if (!contacts || contacts.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No contacts found in group' }),
        { status: 400 }
      );
    }

    // Prepare queue entries
    const queueEntries = contacts.map(contact => ({
      campaign_id: campaignId,
      phone_number: contact.phone_number,
      message: message,
      status: 'pending',
    }));

    // Batch insert
    const { data, error } = await supabase
      .from('sms_queue')
      .insert(queueEntries)
      .select();

    if (error) {
      throw error;
    }

    // Update campaign total_sms count
    await supabase
      .from('campaigns')
      .update({ total_sms: contacts.length })
      .eq('id', campaignId);

    return new Response(
      JSON.stringify({
        success: true,
        messagesQueued: data.length,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
