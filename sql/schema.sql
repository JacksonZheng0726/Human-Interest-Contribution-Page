DROP TABLE IF EXISTS member CASCADE;

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  monthly_salary DECIMAL(12, 2),
  current_age INTEGER,
  retirement_age INTEGER DEFAULT 65,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE contribution_setting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  contribution_type VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contribution_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  contribution_date DATE NOT NULL,
  contribution_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);