# Smart Leads Dashboard API

## Authentication

All protected routes require a `Bearer` token in the `Authorization` header.

### `POST /api/auth/register`
Create a new account.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password123",
  "role": "sales"
}
```

Roles:
- `admin`
- `sales`

### `POST /api/auth/login`
Authenticate a user and receive a JWT.

### `GET /api/auth/me`
Return the current authenticated user.

## Leads

### `GET /api/leads`
Return paginated leads.

Query parameters:
- `status=New|Contacted|Qualified|Lost`
- `source=Website|Instagram|Referral`
- `search=<text>`
- `sort=latest|oldest`
- `page=<number>`

Example:

```text
GET /api/leads?status=Qualified&source=Instagram&search=rahul&sort=latest&page=1
```

Response:

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "totalPages": 5,
    "totalRecords": 50
  }
}
```

### `GET /api/leads/:id`
Return a single lead.

### `POST /api/leads`
Create a lead. Available to `admin` and `sales`.

### `PUT /api/leads/:id`
Update a lead. Available to `admin` and `sales`.

### `DELETE /api/leads/:id`
Delete a lead. Admin only.

## Dashboard

### `GET /api/dashboard/stats`
Return summary statistics and recent leads.

## Error Format

```json
{
  "success": false,
  "message": "Human readable error message"
}
```
