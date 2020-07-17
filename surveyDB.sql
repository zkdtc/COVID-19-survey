DROP DATABASE IF EXISTS surveyDB;

CREATE DATABASE surveyDB;

USE surveyDB;

-- DONE
CREATE TABLE survey (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	description	VARCHAR(1000) NULL,
	PRIMARY KEY (id)
    );
-- DONE
CREATE TABLE question (
	id INT NOT NULL AUTO_INCREMENT,
    survey_id	INTEGER,
	text	VARCHAR(1000)	NULL,
	FOREIGN KEY (survey_id) REFERENCES survey (id),
	PRIMARY KEY (id)
    );

CREATE TABLE respondent (
	id INT NOT NULL AUTO_INCREMENT,
	name	varchar(50),
    email	varchar(255),
	PRIMARY KEY (id)
    );
    
CREATE TABLE question_choices (
	id INT NOT NULL AUTO_INCREMENT,
    question_id INTEGER,
    text varchar(510),
	PRIMARY KEY (id),
	FOREIGN KEY (question_id) REFERENCES question (id)
    );
    
CREATE TABLE question_answers (
	id INT NOT NULL AUTO_INCREMENT,
    choice_selected INTEGER,
    respondent_id INTEGER,
	PRIMARY KEY (id),
    FOREIGN KEY (respondent_id) REFERENCES respondent (id),
	FOREIGN KEY (choice_selected) REFERENCES question_choices (id)
    );



