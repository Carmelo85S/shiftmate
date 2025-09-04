# ShiftMate

**ShiftMate** is a web application designed to connect businesses and workers. Businesses can post jobs or shifts, and workers can browse, apply, and manage applications—all in one platform. Both users can create profiles to showcase skills, experience, and business details, making it easy to find the right match.  

---

## Features

- **Dual registration:** Users can sign up as a **Business** or a **Worker**.  
- **Job posting & management:** Businesses can create, update, and manage job listings.  
- **Job browsing & applications:** Workers can search for jobs and apply directly through the app.  
- **Profile management:** Both businesses and workers can build detailed profiles.  
- **Messaging:** Direct messaging between users.  
- **Search & filtering:** Quickly find jobs or workers with search functionality.  
- **Application & statistics tracking:** Monitor applications, jobs posted, and user activity.  

---

## How It Works

1. **Register as a Business or Worker**  
   - Businesses post jobs and manage listings.  
   - Workers browse jobs and apply to the ones they like.  

2. **Create a profile**  
   - Workers showcase skills, experience, and availability.  
   - Businesses highlight their company and job opportunities.  

3. **Interact & Apply**  
   - Workers apply to jobs directly through the app.  
   - Businesses can review applications and message candidates.  

4. **Search & Discover**  
   - Use the search bar to find jobs (workers) or candidates (businesses).  

ShiftMate simplifies hiring and job hunting—no messy emails, just a smooth way to connect.  

---

## Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** Supabase  
- **Authentication:** Supabase Auth  
- **Environment Variables:** dotenv  
- **CORS Handling:** cors  

---

## Getting Started

### Prerequisites

- Node.js >= 18  
- npm or yarn  
- Supabase account  

### Installation

1. **Clone the repository**  

```bash
git clone https://github.com/Carmelo85S/shiftmate.git
cd shiftmate

# Server
cd server
npm install

# Client
cd ../client
npm install

# Setup environment variables
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# API Routes
Authentication
POST /api/register – Register as Business or Worker
POST /api/login – Login

Profile
GET /api/profile/:userId – Get profile information
PUT /api/profile/:userId – Update profile

Jobs
POST /api/jobs – Create a job (Business only)
GET /api/jobs – Get all jobs
GET /api/jobs/:id – Get job details

Applications
POST /api/applications – Apply for a job (Worker only)
GET /api/applications/:userId – Get all applications for a user

Search
GET /api/search – Search for jobs or workers

Messages
POST /api/messages – Send a message
GET /api/messages/:userId – Get all messages for a user

Statistics
GET /api/stats – Get total users and total jobs

