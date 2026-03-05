# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Admin Dashboard                         │
│                (React + TailwindCSS)                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP/REST
                 │
┌────────────────▼────────────────────────────────────────────┐
│                  Supabase API Gateway                        │
│           (Authentication + REST API)                        │
└────────────────┬────────────────────────────────────────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
      v                     v
┌──────────────────┐  ┌──────────────────┐
│  PostgreSQL DB   │  │  Storage/Auth    │
│  - contacts      │  │  - Users         │
│  - campaigns     │  │  - Sessions      │
│  - sms_queue     │  │  - Files         │
│  - audit_logs    │  │                  │
└────────┬─────────┘  └──────────────────┘
         │
         │ (Watches for changes)
         │
┌────────▼──────────────────────────────────────────────┐
│            SMS Queue Worker                           │
│         (Node.js Background Process)                  │
│  - Polls pending messages                            │
│  - Sends via SMS Gateway API                         │
│  - Updates status                                     │
│  - Implements retry logic                            │
└────────┬──────────────────────────────────────────────┘
         │
         │ REST API
         │
┌────────▼──────────────────────────────────────────────┐
│       Africa's Talking SMS Gateway                    │
│  - Sends SMS to Safaricom/Airtel                     │
│  - Provides delivery status                          │
└───────────────────────────────────────────────────────┘
```

## Data Flow

### Campaign Creation Flow
```
User creates campaign
        ↓
Frontend validates input
        ↓
Sends to Supabase API
        ↓
Database creates campaign
        ↓
Database creates queue entries (one per contact)
        ↓
Returns campaign ID to frontend
        ↓
Frontend shows success
```

### Message Sending Flow
```
Worker polls database
        ↓
Fetches pending messages (batch of 50)
        ↓
For each message:
  ├─ Send via Africa's Talking API
  ├─ Get response with message ID
  ├─ Update database status
  ├─ Log result
  └─ Implement delay for rate limiting
        ↓
Wait (5 seconds)
        ↓
Repeat
```

### Retry Flow
```
Message fails to send
        ↓
Status marked as 'failed'
        ↓
Retry count incremented
        ↓
If retry_count < max_retries:
  ├─ Message reset to 'pending'
  └─ Next polling cycle sends again
        ↓
Else:
  └─ Message marked as 'bounced'
```

## Component Architecture

### Frontend Components

```
App
├── AuthContext (manages user state)
├── Navigation
├── Routes
│   ├── LoginPage
│   ├── DashboardPage
│   │   ├── StatsCard (reusable)
│   │   └── CampaignList
│   ├── CreateCampaignPage
│   │   ├── Input (reusable)
│   │   ├── Button (reusable)
│   │   └── TextArea
│   ├── ContactsPage (planned)
│   │   ├── ContactTable
│   │   ├── UploadModal
│   │   └── GroupManager
│   └── ReportsPage (planned)
│       ├── StatsChart
│       └── DeliveryReport
│
└── Shared Components
    ├── Button
    ├── Input
    ├── Card
    ├── Badge
    ├── Alert
    └── Loading
```

### Backend Structure

```
Supabase
├── Database
│   ├── contacts (table)
│   ├── campaigns (table)
│   ├── sms_queue (table)
│   ├── campaign_stats (table)
│   └── audit_logs (table)
├── Authentication
│   └── Supabase Auth
├── Row Level Security
│   └── Policies (per table)
└── Edge Functions
    └── create-sms-queue (trigger)
```

### Worker Structure

```
Worker
├── index.js (entry point)
├── config.js (configuration)
├── lib/
│   └── supabase.js (DB client)
├── services/
│   ├── SMSService.js (abstraction)
│   └── AfricasTalkingService.js (API)
└── queue/
    └── worker.js (main logic)
```

## Database Schema

### contacts
- id (UUID, PK)
- name (string)
- phone_number (string, UNIQUE)
- group_name (string, FK)
- created_at (timestamp)

Indexes: group_name, phone_number

### campaigns
- id (UUID, PK)
- name (string)
- message (string, max 160)
- status (enum: draft|sending|completed|paused)
- total_sms (integer)
- created_by (UUID, FK to users)
- created_at (timestamp)
- started_at (timestamp, nullable)
- completed_at (timestamp, nullable)

Indexes: status, created_by, created_at

### sms_queue
- id (UUID, PK)
- campaign_id (UUID, FK)
- phone_number (string)
- message (string)
- status (enum: pending|sent|failed|bounced)
- retry_count (integer)
- max_retries (integer)
- provider_message_id (string, nullable)
- error_message (text, nullable)
- created_at (timestamp)
- sent_at (timestamp, nullable)
- last_retry_at (timestamp, nullable)

Indexes: status, campaign_id, phone_number, created_at

### campaign_stats
- id (UUID, PK)
- campaign_id (UUID, FK, UNIQUE)
- total_messages (integer)
- sent_messages (integer)
- failed_messages (integer)
- pending_messages (integer)
- bounced_messages (integer)
- last_updated (timestamp)

Indexes: campaign_id

### audit_logs
- id (UUID, PK)
- user_id (UUID, FK)
- action (string)
- entity_type (string)
- entity_id (UUID, nullable)
- details (JSONB)
- created_at (timestamp)

Indexes: user_id, entity_type

## Scalability Strategy

### Horizontal Scaling

**Frontend**
- Deployed on CDN (Vercel, Netlify)
- Static assets cached globally
- No server-side scaling needed

**Database**
- Supabase handles replication
- Connection pooling (20-50 connections)
- Read replicas if needed

**Worker**
- Multiple instances (2-5)
- Load distribution via queue
- Process monitoring (PM2, Docker)

### Vertical Scaling

**Database**
- Upgrade compute tier
- Increase memory
- Better disk performance

**Worker**
- More RAM for larger batches
- Better CPU for processing

### Caching Strategy

- Campaign stats: 5-minute TTL
- Contact groups: 10-minute TTL
- Delivery reports: Real-time

## Monitoring & Observability

### Metrics Tracked

**Frontend**
- Page load time
- Error rate
- User sessions
- Button click patterns

**Backend**
- API response time
- Error rate
- Database query performance
- Queue processing rate

**Worker**
- Message processing rate
- Success/failure rate
- Retry rate
- Worker process health
- Memory usage

### Logging

- Centralized logging (Supabase logs)
- Structured JSON logs
- Timestamps with timezone
- Error stack traces
- Sanitized sensitive data

### Alerting

- Worker health check every 30s
- Alert on 5+ consecutive failures
- Database connection pool warnings
- API rate limit violations
- Campaign delivery delays

## Disaster Recovery

### Backup Strategy
- Daily automated backups
- 7-day retention
- Point-in-time recovery
- Test restore procedures

### Failover
- Database: Automatic (Supabase)
- Worker: Multi-instance deployment
- Frontend: CDN with fallback

### Data Integrity
- Transaction support
- Foreign key constraints
- RLS policies
- Audit logging
