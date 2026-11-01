# HandHold Backend (starter)

Express + PostgreSQL + Prisma REST API starter for the HandHold mentoring platform.

## Requirements
- Node.js 20+
- PostgreSQL 14+

## Setup (PowerShell or terminal)
1. Open a terminal in `backend`.
2. Install packages: `npm install`
3. Copy `.env.example` to `.env` and set your PostgreSQL password and a long random `JWT_SECRET`.
4. Create a PostgreSQL database named `handhold` (or update `DATABASE_URL`).
5. Run `npx prisma generate`
6. Run `npx prisma migrate dev --name init`
7. Start the API: `npm run dev`
8. Test `http://localhost:5000/api/health`.

## Main endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| POST | `/api/auth/signup` | Create student/mentor account |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Current authenticated user |
| GET, PUT | `/api/students/profile` | Read/update student profile |
| GET | `/api/mentors` | List mentor accounts |
| GET | `/api/mentors/students` | Mentor's assigned students |
| GET, POST | `/api/meetings` | List/request meetings |
| PATCH | `/api/meetings/:id` | Update meeting status |
| GET, POST | `/api/goals` | List/create goals |
| PATCH, DELETE | `/api/goals/:id` | Update/delete goal |
| POST | `/api/feedback` | Submit feedback |

Protected endpoints require `Authorization: Bearer <token>`.

## Frontend connection
Set `VITE_API_URL=http://localhost:5000/api` in the frontend `.env` when you begin connecting React to the API. The existing frontend pages are retained. The newly completed pages currently use browser localStorage as a demo until API integration is done.

## Important
This is a development starter, not production-ready authentication. Before deployment, configure HTTPS, secure secrets, rate limiting, request validation, logging, and account recovery. Do not commit `.env` or real credentials.
