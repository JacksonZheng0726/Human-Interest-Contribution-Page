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
- 💹 **YTD Tracking**: Automatic year-to-date contribution calculation
- 🔮 **Retirement Projection**: Calculate projected savings at retirement age
- 📈 **Scenario Comparison**: Compare different contribution rates side-by-side
- 🗓️ **Monthly Processing**: Simulate monthly paycheck contributions
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

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     # Should output: v18.x.x or higher
     ```

2. **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
   - npm comes with Node.js
   - Verify installation:
     ```bash
     npm --version
     # Should output: 9.x.x or higher
     ```

3. **Docker Desktop** (v20.10.0 or higher)
   - Download from: https://www.docker.com/products/docker-desktop
   - Verify installation:
     ```bash
     docker --version
     # Should output: Docker version 20.x.x or higher
     
     docker-compose --version
     # Should output: Docker Compose version 2.x.x or higher
     ```

4. **Git** (v2.30.0 or higher)
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     # Should output: git version 2.x.x or higher
     ```

### System Requirements

- **OS**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free space
- **Ports**: Ensure ports 3000 (Next.js) and 5432 (PostgreSQL) are available

---

## 🚀 Installation & Setup

Follow these steps to get the application running locally:

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/401k-contribution-manager.git

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

**Expected output:**
```
added 500+ packages in 30s
```

If you encounter errors, try:
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
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

```env
# Database Configuration
DATABASE_USER=postgres
DATABASE_HOST=localhost
DATABASE_NAME=dev
DATABASE_PASSWORD=postgres
DATABASE_PORT=5432

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

# Verify containers are running
docker ps

# You should see:
# CONTAINER ID   IMAGE         PORTS                    NAMES
# xxxxxxxxxxxx   postgres:18   0.0.0.0:5432->5432/tcp   Human-Interest
```

**What happens:**
- PostgreSQL 18 container starts on port 5432
- Database initialization scripts run automatically:
  - Creates `dev` database
  - Creates `users`, `contribution_setting`, and `contribution_history` tables
  - Inserts sample data for testing

**To view logs:**
```bash
# View real-time logs
docker-compose logs -f

# View logs for specific service
docker-compose logs postgres
```

**To stop the database:**
```bash
# Stop containers but keep data
docker-compose stop

# Stop and remove containers (data persists in volumes)
docker-compose down

# Stop and remove everything including data (⚠️ destructive)
docker-compose down -v
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

-- View sample data
SELECT * FROM users;
SELECT * FROM contribution_setting;
SELECT * FROM contribution_history LIMIT 5;

-- Exit psql
\q
```

### Step 6: Start the Development Server

In a new terminal (keep the database running):

```bash
# Start Next.js development server
npm run dev

# You should see:
# ✓ Ready in 2.5s
# ○ Compiling / ...
# ✓ Compiled / in 1.2s
# ▲ Next.js 14.x.x
# - Local:        http://localhost:3000
```

**The application is now running!**

Open your browser and navigate to:
- **Application**: http://localhost:3000
- **Contribution Page**: http://localhost:3000/Contribution

### Step 7: Test the Application

1. **View User Information**
   - The page loads with sample user "Jackson Zheng"
   - Shows age, salary, and retirement age

2. **Update Contribution Settings**
   - Select contribution type (Percentage or Fixed)
   - Enter contribution amount
   - Click "Save Contribution Rate"

3. **View Contribution History**
   - Scroll down to see past contributions
   - Check year-to-date total

4. **Calculate Retirement Projection**
   - Enter retirement details
   - Click "Calculate Projection"
   - Compare different contribution rates

---

## 📁 Project Structure

```
401k-contribution-manager/
├── src/
│   ├── app/
│   │   ├── Contribution/
│   │   │   ├── action.ts           # Server actions (API endpoints)
│   │   │   ├── view.tsx            # Main UI component
│   │   │   ├── page.tsx            # Route handler
│   │   │   └── Contribution.css    # Styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   │
│   ├── Service/
│   │   ├── Contribution/
│   │   │   ├── dbService.ts        # Database operations
│   │   │   ├── service.ts          # Business logic
│   │   │   └── index.ts            # Type definitions
│   │   │
│   │   └── User/
│   │       ├── dbService.ts        # User database operations
│   │       ├── service.ts          # User business logic
│   │       └── index.ts            # User type definitions
│   │
│   └── lib/
│       └── db.ts                   # Database connection pool
│
├── docker/
│   ├── init/
│   │   ├── 1.user.sql              # User table schema
│   │   ├── 2.schema.sql            # Contribution tables schema
│   │   └── 3.data.sql              # Sample data
│   └── Dockerfile.postgres         # PostgreSQL Docker config
│
├── docker-compose.yml              # Docker Compose configuration
├── package.json                    # Node.js dependencies
├── tsconfig.json                   # TypeScript configuration
├── next.config.js                  # Next.js configuration
├── .env.local                      # Environment variables (create this)
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

### Key Directories Explained

- **`src/app/`**: Next.js 14 App Router pages and routes
- **`src/Service/`**: Business logic and database operations (separated by domain)
- **`src/lib/`**: Shared utilities and configurations
- **`docker/`**: Database initialization scripts and Docker configs
- **`docker/init/`**: SQL scripts run on first database startup

---

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run type-check

# Lint code
npm run lint

# Format code with Prettier
npm run format
```

### Database Management

```bash
# Start database
docker-compose up -d

# Stop database (keeps data)
docker-compose stop

# Restart database
docker-compose restart

# View database logs
docker-compose logs -f postgres

# Remove database (⚠️ deletes all data)
docker-compose down -v

# Connect to database
docker exec -it Human-Interest psql -U postgres -d dev

# Backup database
docker exec Human-Interest pg_dump -U postgres dev > backup.sql

# Restore database
docker exec -i Human-Interest psql -U postgres dev < backup.sql
```

### Useful Database Commands (Inside psql)

```sql
-- List all databases
\l

-- List all tables
\dt

-- Describe a table structure
\d users
\d contribution_setting
\d contribution_history

-- View all users
SELECT * FROM users;

-- View contribution settings
SELECT * FROM contribution_setting;

-- View recent contributions
SELECT * FROM contribution_history ORDER BY contribution_date DESC LIMIT 10;

-- Calculate YTD for 2025
SELECT user_id, SUM(amount) as ytd
FROM contribution_history
WHERE EXTRACT(YEAR FROM contribution_date) = 2025
GROUP BY user_id;

-- Exit psql
\q
```

---

## 🗄 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  date_of_birth DATE,
  current_salary DECIMAL(12, 2),
  current_age INTEGER,
  retirement_age INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose**: Stores user profile information including salary and retirement details.

### Contribution Settings Table

```sql
CREATE TABLE contribution_setting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  contribution_type VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Purpose**: Stores user's contribution preferences (one row per user).

### Contribution History Table

```sql
CREATE TABLE contribution_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  contribution_date DATE NOT NULL,
  contribution_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Purpose**: Stores each individual contribution transaction for audit trail and reporting.

---

## 📖 Usage Guide

### Setting Up a New User

```sql
-- Connect to database
docker exec -it Human-Interest psql -U postgres -d dev

-- Insert new user
INSERT INTO users (id, name, email, current_age, retirement_age, current_salary)
VALUES ('user123', 'John Doe', 'john@example.com', 30, 65, 80000.00);

-- Set contribution preferences
INSERT INTO contribution_setting (user_id, contribution_type, amount)
VALUES ('user123', 'percentage', 10.00);
```

### Adding Historical Contributions

```sql
-- Add multiple months of contributions
INSERT INTO contribution_history (user_id, amount, contribution_date, contribution_type)
VALUES 
  ('user123', 666.67, '2025-01-15', 'percentage'),
  ('user123', 666.67, '2025-02-15', 'percentage'),
  ('user123', 666.67, '2025-03-15', 'percentage');
```

### Calculating Projections

The application uses this formula for retirement projections:

```
Future Value = PMT × [((1 + r)^n - 1) / r]

Where:
- PMT = Monthly contribution amount
- r = Monthly return rate (annual rate / 12)
- n = Number of months until retirement
```

**Example:**
- Current age: 30
- Retirement age: 65
- Annual salary: $80,000
- Contribution rate: 10%
- Expected return: 7% annually

**Calculation:**
```
Monthly contribution = ($80,000 / 12) × 10% = $666.67
Monthly return = 7% / 12 = 0.5833%
Months = (65 - 30) × 12 = 420 months

Future value = $666.67 × [((1.005833)^420 - 1) / 0.005833]
             ≈ $1,871,000
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port 3000
# On macOS/Linux:
lsof -i :3000

# On Windows:
netstat -ano | findstr :3000

# Kill the process
# On macOS/Linux:
kill -9 <PID>

# On Windows:
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

#### 2. Database Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
```bash
# Check if Docker is running
docker ps

# If no containers, start database
docker-compose up -d

# Check logs
docker-compose logs postgres

# Verify PostgreSQL is ready
docker exec Human-Interest pg_isready -U postgres
```

#### 3. Module Not Found

**Error:**
```
Module not found: Can't resolve 'pg'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# If still failing, install pg specifically
npm install pg @types/pg
```

#### 4. TypeScript Errors

**Error:**
```
Type 'X' is not assignable to type 'Y'
```

**Solution:**
```bash
# Check TypeScript configuration
npm run type-check

# Restart VS Code TypeScript server
# In VS Code: Cmd/Ctrl + Shift + P → "Restart TS Server"

# Ensure all types are installed
npm install --save-dev @types/node @types/react
```

#### 5. Docker Compose Version Issues

**Error:**
```
docker-compose: command not found
```

**Solution:**
```bash
# Docker Compose V2 uses different command
docker compose up -d  # Note: no hyphen

# Or install Docker Compose V1
# Follow instructions at: https://docs.docker.com/compose/install/
```

#### 6. Database Initialization Issues

**Problem:** Tables not created or sample data missing

**Solution:**
```bash
# Reset database completely
docker-compose down -v
docker-compose up -d

# Wait 10 seconds for initialization
sleep 10

# Verify tables exist
docker exec -it Human-Interest psql -U postgres -d dev -c "\dt"

# If still issues, check init scripts
docker exec -it Human-Interest ls /docker-entrypoint-initdb.d/
```

### Getting Help

If you encounter other issues:

1. **Check Logs:**
   ```bash
   # Next.js logs
   # (in terminal where npm run dev is running)
   
   # Database logs
   docker-compose logs postgres
   ```

2. **Verify Environment:**
   ```bash
   # Check Node.js version
   node --version
   
   # Check npm version
   npm --version
   
   # Check Docker version
   docker --version
   ```

3. **Search Issues:**
   - Check GitHub Issues
   - Search Stack Overflow
   - Review Next.js documentation

4. **Create an Issue:**
   - Provide error messages
   - Include system information
   - Describe steps to reproduce

---

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Page loads successfully
- [ ] User information displays correctly
- [ ] Can select contribution type (percentage/fixed)
- [ ] Can enter contribution amount
- [ ] Save button works and shows success message
- [ ] Contribution history displays (if data exists)
- [ ] YTD calculation is accurate
- [ ] Retirement projection calculates correctly
- [ ] Comparison feature works
- [ ] Responsive on mobile devices

### Sample Test Scenarios

**Scenario 1: New User Setup**
1. Clear browser cache
2. Visit http://localhost:3000/Contribution
3. Verify page loads with default user
4. Change contribution to 15%
5. Click "Save Contribution Rate"
6. Verify success message appears

**Scenario 2: Historical Data**
1. Add sample contributions via SQL (see Usage Guide)
2. Refresh page
3. Verify contribution history table shows data
4. Verify YTD matches sum of current year contributions

**Scenario 3: Retirement Projection**
1. Fill in current age: 30
2. Fill in retirement age: 65
3. Fill in salary: $80,000
4. Fill in current balance: $10,000
5. Set contribution: 10%
6. Click "Calculate Projection"
7. Verify result makes sense (~$1.8M)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Setup for Development

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Test thoroughly
5. Commit with clear messages:
   ```bash
   git commit -m "Add feature: description"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Create a Pull Request

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing code structure
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names
- Run `npm run lint` before committing

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear
- [ ] PR description explains changes

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- PostgreSQL community for the reliable database
- Docker for making development environments consistent
- All contributors and users of this project

---

## 📞 Support

- **Email**: support@401k-manager.com
- **GitHub Issues**: https://github.com/yourusername/401k-contribution-manager/issues
- **Documentation**: https://github.com/yourusername/401k-contribution-manager/wiki

---

## 🎉 You're All Set!

The application should now be running at http://localhost:3000/Contribution

**Quick Start Commands:**
```bash
# Clone and setup
git clone https://github.com/yourusername/401k-contribution-manager.git
cd 401k-contribution-manager
npm install

# Start services
docker-compose up -d    # Terminal 1: Database
npm run dev             # Terminal 2: Application

# Open browser
# http://localhost:3000/Contribution
```

**Happy Contributing! 🚀💰**
