# Bulk SMS System - Quick Reference Card

## 🚀 5-Minute Quick Start

### 1. LOGIN
```
Email: [your-email]
Password: [your-password]
✓ You're in the Dashboard
```

### 2. UPLOAD CONTACTS (CSV Format)
```
CSV Header Row (first line):
Name,Phone

Example:
Name,Phone
John,+254712345678
Jane,+254712345679
```
- Go to **Contacts** → Upload CSV
- Name your group (e.g., "Customers2024")
- Click Upload

### 3. CREATE & SEND CAMPAIGN
- Go to **Create Campaign**
- Enter Campaign Name (e.g., "March Offer")
- Write Message (max 160 characters)
- Select Contact Group
- Click "Create Campaign"
- ✓ Messages start sending automatically

### 4. MONITOR DELIVERY
- **Dashboard** shows real-time stats:
  - Total Messages
  - Sent Messages ✓
  - Failed Messages ✗

---

## 📋 CAMPAIGN CREATION CHECKLIST

Before hitting "Create Campaign":
- [ ] Campaign name is descriptive
- [ ] Message is 160 characters max
- [ ] Message has no spelling mistakes
- [ ] Contact group is correct
- [ ] Group has contacts (not empty)
- [ ] Ready to send now?

---

## 📞 CSV PHONE NUMBER FORMAT

### ✓ CORRECT FORMAT
```
+254712345678    ← Country code required
+256701234567    ← Different country
+233123456789    ← All formats work
```

### ✗ INCORRECT FORMAT
```
0712345678       ← Missing country code
254712345678     ← Missing + sign
+254 712 345678  ← Has spaces (remove them)
254-712-345-678  ← Has dashes (remove them)
```

---

## ⏱️ SYSTEM TIMINGS

| Action | Time |
|--------|------|
| Upload 100 contacts | 1 minute |
| Create campaign | 2 minutes |
| Send 100 SMS | 10-20 minutes |
| Send 1,000 SMS | 30-60 minutes |
| Full delivery report | Same day |

---

## 📊 MESSAGE CHARACTER COUNT

```
60 chars: "Buy now! Get 20% off everything. Use SAVE20. Offer ends Friday!"
         [✓ GOOD - Fits in 1 SMS]

200 chars: "We're thrilled to announce our brand new product collection is now 
           available at all locations nationwide..."
          [✗ BAD - Over 160 chars, need to shorten]
```

### Shorten Long Messages:
- Use abbreviations: "ur" instead of "your"
- Use shortlinks: "bit.ly/offer" instead of full URL
- Remove extra words
- Get straight to the point

---

## 🛠️ QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Can't login" | Check email/password, ask admin |
| "CSV error" | Ensure headers are "Name,Phone" |
| "0 contacts uploaded" | Check CSV has data rows (not just header) |
| "Campaign won't create" | Fill all fields, message under 160 chars |
| "Messages not sending" | Wait 30 mins, refresh Dashboard |

---

## 📱 CONTACT GROUP IDEAS

Organize your contacts by:
- **Customer Type**: "VIP", "Regular", "Trial"
- **Date**: "Jan2024", "NewCustomers2024"
- **Interest**: "Electronics", "Fashion", "Home"
- **Status**: "Active", "Inactive", "Leads"

---

## ✉️ MESSAGE TEMPLATES

### Promotion Message (160 chars)
```
"Limited time! 30% off everything. Use code SAVE30. 
Shop now: [link]. Valid today only!"
```

### Reminder Message (160 chars)
```
"Reminder: Appointment tomorrow at 2 PM. 
Reply CONFIRM to confirm. For changes, call [number]"
```

### Announcement (160 chars)
```
"🎉 New product alert! Check out our latest [product]. 
Available now at [link]. Exclusive prices today!"
```

### Feedback Request (160 chars)
```
"We'd love your feedback! How was your experience? 
Reply with your rating (1-5). Thank you!"
```

---

## 🔒 IMPORTANT REMINDERS

✓ **DO:**
- Keep CSV files organized with clear names
- Test messages before large sends
- Name campaigns with dates (helps tracking)
- Save backup of contact lists
- Check failed message report

✗ **DON'T:**
- Send messages without permission
- Send at 2 AM (people don't like that)
- Edit message after sending
- Forget to select correct group
- Assume all phone numbers work

---

## 📍 NAVIGATION QUICK ACCESS

```
┌─ DASHBOARD
│  └─ See campaign overview & stats
│
├─ CONTACTS
│  └─ Upload contacts from CSV
│  └─ Manage contact groups
│
├─ CREATE CAMPAIGN
│  └─ Send new SMS
│
└─ PROFILE
   └─ Account settings
```

---

## 🎯 STEP-BY-STEP: Your First Campaign

### Step 1: Prepare Contacts (5 min)
```
Create CSV file:
Name,Phone
Ahmad,+254712345678
Fatima,+254712345679
```

### Step 2: Upload Contacts (3 min)
```
Contacts → Upload CSV
Choose file → Group: "FirstTest"
Review preview → Upload
```

### Step 3: Create Campaign (2 min)
```
Create Campaign
Name: "First Campaign"
Message: "Hello! Test message."
Group: "FirstTest"
Create Campaign
```

### Step 4: Monitor (Real-time)
```
Dashboard → Watch status change
Status: sending → completed
Check green "Sent" number increase
```

---

## 📞 PHONE NUMBER VALIDATION

Your phone numbers MUST have:
- ✓ Country code (e.g., +254 for Kenya)
- ✓ Area code
- ✓ Full number
- ✓ No spaces or special characters

### Examples:
- Kenya: +254712345678
- Uganda: +256701234567
- Ghana: +233123456789
- Nigeria: +2348012345678

---

## 💡 PRO TIPS

1. **Batch Similar Sends**: Group similar messages in same campaign
2. **Time Your Sends**: Send during business hours (9 AM - 6 PM)
3. **Test First**: Create small test group before large campaign
4. **Use Shortlinks**: Shorten URLs with bit.ly or TinyURL
5. **Track Campaigns**: Include unique code in message to track response
6. **Monitor Success**: Check delivery report daily
7. **Listen to Replies**: Note common questions for FAQ

---

## 🆘 WHEN TO CONTACT ADMIN

- Account issues
- Password reset
- SMS gateway problems  
- Feature requests
- System errors / crashes
- Unusual failure rates
- Bulk data issues

---

## 📈 KEY METRICS TO WATCH

| Metric | Target | Warning |
|--------|--------|---------|
| Success Rate | 95%+ | Below 80% |
| Send Time | 1 hour | Over 2 hours |
| Failed Messages | <5% | Over 20% |

---

## 🔐 ACCOUNT SECURITY

- Keep email/password secure
- Don't share login credentials
- Logout when not using
- Report suspicious activity
- Update password regularly

---

**Last Updated**: March 2026  
**Version**: 1.0  
**Questions?** Contact your system administrator
