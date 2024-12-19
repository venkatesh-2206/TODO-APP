CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(100) NOT NULL UNIQUE,
  user_password VARCHAR(50)
);
CREATE TABLE bucket (
  bucket_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  bucket_name VARCHAR(50)
);
CREATE TABLE task (
  task_id SERIAL PRIMARY KEY,
  bucket_id INT REFERENCES bucket(bucket_id) ON DELETE CASCADE,
  task_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL 
);
SELECT * FROM users;
SELECT * FROM bucket;
SELECT * FROM task;