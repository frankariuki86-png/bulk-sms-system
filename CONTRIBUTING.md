# Contributing & Development Guide

## Code Structure

### Frontend Organization

```
src/
├── components/         # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Navigation.jsx
│   ├── Badge.jsx
│   ├── Alert.jsx
│   └── Loading.jsx
├── pages/             # Page components
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   └── CreateCampaignPage.jsx
├── services/          # API services
│   ├── campaignService.js
│   ├── contactService.js
│   └── queueService.js
├── context/           # React context
│   └── AuthContext.jsx
├── hooks/             # Custom hooks
│   └── useAuth.js
├── lib/               # Utilities
│   └── supabase.js
├── App.jsx
├── main.jsx
└── index.css
```

### Worker Organization

```
src/
├── index.js           # Entry point
├── config.js          # Configuration
├── lib/
│   └── supabase.js
├── services/
│   ├── SMSService.js
│   └── AfricasTalkingService.js
└── queue/
    └── worker.js
```

## Coding Standards

### JavaScript/JSX

```javascript
// Use const/let, never var
const value = 'good';

// Arrow functions for consistency
const handleClick = () => {};

// Async/await over promises
async function fetchData() {
  try {
    const data = await service.getData();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Import organization
import React from 'react'; // React
import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Supabase
import { Button } from '../components/Button'; // Components
import { campaignService } from '../services/campaignService'; // Services
import './styles.css'; // Styles
```

### React Components

```javascript
// Functional components only
export function MyComponent({ title, onClick }) {
  const [state, setState] = useState(null);

  const handleAction = useCallback(() => {
    setState(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-4">
      <h2>{title}</h2>
      <Button onClick={handleAction}>Click me</Button>
    </div>
  );
}
```

### Error Handling

```javascript
// Always provide user feedback
try {
  await service.action();
  setSuccess('Action completed successfully');
} catch (error) {
  console.error('Error details:', error);
  setError(error.message || 'An error occurred');
}

// Log for debugging
logger.error('Context information', { userId, campaignId });
```

### Database Queries

```javascript
// Supabase queries with error handling
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('id', id);

if (error) {
  throw new Error(`Failed to fetch: ${error.message}`);
}

return data;
```

## Development Workflow

### Feature Development

1. Create a branch:
   ```bash
   git checkout -b feature/campaign-export
   ```

2. Make changes with proper commits:
   ```bash
   git add .
   git commit -m "feat: add campaign export functionality"
   ```

3. Update related documentation
4. Test thoroughly
5. Create pull request

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, test, chore

Examples:
- `feat(campaigns): add CSV export feature`
- `fix(worker): handle Africa's Talking API timeout`
- `docs(readme): update installation instructions`
- `refactor(services): simplify error handling`

## Testing

### Frontend Testing

```bash
# Unit tests
cd frontend
npm test

# Test example
test('should login successfully', async () => {
  const { getByText, getByPlaceholder } = render(<LoginPage />);
  
  fireEvent.change(getByPlaceholderText('Email'), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.click(getByText('Sign In'));
  
  await waitFor(() => {
    expect(getByText('Dashboard')).toBeInTheDocument();
  });
});
```

### Worker Testing

```bash
cd worker
npm test

# Test example
test('should send SMS successfully', async () => {
  const service = new AfricasTalkingService();
  const result = await service.sendSMS('+254712345678', 'Test');
  
  expect(result.success).toBe(true);
  expect(result.messageId).toBeDefined();
});
```

### Integration Testing

```bash
# Test full flow
1. Create campaign in dashboard
2. Verify queue entries created
3. Run worker
4. Check message statuses updated
5. Verify campaign metrics
```

## Database Development

### Schema Changes

```sql
-- Create new table
CREATE TABLE IF NOT EXISTS new_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index
CREATE INDEX idx_new_table_name ON new_table(name);

-- Add RLS policy
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY new_table_select ON new_table FOR SELECT USING (true);
```

### Migration Process

1. Create migration file:
   ```bash
   supabase migration new add_new_table
   ```

2. Edit the migration SQL

3. Apply locally:
   ```bash
   supabase db push
   ```

4. Test thoroughly

5. Deploy to production:
   ```bash
   supabase db push --remote
   ```

## Performance Optimization

### Frontend

```javascript
// Use useMemo for expensive calculations
const sortedCampaigns = useMemo(() => {
  return campaigns.sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  );
}, [campaigns]);

// Use useCallback for event handlers
const handleDelete = useCallback((id) => {
  campaignService.delete(id);
}, []);

// Lazy load images
<img loading="lazy" src="image.jpg" />
```

### Worker

```javascript
// Batch process for efficiency
const messages = await fetchPendingMessages(50);
for (const msg of messages) {
  await processMessage(msg);
  await delay(100); // Rate limiting
}

// Use connection pooling
const pool = new Pool({ max: 20 });
```

### Database

```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM sms_queue WHERE status = 'pending';

-- Create appropriate indexes
CREATE INDEX idx_queue_status_created ON sms_queue(status, created_at);

-- Vacuum regularly
VACUUM ANALYZE;
```

## Debugging Tips

### Frontend Debugging

1. **Browser DevTools**
   ```javascript
   // Add debugger breakpoint
   debugger;
   
   // Console logging
   console.log('Value:', value);
   console.error('Error:', error);
   console.table(data);
   ```

2. **React DevTools** - Install browser extension

3. **Network Tab** - Check API calls

### Worker Debugging

```javascript
import pino from 'pino';
const logger = pino();

logger.debug('Processing message', { messageId, phoneNumber });
logger.error('Failed to send', { error: error.message });
logger.warn('Retry attempt', { retryCount, maxRetries });
```

### Database Debugging

```sql
-- Check slow queries
SELECT query, calls, mean_time 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Check table sizes
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(tablename::regclass))
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY pg_total_relation_size(tablename::regclass) DESC;
```

## Common Pitfalls

### React Issues
- ❌ Not handling async state updates
- ✅ Use useEffect with proper cleanup

- ❌ Mutating state directly
- ✅ Use setState or spread operator

- ❌ Missing dependencies in useEffect
- ✅ Include all used variables

### Worker Issues
- ❌ No error handling in loops
- ✅ Wrap in try-catch blocks

- ❌ Hardcoded values
- ✅ Use environment variables

- ❌ No rate limiting
- ✅ Implement delays between requests

### Database Issues
- ❌ N+1 queries
- ✅ Batch queries and use joins

- ❌ Missing indexes
- ✅ Index frequently filtered columns

- ❌ No RLS policies
- ✅ Secure all tables with policies

## Getting Help

1. **Check existing issues** - Search GitHub
2. **Review documentation** - ARCHITECTURE.md, API.md
3. **Check logs** - Error messages often contain the answer
4. **Ask team** - Comment in pull requests
5. **Debug step-by-step** - Use browser/worker debugging

## Code Review Checklist

Before submitting PR, ensure:

- [ ] Code follows style guide
- [ ] All tests pass
- [ ] No console errors/warnings
- [ ] Comments for complex logic
- [ ] Error handling implemented
- [ ] No hardcoded values
- [ ] Performance acceptable
- [ ] Documentation updated
- [ ] Commit messages clear
- [ ] Works on multiple browsers (frontend)
