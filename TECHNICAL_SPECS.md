# 🔧 TECHNICAL SPECIFICATIONS

## SYSTEM REQUIREMENTS

### Minimum Requirements
```
Frontend:
  - Node.js: 18.0.0+
  - npm: 9.0.0+
  - Modern browser (Chrome, Firefox, Safari, Edge)
  - 2GB RAM available
  - 500MB disk space

Worker:
  - Node.js: 18.0.0+
  - npm: 9.0.0+
  - 1GB RAM available
  - 100MB disk space
  - Network access to Supabase & Africa's Talking

Database:
  - PostgreSQL 13+ (Supabase provides this)
  - 500MB storage per 100k messages
  - Network access from worker
  - Network access from frontend
```

### Recommended Requirements
```
Frontend:
  - Node.js: 20.x LTS
  - npm: 10.x
  - 4GB+ RAM
  - 1GB+ disk space
  - Broadband internet (5+ Mbps)

Worker:
  - Node.js: 20.x LTS
  - npm: 10.x
  - 4GB+ RAM
  - SSD with 1GB+ free space
  - Reliable internet connection

Database:
  - PostgreSQL 15+
  - 2GB+ RAM
  - SSD storage
  - Backup mechanism in place
```

---

## COMPONENT SPECIFICATIONS

### Frontend Application

**Technology Stack:**
```
React:            18.2.0
React Router:     6.20.0
Vite:             5.0.0+
TailwindCSS:      3.3.0
Supabase JS:      2.38.0
Axios:            1.6.0
Date-fns:         2.30.0
UUID:             9.0.1
```

**Bundle Size (Estimated):**
```
Main bundle:      ~150KB (gzipped: ~45KB)
Vendor bundle:    ~200KB (gzipped: ~60KB)
Total:            ~400KB (gzipped: ~120KB)
Load time:        <2 seconds on 4G
```

**Performance Targets:**
```
FCP (First Contentful Paint):    < 1.0s
LCP (Largest Contentful Paint):  < 2.5s
TTI (Time to Interactive):       < 3.0s
CLS (Cumulative Layout Shift):   < 0.1
```

**Supported Browsers:**
```
Chrome:    Latest 2 versions
Firefox:   Latest 2 versions
Safari:    Latest 2 versions
Edge:      Latest 2 versions
Mobile:    iOS 12+, Android 8+
```

### Worker Application

**Technology Stack:**
```
Node.js:              18.0.0+
Supabase JS:          2.38.0
Axios:                1.6.0
Pino:                 8.16.0
Pino-pretty:          10.2.0
Dotenv:               16.3.1
```

**Performance Targets:**
```
Batch size:            50-100 messages
Processing time:       ~5 seconds per batch
Memory usage:          < 100MB per batch
CPU usage:             < 50% on single core
Success rate:          > 98%
```

**Scaling Characteristics:**
```
Messages per hour:     Single instance: 36,000-72,000
Messages per minute:   Single instance: 600-1,200
Messages per day:      Single instance: 0.5-1.0 million
Parallel instances:    Horizontal scaling to 10+
Max concurrent:        Limited by database connections
```

### Database Specifications

**PostgreSQL Version:**
```
Minimum:    13.0
Recommended: 15.0+
Supabase:   Latest version (handled automatically)
```

**Database Schema:**
```
Tables:             5
Relationships:      3
Indexes:            10+
Stored Procedures:  2
Triggers:           1
Views:              0 (planned)
```

**Storage Requirements:**
```
Per 1,000 SMS:
  - Database space:      500KB - 1MB
  - Log storage:         100KB - 200KB
  - Total estimate:      600KB - 1.2MB per 1,000 SMS

For 10,000 SMS campaign:
  - Database:           5-10MB
  - Logs:               1-2MB
  - Total:              6-12MB

Per year (assuming 10M SMS):
  - Raw data:           6-12GB
  - Logs:               1-2GB
  - With backups:       15-30GB
```

**Connection Pool:**
```
Default connections:   20
Max connections:       50
Connection timeout:    30s
Idle timeout:          5m
Max query time:        30m
```

**Performance Characteristics:**
```
Insert speed:          10,000 rows/sec
Query speed (indexed): < 100ms
Aggregation query:     < 500ms
Full table scan:       Avoided with indexes
```

---

## API SPECIFICATIONS

### REST API

**Base URL:**
```
Development:   http://localhost:5173/api
Production:    https://api.example.com
```

**Endpoints:**
```
Total endpoints:       20+
Authentication:        JWT (Bearer token)
Rate limiting:         100 req/min per user
Response format:       JSON
Error handling:        Standardized error codes
Pagination:            Offset-based (limit, offset)
```

**Request/Response:**
```
Content-Type:          application/json
Charset:               UTF-8
Compression:           gzip enabled
Timeout:               30 seconds
Retry logic:           Client-side with exponential backoff
```

**Data Validation:**
```
Input validation:      Frontend + Backend
Phone format:          +254 prefix required
Message length:        Max 160 characters
Campaign name:         Max 255 characters
File upload:           CSV only, max 10MB
```

### Africa's Talking Integration

**API Endpoint:**
```
Sandbox:   https://api.sandbox.africastalking.com/version1/messaging
Production: https://api.africastalking.com/version1/messaging
```

**Authentication:**
```
Method:                API Key (header)
Key:                   AFRICAS_TALKING_API_KEY env var
Expires:               No expiration (manual rotation recommended)
Rate limit:            Depends on account tier
```

**Message Specifications:**
```
Character limit:       160 (Latin characters)
                      70 (Unicode/special characters)
Supported numbers:     +254 (Kenya) primary
Delivery timeout:      300 seconds
Retry policy:          3 attempts with backoff
```

---

## SECURITY SPECIFICATIONS

### Encryption

**In Transit:**
```
Protocol:              HTTPS/TLS 1.2+
Certificate:           Let's Encrypt (auto-renewed)
Cipher suites:         Modern, secure ciphers
Perfect forward:       Enabled
```

**At Rest (Recommended):**
```
Database:              Supabase encryption (built-in)
Keys:                  Managed by Supabase
Key rotation:          Automatic
Status:                Available on PRO tier
```

### Authentication

**Method:**
```
Type:                  JWT (JSON Web Token)
Provider:              Supabase Auth
Expiration:            1 hour access, refresh token
Refresh:               Automatic via SDK
Revocation:            Supported
```

**Password Policy:**
```
Minimum length:        8 characters
Complexity:            Email + password
Reset:                 Email-based
Session timeout:       30 minutes inactivity
```

### Access Control

**Row Level Security (RLS):**
```
Status:                Enabled on all tables
Policies:              Per-table, per-user
Enforcement:           Database-level
Performance impact:    Minimal (< 5ms overhead)
```

**Role-Based Access:**
```
Admin:                 Full access
User:                  Own campaigns only
Guest:                 No access (requires auth)
Service:               Limited to queue operations
```

---

## MONITORING SPECIFICATIONS

### Logging

**Frontend Logging:**
```
Level:                 info, warn, error
Output:                Browser console
Storage:               Session-based
Retention:             Session lifetime
Sensitive data:        Excluded (no PII)
```

**Worker Logging:**
```
Level:                 debug, info, warn, error
Format:                Structured JSON
Output:                Stdout + file
Retention:             7 days
Rotation:              Daily

Sample:
{
  "level": "info",
  "time": "2024-01-15T10:30:00Z",
  "message": "Processing batch",
  "campaignId": "uuid",
  "batchSize": 50
}
```

**Database Logging:**
```
Query logging:         Auto-collect on Supabase
Slow query threshold:  100ms
Retention:             7 days
Analysis:              Via Supabase dashboard
```

### Metrics

**Frontend Metrics:**
```
Page load time:        Tracked
API response time:     Tracked
Error rate:            Tracked
User interactions:     Tracked
```

**Worker Metrics:**
```
Messages processed:    Per batch
Success rate:          Per campaign
Error rate:            Per error type
Processing time:       Per message
Queue depth:           Current pending
Retry rate:            Per campaign
```

**Database Metrics:**
```
Connection count:      Active connections
Query time:            Average per query
Table size:            Disk usage
Backup status:         Last backup time
Replication lag:       (If replicated)
```

### Alerting (Recommended Setup)

**Critical Alerts:**
```
Worker down:           Immediate
High error rate:       > 5% failures
Database full:         < 10% space left
API down:              Connection failure
Queue stuck:           No progress in 1 hour
```

**Warning Alerts:**
```
Slow queries:          > 1 second
High memory:           > 80% usage
Connection pool:       > 80% utilization
Batch processing slow: > 10 seconds
```

---

## DEPLOYMENT SPECIFICATIONS

### Frontend Deployment

**Options:**
```
Recommended:  Vercel, Netlify
Alternative:  AWS CloudFront + S3, GCP Cloud
Edge:         Cloudflare Pages
```

**Build Output:**
```
Framework:     Next.js or Vite
Output:        Static files (dist/)
Size:          ~400KB total
Cacheable:     Yes (with cache-busting)
```

**CDN Configuration:**
```
Origin:        Static host
Caching:       Aggressive for assets
TTL:           24 hours for static
TTL:           5 minutes for index.html
Compression:   Gzip enabled
```

### Worker Deployment

**Options:**
```
Recommended:  Railway, Render, Fly.io
Alternative:  AWS EC2, GCP Cloud Run
Container:    Docker-ready (not provided)
```

**Performance:**
```
Startup time:  < 5 seconds
Memory:        150-300MB
CPU:           1 core minimum
Concurrency:   Single instance recommended initially
Scaling:       Add instances for 100k+ SMS/day
```

**Database Connection:**
```
Pool size:     10-20 connections
Idle timeout:  5 minutes
Timeout:       30 seconds
Reuse:         Connection pooling enabled
```

### Database Deployment

**Supabase Project:**
```
Region:        Select closest to users
Plan:          Free → Pro → Enterprise
Storage:       100GB on Pro tier
Backup:        Daily on Pro tier
Replication:   Single region default
```

**Scaling Strategy:**
```
Current:       <1M SMS/month
Phase 1:       1-10M SMS/month
Phase 2:       10-100M SMS/month
Phase 3:       100M+ SMS/month
Growth:        Increase storage & compute tier
```

---

## COMPLIANCE SPECIFICATIONS

### Data Protection

**GDPR Compliance:**
```
Personal data:         Encrypted in transit
Retention:             Configurable (default 90 days)
User rights:           Export, delete available
Consent:               Required before SMS
Processing:            Logged for audit
```

**Data Residency:**
```
Default:               Same region as deployment
Options:               Multi-region possible
Backup:                Georeplicated
Regulatory:            Kenya data localization optional
```

### Audit & Logging

**Audit Trail:**
```
Captured:              All user actions
Stored:                audit_logs table
Retention:             90 days minimum
Analysis:              Available via SQL
Export:                Possible for compliance
```

**Compliance Reporting:**
```
Campaign metrics:      Available
Message logs:          Complete log
User activity:         Tracked
System changes:        Versioned
```

---

## BACKUP & RECOVERY

### Backup Strategy

**Frequency:**
```
Automatic:     Daily (Supabase Pro)
Manual:        On-demand available
Retention:     7 days (free), 30 days (Pro)
Georeplication: Available (Pro)
```

**Recovery Time:**
```
RTO:           < 1 hour
RPO:           24 hours (daily backup)
Test interval:  Monthly recommended
Documentation: Available in DEPLOYMENT.md
```

---

## PERFORMANCE TARGETS

### Frontend Performance
```
Page Load:                  < 2 seconds
Time to Interactive:        < 3 seconds
API Response Time:          < 500ms
Lighthouse Score:           > 90/100
Mobile Performance:         > 80/100
```

### Worker Performance
```
Batch Processing:           5 seconds per 50 messages
Message Latency:            < 60 seconds end-to-end
Success Rate:               > 98%
Error Recovery:             < 5 minutes
Throughput:                 1,200 SMS/minute
```

### Database Performance
```
Query Response:             < 100ms (indexed)
Insert Performance:         > 10,000 rows/sec
Concurrent Queries:         > 50 simultaneous
Table Scan:                 Avoided with indexes
Aggregation:                < 500ms
```

---

## SCALABILITY METRICS

### Vertical Scaling
```
Frontend:      From 5GB to 50GB compute
Worker:        From 1GB to 16GB RAM
Database:      From 100GB to 1TB storage
```

### Horizontal Scaling
```
Frontend:      Unlimited (CDN)
Worker:        Up to 10 instances minimum
Database:      Read replicas available
Load balancing: Round-robin (fronted)
```

### Capacity Planning
```
Current:       10,000 SMS per campaign
Phase 1:       100,000 SMS per campaign (month 3)
Phase 2:       1,000,000 SMS per campaign (month 6)
Phase 3:       10,000,000 SMS per campaign (month 12)
```

---

**Document Version:** 1.0.0
**Last Updated:** February 28, 2026
**Reviewed By:** Architecture Team
