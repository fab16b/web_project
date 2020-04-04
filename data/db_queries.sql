-- db_queries.sql
-- all courses
select * from course order by title;

-- course + prereq
select c.id, c.title, c.description, c.created_date, 
p.id as p_id, p.title as p_title, p.description as p_description 
from course c 
left outer join prereqs i on (i.course_id = c.id) 
left outer join course p on (i.prereq_id = p.id) 
order by c.title;
