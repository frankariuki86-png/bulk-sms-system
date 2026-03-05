# Quick Start Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Supabase account (https://supabase.com)
- Africa's Talking account (https://africastalking.com)

## 1. Clone and Setup

```bash
git clone <repository>
cd bulk-sms-system
```

## 2. Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
cp .env.example .env.local
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
AFRICAS_TALKING_API_KEY=your-api-key
AFRICAS_TALKING_USERNAME=your-username
```

## 3. Database Setup
Before you send any messages make sure your Africa's Talking account has funds. Navigate to the AT dashboard, top up using your preferred payment method, then copy the API key/username into your `.env` files as described later.
### Create Supabase Project

1. Go to https://supabase.com
2. Create new project
3. Wait for database initialization
4. Copy project URL and keys

### Run Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

Verify tables:
```bash
supabase db list
```

## 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access at http://localhost:5173

### Test Login
- Email: test@example.com
- Password: (set via Supabase Auth)

## 5. Worker Setup

```bash
cd worker
npm install
npm run dev
```

Watch for:
- Loading messages from database
- Sending via Africa's Talking
- Updating statuses

## 6. Create Test Data

### Add Test Contacts

```sql
-- Run in Supabase SQL Editor
INSERT INTO contacts (name, phone_number, group_name) VALUES
('John Doe', '+254712345678', 'test'),
('Jane Smith', '+254712345679', 'test'),
('Bob Johnson', '+254712345680', 'test');
```

### Create Test Campaign

In dashboard:
1. Go to "Create Campaign"
2. Fill campaign details
3. Select "test" group
4. Submit

## 7. Verify Queue

Check Supabase database:

1. Go to Table Editor
2. View `sms_queue` table
3. Should see pending messages
4. Watch for status changes as worker processes

## Development Workflow

### Making Changes

```bash
# Frontend changes
cd frontend
npm run dev     # Hot reload

# Worker changes  
cd worker
npm run dev     # Auto restart with --watch

# Database changes
# Edit migration files then:
supabase db push
```

### Testing

```bash
# Frontend unit tests
cd frontend
npm test

# Worker tests
cd worker
npm test
```

### Debugging

**Frontend (Chrome DevTools)**
- F12 to open
- Check Console for errors
- Use React DevTools extension

**Worker (VSCode)**
```bash
node --inspect-brk src/index.js
```
- Opens debugging on localhost:9229

**Database (Supabase)**
- SQL Editor tab
- Run queries directly
- View query execution plan

## Common Issues

### Database Connection Error
```
Error: Missing SUPABASE_URL
```
Solution: Set environment variables in .env

### SMS Not Sending
```
Error: Africa's Talking credentials not configured
```
Solution: Add API key and username to .env

### Worker Not Starting
```
Cannot find module
```
Solution: Run `npm install` in worker directory

### React Component Errors
```
Module not found
```
Solution: Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Read Documentation**
   - [Architecture](./ARCHITECTURE.md)
   - [API Reference](./API.md)
   - [Deployment Guide](./DEPLOYMENT.md)

2. **Expand Features**
   - Add contact upload page
   - Build campaign analytics
   - Implement delivery reports

3. **Deploy to Production**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Set up monitoring
   - Configure backups

## Getting Help

Check these resources:
- [Supabase Documentation](https://supabase.com/docs)
- [Africa's Talking SMS API](https://africastalking.com/sms/api)
- [React Documentation](https://react.dev)

## Project Contacts

- Architecture: See ARCHITECTURE.md
- Questions: Check PRD.md for requirements
- Issues: Review DEPLOYMENT.md for troubleshooting
