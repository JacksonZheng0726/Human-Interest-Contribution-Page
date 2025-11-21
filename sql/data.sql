INSERT INTO users (id, email, name, date_of_birth, monthly_salary, current_age, retirement_age)
  VALUES ('jack123', 'jackson@gmail.com', 'Jackson Zheng', '2004-07-26', 8000.00, 21, 65)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contribution_setting (user_id, contribution_type, amount)
VALUES 
  ('jack123', 'percentage', 10.00)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO contribution_history (user_id, amount, contribution_date, contribution_type)
VALUES 
  ('jack123', 800.00, '2025-06-15', 'percentage'),
  ('jack123', 800.00, '2025-07-15', 'percentage'),
  ('jack123', 800.00, '2025-08-15', 'percentage'),
  ('jack123', 800.00, '2025-09-15', 'percentage'),
  ('jack123', 800.00, '2025-10-15', 'percentage'),
  ('jack123', 800.00, '2025-11-15', 'percentage');



