# Bulk SMS Management System - Admin User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Login & Authentication](#login--authentication)
3. [Dashboard Overview](#dashboard-overview)
4. [Managing Contacts](#managing-contacts)
5. [Creating & Sending Campaigns](#creating--sending-campaigns)
6. [Monitoring Delivery](#monitoring-delivery)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## Getting Started

### System Requirements
- **Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Internet**: Stable internet connection required
- **Data**: CSV file with contact information (if uploading bulk contacts)

### Accessing the System
1. Open the application URL provided by your administrator
2. You should see the login screen
3. If this is your first time, ensure your account has been created by your administrator

---

## Login & Authentication

### How to Log In

1. **Enter Your Email Address**
   - Navigate to the login page
   - Enter the email address that was provided to you during account setup

2. **Enter Your Password**
   - Type your password in the password field
   - Passwords are case-sensitive

3. **Click Login**
   - Click the "Login" button to access the system
   - If credentials are correct, you'll be redirected to the Dashboard

### Account Access
- **First Time Login**: Contact your administrator if you don't have login credentials
- **Forgot Password**: Contact your administrator to reset your password
- **Session Timeout**: You'll be asked to log in again after a period of inactivity

---

## Dashboard Overview

### What You See on the Dashboard

The Dashboard is your main control center with four key metrics:

#### **1. Total Campaigns**
- Shows the total number of SMS campaigns you've created
- Includes all campaigns (completed, draft, sending, etc.)

#### **2. Total Messages**
- Displays the cumulative number of SMS messages across all your campaigns
- Example: If you sent 2 campaigns with 100 messages each, this shows 200

#### **3. Sent Messages**
- Shows how many messages have been successfully delivered
- Updates in real-time as messages are sent
- Displayed in green to indicate success

#### **4. Failed Messages**
- Displays messages that encountered delivery errors
- Displayed in red for easy identification
- May include wrong phone numbers or network issues

### Campaign List

Below the statistics, you'll see a list of all your campaigns with:
- **Campaign Name**: The name you gave your campaign
- **Message Preview**: First part of the SMS message
- **Total Messages**: Number of SMS in this campaign
- **Status**: Current state (draft, sending, completed, paused)
- **Creation Date**: When the campaign was created

**Statuses Explained:**
- **Draft**: Campaign created but not sent yet
- **Sending**: Campaign is currently being sent
- **Completed**: All messages have been processed
- **Paused**: Campaign was paused during sending

---

## Managing Contacts

### Overview

Contacts are the recipients of your SMS campaigns. You organize them into groups to make it easy to target specific audiences. You can:
- Upload contacts from a CSV file
- Organize contacts into named groups
- View how many contacts are in each group
- Delete entire contact groups

### Step-by-Step: Upload Contacts via CSV

#### **Step 1: Navigate to Contacts Page**
1. Look for "Contacts" in the main navigation menu
2. Click on "Contacts" to go to the Contacts management page

#### **Step 2: Prepare Your CSV File**

Your CSV file must have exactly two columns with these headers:
```
Name,Phone
```

**Example CSV file:**
```csv
Name,Phone
John Doe,+254712345678
Jane Smith,+254712345679
Bob Johnson,+254712345680
Alice Williams,+254712345681
Charlie Brown,+254712345682
```

**Important Guidelines:**
- **First Row**: Must contain column headers: "Name" and "Phone"
- **Phone Format**: Use international format (e.g., +254712345678)
- **Country Code**: Always include the country code
- **No Spaces**: Keep phone numbers without spaces or dashes
- **File Format**: Use .csv (comma-separated values), not Excel (.xlsx)

**How to Create a CSV File:**
- **Windows**: Use Notepad, type the data, and save as `.csv`
- **Mac**: Use TextEdit or Numbers and export as CSV
- **Spreadsheet**: Create in Excel/Google Sheets and download as CSV
- **Online Tool**: Use a CSV generator if needed

#### **Step 3: Enter Group Name**
1. In the "Group Name" field, enter a name for this contact group
2. Examples: "Loyal Customers", "March Promotions", "VIP Members", "Newsletter Subscribers"
3. Choose descriptive names to make it easy to remember later

#### **Step 4: Upload File**
1. Click the "Choose File" button
2. Browse and select your CSV file from your computer
3. The system will display a preview of the first 5 rows

#### **Step 5: Review Preview**
- Review the preview data to ensure it looks correct
- Check that names and phone numbers are properly formatted
- If something looks wrong, click "Cancel" and fix your CSV file

#### **Step 6: Confirm Upload**
- Once satisfied with the preview, click the "Upload" button
- Wait for the confirmation message
- You'll see: "Successfully uploaded [number] contacts to '[group name]'"

### Step-by-Step: View Contact Groups

1. Navigate to the Contacts page
2. Scroll down to see all your contact groups
3. Each group shows:
   - **Group Name**: Name of the contact group
   - **Contact Count**: How many contacts are in this group (e.g., "125 contacts")
   - **Delete Button**: Option to delete the entire group

### Step-by-Step: Delete a Contact Group

⚠️ **WARNING**: This action cannot be undone. All contacts in the group will be permanently deleted.

1. Find the contact group you want to delete
2. Click the "Delete Group" button next to the group name
3. A confirmation dialog will appear asking: "Are you sure you want to delete all contacts in '[group name]'?"
4. Click "Yes, Delete" to confirm or "Cancel" to keep the group
5. The group and all its contacts will be permanently removed

---

## Creating & Sending Campaigns

### Overview

A campaign is a single SMS send operation targeting a specific contact group. Once you create a campaign, the system automatically manages:
- Queuing the messages
- Sending them through the SMS gateway
- Tracking delivery status
- Retrying failed messages

### Step-by-Step: Create a Campaign

#### **Step 1: Navigate to Create Campaign**
1. Click on "Create Campaign" in the navigation menu
2. You'll see a form with three main fields

#### **Step 2: Enter Campaign Name**
1. In the "Campaign Name" field, enter a descriptive name
2. Examples:
   - "March 2024 Promotion"
   - "Birthday Special Discount"
   - "Product Launch Announcement"
   - "Monthly Newsletter"
3. This name helps you identify the campaign later in your dashboard

#### **Step 3: Compose Your SMS Message**

1. **Important Limitation**: SMS messages have a 160-character limit
2. In the message field, type or paste your SMS content
3. **Character Counter**: The system shows how many characters you've used (e.g., "45/160")
4. **Tips for Writing SMS**:
   - Keep it short and clear
   - Use simple language
   - Include a call-to-action if needed
   - Avoid special characters when possible

**Example Messages:**
```
"Hi, we have a special 20% discount for you! Use code SAVE20. Offer ends Friday."

"Reminder: Your appointment is tomorrow at 2 PM. Reply CONFIRM to confirm."

"New product launch! Check out our latest collection at www.example.com"
```

#### **Step 4: Select Contact Group**

1. Click the "Contact Group" dropdown menu
2. **Option A - Select Existing Group**:
   - Choose a group you've already uploaded (e.g., "VIP Customers")
   - The system will send to all contacts in that group

3. **Option B - Create New Group on the Fly**:
   - Click on "Create new group..." option
   - Enter the new group name when prompted
   - Then upload contacts for this group first (go back to Contacts page)

3. **Group Preview**: After selecting a group, you'll see:
   - Group name
   - Number of contacts in the group
   - Note confirming the message will be sent to all contacts in that group

#### **Step 5: Review Campaign Details**

Before submitting, verify:
- ✓ Campaign name is meaningful
- ✓ Message is 160 characters or less
- ✓ Correct contact group is selected
- ✓ Message content is accurate with no typos

#### **Step 6: Submit Campaign**

1. Click the "Create Campaign" button
2. **Processing**: The system will:
   - Create the campaign record
   - Queue all messages for the selected group
   - Begin sending immediately
   - Return you to the dashboard

3. **Confirmation**: You'll see a success message:
   - "Campaign created with [number] messages"
   - Redirected to Dashboard automatically

#### **Step 7: Monitor Progress**

1. Return to Dashboard
2. Find your newly created campaign in the campaign list
3. See the status: typically "sending" initially
4. Watch the progress:
   - Campaign moves through "sending" status
   - Finally reaches "completed" when all messages are processed

---

## Monitoring Delivery

### Dashboard Statistics

The dashboard automatically updates to show:
- **Total Messages**: All messages across all campaigns
- **Sent Messages**: Successfully delivered (green number)
- **Failed Messages**: Delivery errors (red number)

### Campaign Status Tracking

#### **Real-Time Monitoring**
1. Open the Dashboard
2. Look at your campaign in the list
3. Status updates as messages are processed
4. Timestamps show when each campaign was created

#### **Understanding Campaign Statuses**

| Status | Meaning | Action |
|--------|---------|--------|
| **Draft** | Campaign created but not yet queued | Click to view details |
| **Sending** | Messages are currently being sent | Wait for completion |
| **Completed** | All messages processed | View delivery report |
| **Paused** | Campaign was manually paused | Resume or cancel |

### Delivery Reports

#### **How to Access Delivery Report**
1. From the Dashboard, locate the campaign
2. Click on the campaign name or status badge
3. View detailed report showing:
   - Total messages
   - Successfully sent count
   - Failed count
   - Percentage success rate
   - List of failed messages (with reasons)

#### **Success Rates**
- **95%+ Success**: Most messages delivered successfully
- **50-95% Success**: Some issues with certain phone numbers
- **Below 50% Success**: Verify contact phone numbers are correct

#### **Common Failure Reasons**
- **Invalid phone number**: Wrong format or country code
- **Network issues**: Recipient network was temporarily unavailable
- **Blocked number**: Recipient's carrier blocked the number
- **User opted out**: Recipient previously unsubscribed

---

## Troubleshooting

### Login Issues

**Problem**: "Invalid email or password"
- ✓ Check that email is spelled correctly
- ✓ Verify CAPS LOCK is off (passwords are case-sensitive)
- ✓ Contact your administrator to reset password

**Problem**: "Account not found"
- ✓ Verify you're using the correct email address
- ✓ Contact your administrator to check if your account exists

### Contact Upload Issues

**Problem**: "CSV must contain 'Name' and 'Phone' columns"
- ✓ Ensure your CSV has headers exactly: "Name" and "Phone"
- ✓ Verify headers are in the first row
- ✓ Ensure you're using a real CSV file, not Excel

**Problem**: "Error parsing CSV"
- ✓ Re-save your file as .csv format (not .xlsx)
- ✓ Check for special characters in the CSV
- ✓ Ensure phone numbers are complete and correct

**Problem**: "0 contacts uploaded"
- ✓ Verify your CSV has data rows (not just headers)
- ✓ Check that phone numbers are in the correct format
- ✓ Make sure columns are correctly named

### Campaign Creation Issues

**Problem**: "All fields are required"
- ✓ Enter a Campaign Name
- ✓ Type an SMS Message
- ✓ Select a Contact Group

**Problem**: "Message must be 160 characters or less"
- ✓ Your message is too long
- ✓ Delete unnecessary words or abbreviate
- ✓ Consider using URL shorteners for links

**Problem**: "No contacts found in selected group"
- ✓ Your selected group has no contacts
- ✓ Go to Contacts page and upload contacts to this group
- ✓ Select a different group that has contacts

### Sending Issues

**Problem**: Campaign shows "sending" but no progress
- ✓ Messages are queued and processing
- ✓ Large campaigns take time (batch processing)
- ✓ Wait 30 minutes and refresh the page

**Problem**: High failure rate (50%+ messages failed)
- ✓ Check if phone numbers are in correct format
- ✓ Verify country codes are included
- ✓ Contact your administrator about SMS gateway issues

**Problem**: Campaign doesn't appear in dashboard
- ✓ Refresh the page (F5 or Ctrl+R)
- ✓ Campaign may still be processing
- ✓ Wait 1-2 minutes and refresh again

---

## Best Practices

### Contact Management Best Practices

1. **Organize by Segment**
   - Create separate groups for different audience types
   - Examples: "Premium Members", "Trial Users", "Inactive Customers"
   - Makes targeting easier and improves campaign effectiveness

2. **Keep Data Clean**
   - Remove duplicate phone numbers
   - Verify phone numbers are complete
   - Use consistent country code formatting
   - Update contacts regularly with new numbers

3. **Regular Reviews**
   - Review contact groups monthly
   - Remove inactive or invalid numbers
   - Add new contacts as they join
   - Delete unused groups to keep organized

4. **Backup Your Data**
   - Keep a copy of your contact lists
   - Store in a safe location
   - Helps if you need to re-upload later

### Campaign Best Practices

1. **Compose Clear Messages**
   - Get to the point immediately (first 30 characters matter most)
   - Include a clear call-to-action
   - Avoid ALL CAPS (comes across as yelling)
   - Test message on different phones if possible

2. **Timing Considerations**
   - Send business messages during business hours
   - Avoid late night or early morning sends
   - Consider time zones if sending to multiple countries
   - Avoid sending on holidays when people are less likely to engage

3. **Campaign Naming**
   - Use descriptive names with date
   - Examples: "Jan2024_Promo", "Birthday_Special_2024"
   - Makes it easy to track campaigns historically

4. **Testing**
   - Send test campaigns to a small group first
   - Verify message content displays correctly
   - Check recipient experience on their phone
   - Review delivery reports before large sends

5. **Compliance & Legality**
   - Ensure recipients opted in to receive messages
   - Include a way for people to unsubscribe (if required by law)
   - Follow local SMS regulations
   - Don't send to numbers without permission

6. **Frequency**
   - Don't overwhelm recipients with too many messages
   - Space out campaigns appropriately (weekly, bi-weekly, monthly)
   - Monitor unsubscribe rates
   - Respond to opt-out requests promptly

### Message Length Tips

Since SMS is limited to 160 characters:

**Poor (168 characters)**: ❌
```
"Hi! We're excited to announce our brand new product line available at all our 
locations. Come visit us today for exclusive launch specials!"
```

**Good (158 characters)**: ✓
```
"New product line available NOW! Visit us for exclusive launch specials. 
Details at www.example.com"
```

**Better (145 characters)**: ✓
```
"Exciting news! New products just launched. Get exclusive specials today only. 
Learn more: bit.ly/newproducts"
```

---

## Quick Reference

### Navigation Menu Items

| Menu Item | Purpose |
|-----------|---------|
| **Dashboard** | View overview and monitor campaigns |
| **Contacts** | Upload and manage contact groups |
| **Create Campaign** | Send new SMS campaign |
| **Profile** | View account information |
| **Logout** | Exit the system |

### Common Tasks & Time Required

| Task | Time |
|------|------|
| Upload 1,000 contacts | 2-3 minutes |
| Create a campaign | 3-5 minutes |
| Send 1,000 SMS messages | 5-30 minutes (system processes automatically) |
| View delivery report | 1-2 minutes |

### Support & Help

- **Administrator Help**: Contact your system administrator
- **Account Issues**: Email with account details
- **System Problems**: Document the issue and contact support
- **Feature Requests**: Submit through your administrator

---

## Glossary of Terms

| Term | Definition |
|------|-----------|
| **Campaign** | A single SMS sending operation to a contact group |
| **Contact** | A phone number and name of an SMS recipient |
| **Contact Group** | A collection of related contacts organized together |
| **CSV File** | A data file format with rows of data separated by commas |
| **Delivery Report** | Detailed status of each message in a campaign |
| **SMS** | Short Message Service (text message) |
| **Character Limit** | Maximum 160 characters per SMS message |
| **Queue** | System's list of messages waiting to be sent |
| **Batch Process** | Sending messages in groups rather than individually |
| **Status** | Current state of a campaign (draft, sending, completed) |

---

## Frequently Asked Questions (FAQ)

### Q: How long does it take to send messages?
**A:** Most messages send within 30-60 minutes depending on:
- Number of messages in the campaign
- Current network load
- Batch processing queue
- SMS gateway availability

### Q: Can I edit a campaign after creating it?
**A:** No, once created and queued, campaigns cannot be edited. Create a new campaign with the correct details.

### Q: What happens to failed messages?
**A:** Failed messages are logged in the delivery report. You can see the reason for each failure and upload those contacts with corrected numbers to retry.

### Q: Can I delete a campaign?
**A:** Campaigns are kept for historical records. You can view the complete history of all campaigns sent.

### Q: How many contacts can I upload at once?
**A:** You can upload multiple contacts. Recommended: up to 10,000 per file for best performance.

### Q: Is there a limit on message length?
**A:** Yes, exactly 160 characters per SMS message. Longer messages require multiple SMS messages, increasing cost.

### Q: Can I schedule campaigns for later?
**A:** The current version sends campaigns immediately upon creation. Plan to create campaigns when ready to send.

### Q: What phone formats are accepted?
**A:** International format with country code: +[country code][phone number]
Example: +254712345678 (Kenya), +256701234567 (Uganda)

### Q: Can I add a signature to my messages?
**A:** Yes, include it in your message content within the 160-character limit.

### Q: What if a customer replies to my SMS?
**A:** Replies may not be monitored by default. Check with your administrator about reply handling.

---

## Document Version
- **Version**: 1.0
- **Last Updated**: March 2026
- **Author**: System Administrator
- **Status**: Active

---

**For Support**: Contact your system administrator or designated support team.
