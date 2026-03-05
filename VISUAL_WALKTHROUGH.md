# Bulk SMS Admin Dashboard - Visual Walkthrough Guide

## Complete Step-by-Step with Screenshots Description

---

## 📖 SECTION 1: LOGIN PAGE WALKTHROUGH

### What You See When You First Open the System

**Screen Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│         LOGIN TO SMS SYSTEM             │
│                                         │
│  Email Address:  [________________]     │
│                                         │
│  Password:       [________________]     │
│                                         │
│         [     LOGIN     ]               │
│                                         │
│  Don't have an account?                 │
│  Contact your administrator             │
│                                         │
└─────────────────────────────────────────┘
```

### Steps to Login:

1. **Look for the Email Field**
   - Field labeled "Email Address" at the top
   - Click inside the white box
   - Type your email slowly and carefully
   - Example: user@company.com

2. **Look for the Password Field**
   - Field labeled "Password" below the email
   - Click inside the white box
   - Type your password (characters will show as dots ●●●●)
   - Make sure CAPS LOCK is OFF

3. **Click Login Button**
   - Blue button labeled "LOGIN" below the password field
   - Click it with your mouse or press Enter key
   - System will verify your credentials

4. **Wait for Loading**
   - You'll see a loading spinner briefly
   - Give it 3-5 seconds to process

5. **Success!**
   - You'll be automatically taken to the Dashboard
   - If login fails, you'll see a red error message
   - Check email/password and try again

---

## 📊 SECTION 2: DASHBOARD OVERVIEW WALKTHROUGH

### What You See After Login

**Full Dashboard Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  SMS BULK SENDING SYSTEM                           [Profile] │
│  ────────────────────────────────────────────────────────── │
│                                                             │
│  📧 Contacts  | 📢 Create Campaign  | 📊 Dashboard         │
│                                                             │
│  ──────────────────────────────────────────────────────     │
│                                                             │
│  STATISTICS CARDS:                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Campaigns│ │ Total    │ │ Sent     │ │ Failed   │      │
│  │    5     │ │ Messages │ │ Messages │ │ Messages │      │
│  │          │ │  2,500   │ │  2,350   │ │    150   │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  ACTIVE CAMPAIGNS:                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Campaign Name       │ Message Preview  │ Status: ✓  │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ March Newsletter    │ Hello! Check our...│ Completed  │   │
│  │ Birthday Offer      │ Special offer 20%... │ Sending   │   │
│  │ Product Launch      │ New product alert!... │ Sending   │   │
│  │ Weekly Update       │ This week's news...│ Completed  │   │
│  │ Spring Sale         │ Limited time only... │ Completed  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Key Areas to Understand:

#### **1. Statistics Cards** (Top Section)
- **Total Campaigns**: Shows "5" - you've created 5 campaigns
- **Total Messages**: Shows "2,500" - total SMS across all campaigns
- **Sent Messages**: Shows "2,350" in GREEN - successfully delivered
- **Failed Messages**: Shows "150" in RED - delivery failed

#### **2. Campaign List** (Bottom Section)
Shows a table of all your campaigns with:
- **Campaign Name**: Left column - name you gave it
- **Message Preview**: Middle column - first line of the message
- **Total Messages**: Number of SMS in that campaign
- **Created Date**: When you created it
- **Status Badge**: Right side showing current state

#### **3. Navigation Menu** (Top Left)
- **Dashboard**: Currently viewing (highlighted)
- **Contacts**: To upload and manage contacts
- **Create Campaign**: To send new SMS

#### **4. Profile Menu** (Top Right)
- Click your name or avatar
- See account info
- Option to logout

### Understanding Campaign Statuses:

| Status | Color | Meaning | What To Do |
|--------|-------|---------|-----------|
| **Completed** | Green ✓ | All messages sent | View final report |
| **Sending** | Orange/Blue ⟳ | Currently sending | Wait for completion |
| **Draft** | Gray | Not yet queued | Review or delete |
| **Paused** | Yellow ⏸ | Paused during send | Resume or stop |

---

## 📱 SECTION 3: CONTACTS PAGE WALKTHROUGH

### What You See on Contacts Page

**Contacts Page Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  MANAGE CONTACTS                                            │
│  ────────────────────────────────────────────────────────── │
│                                                             │
│  UPLOAD CONTACTS:                                          │
│                                                             │
│  Group Name: [________________]                            │
│                                                             │
│  Select CSV File: [Choose File] ◄─ Click here to select   │
│                                                             │
│  File Preview (shows first 5 rows if selected):           │
│  ┌────────────────────────────────┐                       │
│  │ Name         │ Phone           │                        │
│  ├────────────────────────────────┤                        │
│  │ John Doe     │ +254712345678   │                        │
│  │ Jane Smith   │ +254712345679   │                        │
│  │ Bob Johnson  │ +254712345680   │                        │
│  └────────────────────────────────┘                        │
│                                                             │
│  [UPLOAD]  [CANCEL]                                        │
│                                                             │
│  ────────────────────────────────────────────────────────  │
│                                                             │
│  EXISTING CONTACT GROUPS:                                  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ VIP Customers          125 contacts  [X Delete]      │  │
│  │ Newsletter Subscribers  453 contacts  [X Delete]      │  │
│  │ Trial Users             87 contacts   [X Delete]      │  │
│  │ Inactive Users          201 contacts  [X Delete]      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step-by-Step: Upload Contacts

**Step 1: Enter Group Name**
```
Look for text field labeled "Group Name"
Type group name: "VIP Customers Q1 2024"
(You can use any name that makes sense)
```

**Step 2: Choose CSV File**
```
Click the "Choose File" button
Your file browser will open
Navigate to your CSV file (file with .csv extension)
Double-click the file to select it
```

**Step 3: Review File Preview**
```
After selecting file, scroll down
You'll see first 5 rows of data:
- Name column should show contact names
- Phone column should show phone numbers
- Check data looks correct
```

**Step 4: Verify Data Format**
```
Check each entry:
✓ Names look complete (e.g., "John Doe" not just "John")
✓ Phone numbers start with + (e.g., +254712345678)
✓ No obvious errors or typos
✓ Each row has both Name and Phone
```

**Step 5: Click Upload**
```
Once preview looks good, click green "UPLOAD" button
System will process the file
Status will show: "Uploading... please wait"
```

**Step 6: Confirm Success**
```
Green success message appears:
"Successfully uploaded 125 contacts to 'VIP Customers Q1 2024'"

New group appears in "Existing Contact Groups" section below
Shows: "VIP Customers Q1 2024    125 contacts"
```

### View Your Contact Groups

At the bottom of the page, you'll see:

```
Group Name                    Count       Action
──────────────────────────────────────────────────
VIP Customers                 125         [X Delete]
Newsletter Subscribers        453         [X Delete]
Trial Users                   87          [X Delete]
```

Each group shows:
- **Name**: What you named the group
- **Count**: Number of contacts in it (e.g., 125 people)
- **Delete Button**: Red X to delete the entire group

### Delete a Contact Group

**⚠️ CAREFUL! This cannot be undone!**

1. Find the group you want to delete
2. Click the red [X Delete] button on the right
3. A popup appears asking: "Are you sure you want to delete all contacts in 'VIP Customers'?"
4. Click "Yes, Delete" to confirm (or "Cancel" to keep it)
5. Group disappears from the list

---

## ✉️ SECTION 4: CREATE CAMPAIGN WALKTHROUGH

### What You See on Create Campaign Page

**Create Campaign Page Layout:**
```
┌──────────────────────────────────────────────────┐
│                                                  │
│  CREATE CAMPAIGN                                 │
│  Set up a new SMS campaign                       │
│                                                  │
│  Campaign Name:                                  │
│  [_________________________________]             │
│  (e.g., "March Newsletter")                     │
│                                                  │
│  Message:                                        │
│  ┌──────────────────────────────┐               │
│  │ Enter your SMS message        │               │
│  │ [text area]                   │               │
│  │ [text area]                   │               │
│  │ [text area]                   │               │
│  └──────────────────────────────┘               │
│  45/160 characters                              │
│                                                  │
│  Contact Group:                                 │
│  [▼ Select group]                              │
│  ├─ VIP Customers                              │
│  ├─ Newsletter Subscribers                      │
│  ├─ Trial Users                                │
│  └─ Create new group...                        │
│                                                  │
│  ℹ️ Note: Campaign will be sent to all         │
│     contacts in the selected group.             │
│                                                  │
│  [CANCEL]     [CREATE CAMPAIGN]                 │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Step-by-Step: Create a Campaign

#### **Step 1: Enter Campaign Name**

```
1. Click in the "Campaign Name" field (top box)
2. Type a descriptive name:
   GOOD: "March Newsletter", "Spring Sale 2024", "Birthday Offer"
   BAD: "Campaign 1", "Test", "Send"
3. This helps you remember what the campaign was for
```

**Example Campaign Names:**
- "February Birthday Discount"
- "New Product Launch Q1"
- "VIP Customer Thank You"
- "Newsletter March 2024"

#### **Step 2: Write Your SMS Message**

```
1. Click in the "Message" text box (large area)
2. Type your SMS message
3. Keep it clear, concise, and under 160 characters
4. Character counter shows: "45/160" (like a progress bar)
5. Your message appears on right side as you type
```

**What Your Message Should Include:**
- ✓ Quick greeting or hook
- ✓ Main message (offer, news, reminder)
- ✓ Call to action (visit, reply, call)
- ✓ Optional: Date or code

**Examples:**

Message 1 (Business):
```
"Hi! Your appointment is tomorrow at 2 PM.
Reply CONFIRM to confirm. Call 0712345678 if changes needed."
Character count: 110/160
```

Message 2 (Promotion):
```
"Flash Sale! 40% off everything TODAY only.
Use code FLASH40. Shop now: bit.ly/sale"
Character count: 88/160
```

Message 3 (Notification):
```
"Your package is out for delivery today!
Track it here: track.company.com/123456"
Character count: 92/160
```

#### **Step 3: Select Contact Group**

```
1. Click the "Contact Group" dropdown (shows ▼)
2. A list appears showing your contact groups:
   - VIP Customers
   - Newsletter Subscribers
   - Trial Users
3. Click the group you want to send to
4. The dropdown now shows your selection
```

**What Makes Each Group Appear:**
- Groups you uploaded on the Contacts page
- Groups must have at least 1 contact
- Empty groups won't appear in dropdown

**Example Selections:**
- "VIP Customers" (125 people) → Send exclusive offer
- "Newsletter Subscribers" (453 people) → Weekly newsletter
- "Trial Users" (87 people) → Upgrade to premium offer

#### **Step 4: Review Everything Before Submitting**

**Checklist before clicking Create:**
```
☐ Campaign name is filled in and makes sense
☐ Message is grammatically correct
☐ Message is 160 characters or less
☐ Message contains your intended content
☐ Correct contact group is selected
☐ That group has contacts (not empty)
☐ Ready to send RIGHT NOW? (campaign sends immediately)
```

#### **Step 5: Click Create Campaign**

```
Once everything looks good:
1. Click the blue "CREATE CAMPAIGN" button
2. System will briefly show loading spinner
3. Confirmation appears: "Campaign created with 125 messages"
4. You're automatically returned to Dashboard
5. Your new campaign appears in campaign list
```

### What Happens After Campaign Creation

```
TIMELINE:

T+0 seconds: Campaign created, appears on Dashboard
T+30 seconds: Status changes to "SENDING" (orange)
T+5-30 min: Messages being sent to SMS gateway
T+30-60 min: Status becomes "COMPLETED" (green)
T+1-2 hours: Full delivery report shows sent/failed count
```

---

## 💬 SECTION 5: MESSAGE COMPOSITION GUIDE

### The 160-Character Limit Explained

SMS messages have a technical limit of **160 characters**.

**What counts as characters:**
- Letters: A-Z = 1 character each
- Numbers: 0-9 = 1 character each
- Spaces: Between words = 1 character each
- Punctuation: !? . , - = 1 character each
- Special: @ # $ % = 1 character each

**What characters might NOT work:**
- Emoji: 😀 = may count as 2-3 characters
- Accents: á é ó = sometimes cause issues
- Special symbols: © ® = may not display

### Message Composition Process

#### **Step 1: Write Your Main Message**

```
Write what you want to say without worrying about character count:

"Hello! This is John from ABC Company. I wanted to remind you that
we have a special promotion going on this month. You can get 30% off
all items when you visit our store today."

This is about 220 characters - TOO LONG!
```

#### **Step 2: Identify What's Essential**

```
Main points:
1. Who it's from (John, ABC Company)
2. What it's about (special promotion)
3. What they get (30% off)
4. When (today/this month)
5. Call to action (visit store)

Non-essential:
- "Hello!"
- "I wanted to..."
- Long explanations
```

#### **Step 3: Create Short Version**

```
"Hi! 30% off all items TODAY. ABC Company special promotion.
Visit us now!"

This is 86 characters - PERFECT, fits easily!
```

#### **Step 4: Test Character Count**

```
Copy your message into character counter.
Visit: character-count.com (or any online counter)
Paste message
Check the count: 86/160 ✓ GOOD!

If over 160:
- Remove words
- Use abbreviations
- Use shortlinks
- Shorten significantly
```

### Shortening Techniques

| Long Version | Short Version | Characters Saved |
|---|---|---|
| "Hello" | "Hi" | 3 |
| "your" | "ur" | 2 |
| "are" | "r" | 2 |
| "for" | "4" | 2 |
| "to" | "2" | 1 |
| "please" | "pls" | 3 |
| "https://www.mywebsite.com/page/product" | "bit.ly/offer" | 30+ |
| "Visit our website" | "Visit site" | 7 |

### Real-World Examples

**Example 1: Promotional Message**
```
SITUATION: E-commerce store wants to promote sale

LONG version (175 chars - TOO LONG):
"Welcome to our March Super Sale! Everything in store is 50% off. 
This offer is valid only today. Hurry and shop now from our store."

SHORT version (158 chars - PERFECT):
"Mega Sale! 50% off everything TODAY only. Visit ABC Store now!
Offer ends midnight. Don't miss out!"

✓ Saves 17 characters
✓ Includes: offer %, when valid, call to action
```

**Example 2: Appointment Reminder**
```
SITUATION: Doctor's office reminds patient

LONG version (187 chars - TOO LONG):
"Good morning! This is a friendly reminder from Dr. Smith's office. 
Your appointment is scheduled for tomorrow at 2:00 PM. Please arrive 
15 minutes early."

SHORT version (152 chars - PERFECT):
"Reminder: You have an appointment tomorrow at 2 PM at Dr. Smith's.
Please arrive 15 mins early. Call 0712345678 to reschedule."

✓ Saves 35 characters
✓ Includes: time, location, action (arrive early, reschedule option)
```

**Example 3: Activation Code**
```
SITUATION: Send verification code for signup

LONG version (189 chars - TOO LONG):
"Thank you for signing up for our service! Your account verification 
code is 123456. Please enter this code in the verification screen 
within 10 minutes."

SHORT version (99 chars - PERFECT):
"Welcome! Your verification code is 123456. Enter it now to activate 
your account. Valid for 10 mins."

✓ Saves 90 characters!
✓ Includes: code, action, deadline
```

---

## 📈 SECTION 6: MONITORING & DELIVERY TRACKING

### What You See in Dashboard After Sending

**Real-Time Updates:**

```
Before Sending:
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Campaigns │ │ Total    │ │ Sent     │ │ Failed   │
│    5     │ │ Messages │ │ Messages │ │ Messages │
│          │ │  2,500   │ │  2,350   │ │    150   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Your new campaign status: SENDING (orange)


After 30 minutes:
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Campaigns │ │ Total    │ │ Sent     │ │ Failed   │
│    6     │ │ Messages │ │ Messages │ │ Messages │
│          │ │  2,625   │ │  2,475   │ │    150   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Your new campaign status: SENDING (orange)
Green "Sent" number has increased to 2,475!


After 1 hour complete:
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Campaigns │ │ Total    │ │ Sent     │ │ Failed   │
│    6     │ │ Messages │ │ Messages │ │ Messages │
│          │ │  2,625   │ │  2,600   │ │    25    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Your campaign status: COMPLETED (green checkmark ✓)
Total: 125 messages, Sent: 120, Failed: 5
Success Rate: 96% EXCELLENT!
```

### Understanding the Numbers

```
Total Messages = 125
(All messages in this campaign)

Sent Messages = 120 ✓
(Successfully delivered to recipients)

Failed Messages = 5 ✗
(Could not deliver - wrong number, blocked, etc.)

Success Rate = 120 ÷ 125 = 96%
(Percentage successfully sent)

Formula: (Sent ÷ Total) × 100 = Success %
```

### Delivery Report Details

When you click on a completed campaign, you see:

```
DELIVERY REPORT - "March Sale Campaign"
Total Messages: 125
Sent: 120 ✓
Failed: 5 ✗
Success Rate: 96%

Failed Messages Detail:
1. +254712345690 - Invalid phone number
2. +254712345691 - Recipient network issue
3. +254712345692 - Carrier blocked the number
4. +254712345693 - Invalid phone number
5. +254712345694 - Temporary network issue
```

### What Do Status Colors Mean?

```
GREEN ✓ SENT
- Message successfully delivered
- Recipient received it
- Shows up as SMS in their phone

RED ✗ FAILED
- Message could not be delivered
- Reasons: wrong number, blocked, network error
- Recipient did NOT get the message

ORANGE ⟳ SENDING
- Currently in process
- Messages being queued and sent
- Give it time to complete

GRAY ◯ DRAFT
- Campaign created but not yet sent
- You can still edit or delete
- Status hasn't changed yet
```

---

## 🔧 SECTION 7: TROUBLESHOOTING VISUAL GUIDE

### I Can't Login - What Do I See?

**Screen Shows:**
```
┌────────────────────────────────┐
│ ERROR                          │
│ Invalid email or password      │
│                                │
│ Please check your credentials  │
│ and try again.                 │
│                                │
│ [OK]                           │
└────────────────────────────────┘
```

**How to Fix:**
1. Check spelling of email (no spaces before/after)
2. Check if CAPS LOCK is on (passwords are case-sensitive)
3. Make sure you're using the correct password
4. Contact admin if password forgotten

---

### CSV Upload Fails - "Name and Phone" Error

**Screen Shows:**
```
┌──────────────────────────────────────┐
│ ERROR                                │
│ CSV must contain "Name" and "Phone"  │
│ columns                              │
│                                      │
│ [OK]                                 │
└──────────────────────────────────────┘
```

**What Went Wrong:**
Your CSV file headers are wrong or missing.

**How to Fix:**

❌ WRONG - Headers don't match:
```
First Name,Last Name,Phone Number
╱─────────────╱──────────╱────────────
Not "Name"    Extra      Not "Phone"
column
```

✓ CORRECT - Headers must be exactly:
```
Name,Phone
╱────╱──────
```

---

### Campaign Won't Create

**Screen Shows:**
```
┌──────────────────────────────────┐
│ ERROR                            │
│ All fields are required          │
│                                  │
│ [OK]                             │
└──────────────────────────────────┘
```

**What Went Wrong:**
You missed filling one of the required fields.

**Check List:**
```
☐ Campaign Name: Is it filled in? (not empty)
☐ Message: Is it filled in? (not empty)
☐ Contact Group: Is it selected? (not blank)
```

---

### Message Too Long Error

**Screen Shows:**
```
┌──────────────────────────────┐
│ ERROR                        │
│ Message must be 160          │
│ characters or less           │
│                              │
│ [OK]                         │
└──────────────────────────────┘
```

**What Went Wrong:**
Your message has more than 160 characters.

**See Character Count:**
In the message box, look below for:
```
"189/160 characters" ← You're 29 characters OVER!
```

**How to Fix:**
1. Remove unnecessary words
2. Use abbreviations (ur = your, pls = please)
3. Shorten web links using bit.ly
4. Delete the least important information
5. Try again when under 160

---

## ✅ COMPLETE WORKFLOW VISUAL

**The Full Process from Start to Finish:**

```
┌─────────────────────────┐
│     1. LOGIN            │
│  Enter email/password   │
│  Click: LOGIN           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   2. UPLOAD CONTACTS    │
│  Go to: Contacts page   │
│  Upload: CSV file       │
│  Name: "MyGroup"        │
│  Click: UPLOAD          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. CREATE CAMPAIGN     │
│  Go to: Create Campaign │
│  Fill: Campaign Name    │
│  Write: SMS Message     │
│  Select: Contact Group  │
│  Click: CREATE CAMPAIGN │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  4. SYSTEM SENDS SMS    │
│  Status: SENDING        │
│  Duration: 30-60 min    │
│  Messages in queue      │
│  Batched to SMS gateway │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  5. DELIVERY COMPLETE   │
│  Status: COMPLETED      │
│  Success: 95%+ typical  │
│  Failed: 5% max         │
│  Report: View details   │
└─────────────────────────┘
```

---

## 📞 QUICK HELP REFERENCE

### When You See This... → Do This

| Screen Message | Meaning | Action |
|---|---|---|
| "Loading..." | System is processing | Wait 3-5 seconds |
| "Login failed" | Credentials wrong | Check email/password |
| "No contacts found" | Group is empty | Upload contacts first |
| "Character limit" | Message too long | Delete words, shorten |
| "Campaign created" | ✓ Success! | Watch Dashboard |
| "Sending" | In progress | Check back in 30 min |
| "Completed" | ✓ All sent | View delivery report |

---

## 🎓 KEY LEARNING POINTS

### What You Now Know How to Do:

1. **✓ Login** to the admin dashboard
2. **✓ Upload** contacts from a CSV file
3. **✓ Organize** contacts into groups
4. **✓ Compose** SMS messages within 160 characters
5. **✓ Create** and send campaigns
6. **✓ Monitor** campaign status and statistics
7. **✓ View** delivery reports and success rates
8. **✓ Troubleshoot** common errors

### Your Next Steps:

1. Login with your credentials
2. Upload first contact group (CSV file)
3. Create small test campaign (5-10 people)
4. Watch it send successfully
5. Review delivery report
6. Create actual campaigns for your audience

### Common Questions

**Q: How long until messages are delivered?**
A: Usually 30-60 minutes for complete delivery

**Q: Can I edit a message after sending?**
A: No, create a new campaign to send corrected message

**Q: Safe to refresh browser during sending?**
A: Yes, system continues regardless of browser

**Q: What if a message fails?**
A: Check delivery report for reason, try again with corrected number

---

**Last Updated:** March 2026
**Questions?** Contact your system administrator
