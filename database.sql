CREATE TABLE books (id serial primary key, title varchar, publishing_year integer);
CREATE TABLE genres (id serial primary key, name varchar);
CREATE TABLE authors (id serial primary key, first_name varchar, last_name varchar);
