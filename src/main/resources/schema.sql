create table Account (
						user_name varchar(50) unique,
						password varchar(50) not null,
						first_name varchar(50) not null,
						last_name varchar(100) not null,
            email varchar(100) not null,
						primary key (user_name)
);
