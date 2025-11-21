# 401(k) Contribution Manager 💰

A modern web application for managing 401(k) retirement contributions, tracking contribution history, and projecting retirement savings.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## ✨ Features

- 🎯 **Contribution Settings**: Choose between percentage-based or fixed dollar contributions
- 📊 **Contribution History**: Track all past contributions with detailed history
- 🔮 **Retirement Projection**: Calculate projected savings at retirement age
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎨 **Modern UI**: Gradient design with smooth animations

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **CSS Modules** - Scoped styling
- **React Server Components** - Optimal performance

### Backend
- **Next.js Server Actions** - Serverless API endpoints
- **Node.js** - JavaScript runtime
- **PostgreSQL 18** - Relational database
- **node-postgres (pg)** - Database driver

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration


## Installation & Setup

Follow these steps to get the application running locally:

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone git@github.com:JacksonZheng0726/Human-Interest-Contribution-Page.git

# Navigate to the project directory
cd 401k-contribution-manager
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - Next.js and React dependencies
# - TypeScript and type definitions
# - PostgreSQL client (pg)
# - All other required packages from package.json
```
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# For macOS/Linux
touch .env.local

# For Windows (PowerShell)
New-Item .env.local -ItemType File
```

Add the following environment variables:

```
POSTGRES_DB=dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
MASTER_SECRET=tZCKhcLZZRUQo4T0eR9p9jc6UnrQuDWX

# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important Notes:**
- Never commit `.env.local` to version control
- These are default values for local development
- Change credentials in production environments

### Step 4: Start the Database

Open a terminal and start the PostgreSQL container:

```bash
# Start Docker containers in detached mode
docker-compose up -d

```

**To stop the database:**
```bash

# Stop and remove containers (data persists in volumes)
docker-compose down

```

### Step 5: Verify Database Setup

Connect to the database to verify it's working:

```bash
# Connect to PostgreSQL container
docker exec -it Human-Interest psql -U postgres -d dev

# You should see:
# psql (18.0 (Debian 18.0-1.pgdg13+3))
# Type "help" for help.
# dev=#
```

Run some test queries:

```sql
-- List all tables
\dt

-- Should show:
--  public | contribution_history  | table | postgres
--  public | contribution_setting  | table | postgres
--  public | users                 | table | postgres

-- Exit psql
\q
```

### Step 6: Start the Development Server

In a new terminal (keep the database running):

```bash
# Start Next.js development server
npm run dev

expected_out: http://localhost:3000
```
