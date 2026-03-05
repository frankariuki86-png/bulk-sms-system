import { supabase } from '../lib/supabase';
import { normalizePhoneNumber, validatePhoneBatch } from '../utils/phoneValidation';

export const contactService = {
  // Get all contacts
  async getContacts(groupName = null) {
    let query = supabase.from('contacts').select('*');
    
    if (groupName) {
      query = query.eq('group_name', groupName);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Upload contacts from CSV with validation
  async uploadContacts(contacts, groupName) {
    // Validate and normalize phones first
    const phones = contacts.map(c => c.phone_number);
    const phoneValidation = validatePhoneBatch(phones);

    if (phoneValidation.invalid.length > 0) {
      const errors = phoneValidation.invalid
        .map(inv => `Row ${inv.index + 1}: ${inv.original} - ${inv.error}`)
        .join('\n');
      throw new Error(`Invalid phone numbers:\n${errors}`);
    }

    // Prepare validated contacts with normalized phones
    const validatedContacts = phoneValidation.valid.map(valid => {
      const originalContact = contacts[valid.index];
      return {
        name: (originalContact.name || '').trim(),
        phone_number: valid.normalized,
        group_name: groupName || 'default',
      };
    }).filter(c => c.name && c.phone_number);

    if (validatedContacts.length === 0) {
      throw new Error('No valid contacts found in file');
    }

    // Insert in batches to avoid timeout
    const batchSize = 100;
    const results = [];

    for (let i = 0; i < validatedContacts.length; i += batchSize) {
      const batch = validatedContacts.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('contacts')
        .insert(batch)
        .select();

      if (error) {
        // Handle duplicate phone numbers gracefully
        if (error.message?.includes('unique')) {
          throw new Error(`Some phone numbers already exist in the system. Please check for duplicates.`);
        }
        throw error;
      }
      results.push(...data);
    }

    return results;
  },

  // Get contacts by group
  async getContactsByGroup(groupName) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('group_name', groupName);
    
    if (error) throw error;
    return data || [];
  },

  // Get contact groups
  async getContactGroups() {
    const { data, error } = await supabase
      .from('contacts')
      .select('group_name');
    
    if (error) throw error;
    
    // Get unique group names
    const uniqueGroups = [...new Set(data?.map(d => d.group_name).filter(Boolean) || [])];
    return uniqueGroups;
  },

  // Delete contact
  async deleteContact(id) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Delete contact group
  async deleteContactGroup(groupName) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('group_name', groupName);
    
    if (error) throw error;
  },

  // Get contact count by group
  async getContactCountByGroup(groupName) {
    const { count, error } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('group_name', groupName);
    
    if (error) throw error;
    return count || 0;
  },
};
