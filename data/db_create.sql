-- dbcreate.sql
-- 20S IT325 Reeves
-- https://codeshack.io/basic-login-system-nodejs-express-mysql/
-- 
-- add courses
--
drop database `web2_01_amg16h`;
CREATE DATABASE `web2_01_amg16h` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `web2_01_amg16h`;

drop table if exists `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

select 'inserting accounts';

INSERT INTO `accounts` 
(`username`, `password`, `email`, `role`) VALUES 
('test', 'test', 'test@test.com', 'member'),
('boss', 'boss', 'boss@test.com', 'admin'),
('admin', 'admin', 'admin@test.com', 'admin'),
('dean', 'dean', 'dean@test.com', 'member'),
('teacher1', 'teacher1', 'brent.reeves@acu.edu', 'member');

--
-- special dispensation mysql_native_password
-- 
drop user if exists 'blee'@'localhost';

create user 'blee'@'localhost' identified with mysql_native_password by 'Blee';

grant all on web2_01_amg16h.accounts to 'blee'@'localhost';


drop table if exists course;
create table course (
    id int not null auto_increment PRIMARY KEY,
    title varchar(255) not null,
    description text not null,
    prerequisites varchar(255),
    created_date date,
    submitted_by int, -- 1-M
    approved_by int -- 1-M
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

grant all on web2_01_amg16h.course to 'blee'@'localhost';

select 'inserting course';

insert into course 
(id, title, description, prerequisites, created_date, submitted_by, approved_by)
values
(1, 'CS374', 'Introduction to Software Engineering', 'P1, P2, OOP', '2003-01-02', 1, 4),
(2, 'IT325', 'Introduction to Web Technologies', 'P1, DB1', '2005-03-04', 1, 5),
(3, 'CS120', 'Introduction to Programming', 'Life', '2006-01-02', 2, 4),
(4, 'ITC110', 'Introduction to Introductions', 'Happiness', '2007-02-03', 2, 5),
(5, 'MATH109', 'Introduction to Maths', 'Yo', '2008-01-01', 2, 5),
(6, 'CS130', 'Data Structures', '', '2009-02-03', 2, 5),
(7, 'CS220', 'Comp Org', '', '2001-04-05', 2, 5);


drop table if exists prereqs;
create table prereqs (
    course_id int, -- 1-M
    prereq_id int
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE `prereqs` ADD PRIMARY KEY (`course_id`, `prereq_id`);
grant all on web2_01_amg16h.prereqs to 'blee'@'localhost';

select 'inserting prereqs';

insert into prereqs (course_id, prereq_id) values
(1, 7),
(1, 2),
(6, 3),
(3, 4),
(7, 6),
(4, 5);
