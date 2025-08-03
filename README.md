# ShiftMate - Job Management System

ShiftMate is a full-stack web application designed to simplify the connection between workers and businesses through efficient job listings and application management.

---

## Overview

This app allows two types of users:

- **Businesses**: Can register, create profiles, post job offers, and manage applicants.
- **Workers**: Can register, create profiles, browse available jobs, and apply.

ShiftMate provides tailored dashboards for both user types, showing real-time statistics, job history, and profile information.

---

## Key Features

- **User Registration & Authentication**  
  Users can register as either a Business or a Worker. Passwords are securely hashed and stored with assigned roles.

- **Profile Management**  
  Both user types can create and update detailed profiles.

- **Job Posting & Application**  
  Businesses can post multiple job offers specifying details like title, description, location, employment type, salary range, and requirements.  
  Workers can browse these jobs and apply directly.

- **Dashboards**  
  - Businesses see posted jobs and applications, plus real-time stats (number of users, number of posts).  
  - Workers see their applied jobs and relevant statistics.

- **Filtering & Searching (Business Only)**  
  Businesses can filter worker candidates by availability (e.g., full-time, part-time) and skills using a built-in search bar.

- **Application Messaging**  
  When a worker applies for a job, the business receives an **automatically generated message** containing the worker’s info (name, email, and profile details).  
  **Note:** This is not an email notification system — the message is stored and displayed within the app interface only.

- **Session Management**  
  Users can securely log out, ending their session.

---

## Tech Stack

- **Frontend:** React  
- **Backend:** Node.js with Express  
- **Database:** PostgreSQL managed with Supabase


License
This project is licensed under the MIT License.
