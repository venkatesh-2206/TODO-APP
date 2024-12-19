-- fetching all records
select * from users;
select * from bucket;
select * from task;
--fetching buckets based on user_id
select * from bucket where user_id=1;
--fetching buckets based on bucket_id
select * from bucket where bucket_id=1;
-- fetching tasks based on bucket_id;
select * from task where bucket_id=1;
-- fetching tasks based on status
select * from task where status='Pending';
--fetching status based on task_name
select status from task where task_name='Write Unit Tests';
--fetching bucket and task based on user_id
select users.user_id,users.user_email,bucket.bucket_name,bucket.bucket_id,task.task_name 
from users inner join bucket on bucket.user_id=users.user_id inner join task on 
task.bucket_id=bucket.bucket_id where users.user_id=1;
--fetching bucket,task and their status based on user_id
select users.user_id,users.user_email,bucket.bucket_name,bucket.bucket_id,task.task_name,task.status
from users inner join bucket on bucket.user_id=users.user_id inner join task on 
task.bucket_id=bucket.bucket_id where users.user_id=1;
--fetching bucket,task and based on user_id and status
select users.user_id,users.user_email,bucket.bucket_name,bucket.bucket_id,task.task_name 
from users inner join bucket on bucket.user_id=users.user_id inner join task on 
task.bucket_id=bucket.bucket_id where users.user_id=1 and task.status='Pending';
--fetching count of the task based on status
select count(*)as pendingcount from task where status='Pending';
-- fetching count of the status by grouping
select task.status, count(task.status) AS status_count
from task group by task.status;
-- fetching count of the status by grouping and ordering
select task.status, count(task.status) AS status_count
from task group by task.status order by status_count desc;
-- fetching count of task pending for the user based on user id
select users.user_id,bucket.bucket_name,count(task.status)as statuscount from users inner join
bucket on users.user_id=bucket.user_id inner join task on task.bucket_Id=bucket.bucket_id 
where users.user_id=1 and task.status='Pending' group by users.user_id,bucket.bucket_id;
-- fetching count of task pending for the user based on user id
select users.user_id,bucket.bucket_name,task.task_name,count(task.status)as statuscount from users inner join
bucket on users.user_id=bucket.user_id inner join task on task.bucket_Id=bucket.bucket_id 
where users.user_id=1 and task.status='Pending' group by
users.user_id,bucket.bucket_id,task.task_name;
--fetching all data for the user
select users.user_id,bucket.bucket_id,bucket.bucket_name,task.task_name,task.status from users 
full join bucket on bucket.user_id=users.user_id full join task on task.bucket_id=bucket.bucket_id 
where users.user_id=1;
--subqueries 
-- count the task for each bucket
select bucket_name,(select count(*)task_name from task where task.bucket_id=bucket.bucket_id )
as taskcount from bucket;
--fetching the bucket name based on task 
select task.task_name,bucket.bucket_name from task inner join bucket on 
bucket.bucket_id=task.bucket_id;
--fetching the bucket name which has is greater than 2 tasks;
select bucket.bucket_name from bucket full join task on 
task.bucket_id=bucket.bucket_id group by bucket_name having count(task.task_id)>2; 