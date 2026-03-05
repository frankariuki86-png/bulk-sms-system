# API Reference

## Campaigns API

### Create Campaign

```http
POST /api/campaigns
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "March Campaign",
  "message": "Hello from our service",
  "groupName": "customers"
}
```

Response:
```json
{
  "id": "uuid",
  "name": "March Campaign",
  "message": "Hello from our service",
  "status": "draft",
  "total_sms": 1000,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Get Campaigns

```http
GET /api/campaigns
Authorization: Bearer {token}
```

Query params:
- `status`: Filter by status (draft|sending|completed)
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset

### Get Campaign Details

```http
GET /api/campaigns/{id}
Authorization: Bearer {token}
```

### Update Campaign Status

```http
PATCH /api/campaigns/{id}/status
Authorization: Bearer {token}

{
  "status": "sending"
}
```

### Delete Campaign

```http
DELETE /api/campaigns/{id}
Authorization: Bearer {token}
```

## Contacts API

### Upload Contacts

```http
POST /api/contacts/upload
Content-Type: multipart/form-data
Authorization: Bearer {token}

FormData:
  file: <CSV file>
  groupName: "customers"
```

CSV Format:
```csv
name,phone_number
John Doe,+254712345678
Jane Smith,+254712345679
```

### Get Contacts

```http
GET /api/contacts?group=customers&limit=100&offset=0
Authorization: Bearer {token}
```

### Get Contact Groups

```http
GET /api/contacts/groups
Authorization: Bearer {token}
```

Response:
```json
{
  "groups": ["customers", "prospects", "vip"]
}
```

### Delete Contact

```http
DELETE /api/contacts/{id}
Authorization: Bearer {token}
```

## SMS Queue API

### Get Queue Status

```http
GET /api/queue/status/{campaignId}
Authorization: Bearer {token}
```

Response:
```json
{
  "pending": 500,
  "sent": 400,
  "failed": 50,
  "bounced": 50
}
```

### Get Message Details

```http
GET /api/queue/messages/{campaignId}?status=pending&limit=50
Authorization: Bearer {token}
```

### Retry Failed Messages

```http
POST /api/queue/retry/{campaignId}
Authorization: Bearer {token}

{
  "status": "failed"
}
```

## Authentication API

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "admin@example.com"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### Logout

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

## Reports API

### Campaign Report

```http
GET /api/reports/campaigns/{id}
Authorization: Bearer {token}
```

Response:
```json
{
  "campaignId": "uuid",
  "name": "March Campaign",
  "totalMessages": 1000,
  "sentMessages": 950,
  "failedMessages": 50,
  "successRate": 95,
  "averageDeliveryTime": 45,
  "createdAt": "2024-01-15T10:30:00Z",
  "completedAt": "2024-01-15T14:30:00Z"
}
```

### Delivery Report

```http
GET /api/reports/delivery?campaignId={id}&status=failed&limit=50
Authorization: Bearer {token}
```

## Error Responses

All endpoints return standardized error responses:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Validation failed",
    "details": {
      "name": "Name is required"
    }
  }
}
```

### Common Error Codes

- `INVALID_REQUEST` (400) - Validation error
- `UNAUTHORIZED` (401) - Missing/invalid token
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource conflict
- `INTERNAL_ERROR` (500) - Server error

## Rate Limiting

All endpoints are rate limited:
- Authenticated users: 100 requests/minute
- Anonymous users: 10 requests/minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642262400
```

## Pagination

Use `limit` and `offset` for pagination:

```http
GET /api/campaigns?limit=50&offset=100
```

Response includes:
```json
{
  "data": [...],
  "total": 500,
  "limit": 50,
  "offset": 100,
  "hasMore": true
}
```
