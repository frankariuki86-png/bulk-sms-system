## SMS Analytics & Dashboard

### Dashboard Metrics

The system tracks the following metrics:

- **Total Campaigns**: Number of campaigns created
- **Total Messages**: Aggregate SMS across all campaigns
- **Sent Messages**: Successfully delivered messages
- **Failed Messages**: Messages that failed delivery
- **Success Rate**: Percentage of successful sends
- **Average Delivery Time**: Time from creation to delivery

### Campaign Status Tracking

- **Draft**: Campaign created, not yet sent
- **Sending**: Campaign in progress
- **Completed**: All messages processed
- **Paused**: Campaign paused by admin

### Message Status Flow

```
┌─────────────┐
│    Draft    │
└──────┬──────┘
       │
       v
┌─────────────┐      ┌─────────┐
│   Pending   ├─────>│  Sent   │
└──────┬──────┘      └─────────┘
       │
       v
┌─────────────┐      ┌─────────┐
│   Failed    ├─────>│ Retry   │
└─────────────┘      └─────────┘
       │
       v
┌─────────────┐
│   Bounced   │
└─────────────┘
```

### Tracking Implementation

1. **Queue Statistics** - Real-time counts of pending/sent/failed
2. **Campaign Progress** - Shows percentage of messages sent
3. **Delivery Reports** - Detailed logs for each message
4. **Error Tracking** - Reasons for failures with retry logic

### Monitoring & Alerting

Implement monitoring for:
- Stuck messages (pending for > 1 hour)
- High failure rates (> 5%)
- API rate limit violations
- Worker process health
