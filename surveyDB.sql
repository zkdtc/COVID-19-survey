DROP DATABASE IF EXISTS surveyDB;

CREATE DATABASE surveyDB;

USE surveyDB;

DROP TABLE survey;


CREATE TABLE survey (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	VARCHAR(50)	NULL,
	description	VARCHAR(1000)	NULL,
    updated	timestamp
);

CREATE TABLE question (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	text	VARCHAR(255)	NULL,
    updated	timestamp
);

CREATE TABLE question_order (
	question_sequence INTEGER,
    survey_id	INTEGER,
		CONSTRAINT fk_survey FOREIGN KEY (survey_id)
		REFERENCES survey (id)
		ON DELETE CASCADE,
    question_id	INTEGER,
		CONSTRAINT fk_question FOREIGN KEY (question_id)
		REFERENCES question (id)
		ON DELETE CASCADE
);

-- DROP TABLE survey_response;

CREATE TABLE survey_response (
	id INT NOT NULL AUTO_INCREMENT,
-- 	survey_id	INTEGER,
-- 		CONSTRAINT fk_survey FOREIGN KEY (survey_id)
-- 		REFERENCES survey (id)
-- 		ON DELETE CASCADE,
-- 	respondent_id	INTEGER,
-- 		CONSTRAINT fk_respondent FOREIGN KEY (respondent_id)
-- 		REFERENCES respondent (id)
-- 		ON DELETE CASCADE,
	PRIMARY KEY (id),
    FOREIGN KEY (survey_id) REFERENCES survey (id),
	FOREIGN KEY (respondent_id) REFERENCES respondent (id),
	upddated	timestamp
    );
--     
--     CREATE TABLE Orders (
--     OrderID int NOT NULL,
--     OrderNumber int NOT NULL,
--     PersonID int,
--     PRIMARY KEY (OrderID),
--     FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
-- );

CREATE TABLE respondent (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	varchar(50),
	hashedpassword	varchar(100),
    email	varchar(255),
    created	timestamp
    );

