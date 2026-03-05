## Production Deployment Guide

### Prerequisites

- Node.js 18+
- Supabase account
- Africa's Talking account **with SMS credits purchased**
- Vercel/Netlify (for frontend)
- Railway/Render (for worker)

> ⚠️ **SMS Credits** must be bought before sending messages. See the section below for guidance on purchasing and pricing.

### SMS Credits & Cost

Before you deploy or run the worker in production you need to ensure your Africa's Talking account is funded:

1. Visit https://africastalking.com and log in (or sign up if you haven't).
2. Navigate to **Dashboard → Products → SMS** and click **Top up** or **Add Funds**.
3. Choose a payment method (credit/debit card, MPESA, bank transfer, etc.) and add the desired amount.
4. Check the [pricing page](https://www.africastalking.com/pricing) for per‑country rates – costs vary by destination and are updated regularly.
   - Typical SMS prices range from **$0.002–$0.04 per message** depending on the country.
   - Use the calculator on the site or multiply `expected_messages × price_per_message` to estimate your spend.
5. Keep your balance positive; the worker will log errors if you run out of credits.
6. Copy your **API key** and **username** into the appropriate `.env` files as shown below (AFRICAS_TALKING_API_KEY / AFRICAS_TALKING_USERNAME).

**Cost considerations**

- Monitor your balance via the Africa's Talking dashboard or API.
- Be aware of any minimum purchase amounts and currency conversion fees.
- For large volumes consider buying credits in bulk and setting alerts for low balance.

### 1. Environment Setup

Create production `.env` files:

```bash
# Frontend (.env.production)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-key

# Worker (.env.production)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
AFRICAS_TALKING_API_KEY=your-production-api-key
AFRICAS_TALKING_USERNAME=your-production-username
BATCH_SIZE=100
MAX_RETRIES=5
NODE_ENV=production
```

### 2. Database Deployment

```bash
# Applied migrations
supabase db push --remote

# Verify tables were created
supabase db pull
```

### 3. Frontend Deployment (Vercel)

```bash
cd frontend
npm run build
vercel deploy --prod
```

### 4. Worker Deployment (Railway)

```bash
# Railway CLI
railway login
railway init
railway up
```

Set environment variables in Railway dashboard:
- Database credentials
- API keys
- Batch configuration

### 5. Supabase Configuration

#### Row Level Security (RLS)

All tables have RLS enabled. Verify policies:

```sql
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

#### Backups

Enable automated backups in Supabase dashboard:
- Daily backups (7 day retention)
- Weekly backups (30 day retention)

### 6. Monitoring

#### Application Monitoring

Implement using:
- Sentry (error tracking)
- LogRocket (session replay)
- New Relic (APM)

#### Database Monitoring

```sql
-- Check slow queries
SELECT * FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

#### Worker Monitoring

Log to centralized service:
- LogRocket
- DataDog
- Papertrail

### 7. Security Checklist

- [ ] All secrets in environment variables
- [ ] Row Level Security policies configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] API keys rotated monthly
- [ ] Database credentials encrypted
- [ ] SSL/TLS enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] Logs sanitized (no sensitive data)

### 8. Performance Optimization

#### Frontend

```bash
# Code splitting
npm run build -- --analyze

# CDN delivery of static assets
# Configure Vercel/Netlify CDN
```

#### Worker

- Batch processing: 100 messages per 5 seconds
- Connection pooling
- Memory management
- Process monitoring

#### Database

```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM sms_queue WHERE status = 'pending';

-- Vacuum and analyze regularly
VACUUM ANALYZE;
```

### 9. Scaling Considerations

For 10,000+ SMS:

1. **Database Connection Pooling**
   - Use PgBouncer
   - Connection pool: 20-50

2. **Worker Scaling**
   - Horizontal: Multiple worker instances
   - Load balancing: Heart monitor pattern

3. **API Rate Limiting**
   - Implement with Redis
   - Limits: 100 req/min per user

4. **Caching**
   - Redis for campaign stats
   - 5-minute TTL

### 10. Disaster Recovery

#### Backup Strategy

```bash
# Daily backup
supabase db pull --remote > backup-$(date +%Y-%m-%d).sql

# Test restore
supabase db push < backup-2024-01-15.sql
```

#### Failover

- Database: Supabase provides automatic failover
- Worker: Deploy on 2+ instances
- Frontend: CDN with fallback

### 11. Cost Optimization

- Monitor Supabase usage
- Use appropriate database indexes
- Archive old campaign data
- Implement data retention policies

### 12. Compliance & Regulations

- GDPR: Data retention policies
- CCPA: User data access/deletion
- SMS regulations: Opt-in tracking
- Kenya: Local SMS gateway compliance

## Monitoring Checklist

Daily:
- [ ] Check worker process status
- [ ] Review error logs
- [ ] Monitor database size
- [ ] Check API rate limits

Weekly:
- [ ] Review campaign metrics
- [ ] Check delivery reports
- [ ] Analyze queue performance

Monthly:
- [ ] Review security logs
- [ ] Audit user access
- [ ] Update dependencies
- [ ] Backup verification
