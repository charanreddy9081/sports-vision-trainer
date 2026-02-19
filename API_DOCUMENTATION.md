# API Documentation

Base URL: `http://localhost:5000/api` (development) or your production URL

All endpoints require authentication unless specified otherwise. Authentication is handled via HTTP-only cookies.

## Authentication Endpoints

### POST /api/auth/signup

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

**Response:** `201 Created`
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "subscription": "FREE"
  }
}
```

**Errors:**
- `400` - Validation error or user already exists
- `500` - Server error

---

### POST /api/auth/login

Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "subscription": "FREE"
  }
}
```

**Errors:**
- `401` - Invalid credentials
- `400` - Validation error

---

### POST /api/auth/logout

Logout current user (requires authentication).

**Response:** `200 OK`
```json
{
  "message": "Logout successful"
}
```

---

### POST /api/auth/refresh

Refresh access token using refresh token.

**Response:** `200 OK`
```json
{
  "message": "Token refreshed",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "subscription": "FREE"
  }
}
```

---

### GET /api/auth/me

Get current authenticated user (requires authentication).

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "subscription": "FREE",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Training Endpoints

### POST /api/training/create

Create a new training session (requires authentication).

**Request Body:**
```json
{
  "moduleType": "REACTION",
  "score": 100,
  "accuracy": 95.5,
  "reactionTime": 250.5,
  "duration": 60
}
```

**Module Types:** `REACTION`, `TRACKING`, `COLOR_MATCH`, `TARGET_HIT`

**Response:** `201 Created`
```json
{
  "message": "Training session created",
  "trainingSession": {
    "id": "uuid",
    "userId": "uuid",
    "moduleType": "REACTION",
    "score": 100,
    "accuracy": 95.5,
    "reactionTime": 250.5,
    "duration": 60,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### GET /api/training/user/:id

Get training sessions for a user (requires authentication).

**Response:** `200 OK`
```json
{
  "sessions": [
    {
      "id": "uuid",
      "userId": "uuid",
      "moduleType": "REACTION",
      "score": 100,
      "accuracy": 95.5,
      "reactionTime": 250.5,
      "duration": 60,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/training/stats

Get training statistics for current user (requires authentication).

**Response:** `200 OK`
```json
{
  "totalSessions": 50,
  "totalScore": 5000,
  "avgAccuracy": 87.5,
  "avgReactionTime": 245.3,
  "streak": 5,
  "statsByModule": {
    "REACTION": {
      "count": 20,
      "avgScore": 100,
      "avgAccuracy": 90,
      "avgReactionTime": 240
    },
    "TRACKING": {
      "count": 15,
      "avgScore": 80,
      "avgAccuracy": 85
    },
    "COLOR_MATCH": {
      "count": 10,
      "avgScore": 90,
      "avgAccuracy": 88
    },
    "TARGET_HIT": {
      "count": 5,
      "avgScore": 75,
      "avgAccuracy": 82
    }
  },
  "recentSessions": [...]
}
```

---

## Leaderboard Endpoints

### GET /api/leaderboard

Get top 10 users on leaderboard (requires authentication).

**Response:** `200 OK`
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "uuid",
      "name": "John Doe",
      "totalScore": 10000
    }
  ],
  "currentUserRank": 5
}
```

---

## Subscription Endpoints

### POST /api/subscription/upgrade

Upgrade user subscription (requires authentication).

**Request Body:**
```json
{
  "plan": "PRO"
}
```

**Plans:** `FREE`, `PRO`

**Response:** `200 OK`
```json
{
  "message": "Subscription upgraded successfully",
  "subscription": "PRO"
}
```

---

### GET /api/subscription/status

Get subscription status for current user (requires authentication).

**Response:** `200 OK`
```json
{
  "subscription": "PRO",
  "activeSubscription": {
    "plan": "PRO",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-31T00:00:00.000Z"
  }
}
```

---

## Admin Endpoints

All admin endpoints require `ADMIN` role.

### GET /api/admin/users

Get all users (requires admin authentication).

**Response:** `200 OK`
```json
{
  "users": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "subscription": "FREE",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "_count": {
        "trainingSessions": 50
      }
    }
  ]
}
```

---

### DELETE /api/admin/user/:id

Delete a user (requires admin authentication).

**Response:** `200 OK`
```json
{
  "message": "User deleted successfully"
}
```

**Errors:**
- `400` - Cannot delete own account
- `404` - User not found

---

### GET /api/admin/analytics

Get platform analytics (requires admin authentication).

**Response:** `200 OK`
```json
{
  "totalUsers": 100,
  "totalSessions": 5000,
  "totalProUsers": 25,
  "recentSessions": [...],
  "sessionsByModule": [
    {
      "moduleType": "REACTION",
      "count": 2000
    }
  ]
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message"
}
```

**Status Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- Authentication endpoints: 5 requests per 15 minutes
- Other endpoints: 100 requests per 15 minutes

## Authentication

Authentication uses HTTP-only cookies:
- `accessToken` - Valid for 15 minutes
- `refreshToken` - Valid for 7 days

Include cookies automatically with requests. The frontend handles token refresh automatically.
