create table quiz_question
(
	id       int primary key auto_increment,
	question varchar(300) not null unique

);

create table quiz_options
(
	id          int primary key auto_increment,
	a           text not null,
	b           text not null,
	c           text not null,
	d           text not null,
	correct     char check ('a' or 'b' or 'c' or 'd'),
	question_id int references quiz_options (id)
);

drop table quiz_played;
create table quiz_played
(
	id          int auto_increment
		primary key,
	name        text     not null,
	question_id int      not null,
	user_result text     null,
	time_spent int ,
	date_time   datetime not null
);


insert into quiz.quiz_question (question) value ('How many teams participate in the tournament phase');
insert into quiz.quiz_question (question) value ('How many national teams have won the trophy');
insert into quiz.quiz_question (question) value ('When was the first Football World Cup held');
insert into quiz.quiz_question (question) value ('When was Croatia first allowed to participate as an independent country');
insert into quiz.quiz_question (question) value ('When was the Golden Ball first awarded');
insert into quiz.quiz_question (question) value ('Which of the following is not a goalkeeper');
insert into quiz.quiz_question (question) value ('Which of the following countries never hosted the world cup');
insert into quiz.quiz_question (question) value ('How many goals did Brazil score in the world cup from the beginning to 2018');
insert into quiz.quiz_question (question) value ('Who is the coach of England’s national team for the 2022 World Cup');
insert into quiz.quiz_question (question) value ('Which football player was nicknamed “The Divine Bald One”');


insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('22', '28', '32', '38', 'c' , 1);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('4', '6', '8', '10', 'c' ,2);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('1920', '1930', '1940', '1950', 'b' , 3);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('1994', '1998', '2002', '2006','b',  4);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('1972', '1982', '1992', '2002','b',  5);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('Manual Neuer', 'Thibaut Courtois' , 'Gianluigi Buffon', 'Antoine Griezmann', 'd' , 6);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('Russia', 'Mexico', 'United States', 'Australia','d' , 7);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values (119, 159 , 229, 259 ,'d' , 8);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('Gareth Southgate','Didier Deschamps' , 'Graham Arnold', 'Ryan Giggs', 'a', 9);
insert into quiz.quiz_options(a, b, c, d, correct, question_id) values ('Brad Friedel', 'Bobby Charlton', 'Fabien Barthez', 'Thierry Henry','c' , 10);




-- Name quiz_played.name
select name from quiz_played;
-- total question is constant
-- Like 10 or 20 predefined

-- correct question
create view correct_question_view as
select qp.name, qp.date_time, count(qp.user_result) as correct
from quiz_played qp
    inner join quiz.quiz_options qo
    on qp.question_id = qo.question_id
where qp.user_result = qo.correct
group by name, date_time;
drop view correct_question_view
select * from correct_question_view;


-- total question
-- predefined

-- total time consumed, attempted question
select cqv.name, cqv.date_time, cqv.correct, sum(qp.time_spent) as total_time, count(qp.question_id) as attempted
from quiz_played qp
inner join (select qp.name, qp.date_time, count(qp.user_result) as correct
			from quiz_played qp
					 inner join quiz.quiz_options qo
								on qp.question_id = qo.question_id
			where qp.user_result = qo.correct
			group by name, date_time) cqv on qp.date_time = cqv.date_time
group by qp.name, qp.date_time;


create table countries (
    id int primary key auto_increment,
    name varchar(25) not null unique
);
drop table provinces;
create table provinces (
    id int primary key auto_increment,
    countryId int not null references countries(id),
	name varchar(25) not null
);
create table municipalities (
    id int primary key auto_increment,
    provinceId int not null references provinces(id) ,
    name varchar(25) not null
);

create table patients (
    id int primary key auto_increment,
	firstname varchar(50) not null,
	surname varchar(50) not null,
	age int not null,
	gender char not null check('m' or 'f' or 'o') ,
	userLanguage varchar(100) not null,
	countryId int not null references countries(id),
	provinceId int not null references provinces(id),
	municipalityId int not null references municipalities(id),
	address varchar(100) not null,
	mobileNumber int not null,
	patentId varchar(100) not null,
	currentDateTime datetime not null
);


create table billInfos (
						   sampleNo int primary key auto_increment,
						   patientId int references patients(id),
						   billingDate datetime,
						   subTotal numeric,
						   discountPercent numeric,
						   discountAmount numeric,
						   netTotal numeric
);


create table testItems (
						   testItemId int primary key auto_increment,
						   sampleNo int references billInfos(sampleNo),
						   testItems int not null,
						   qty int not null,
						   unitPrice numeric not null,
						   price numeric not null
);



create table tests (
					   testId int primary key auto_increment,
					   testName varchar(20),
					   unitPrice numeric
);

alter table tests auto_increment = 100;
alter table billInfos auto_increment = 1000;

