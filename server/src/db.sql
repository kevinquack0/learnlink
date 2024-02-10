CREATE TABLE student (
    student_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    second_major VARCHAR(255),
    minor VARCHAR(255),
    classes VARCHAR(255) NOT null
);


CREATE TABLE study_session (
    session_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    type VARCHAR(255) NOT NULL,
    creator_id UUID NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES student(student_id)
);


CREATE TABLE session_participants (
    session_id UUID NOT NULL,
    student_id UUID NOT NULL,
    FOREIGN KEY (session_id) REFERENCES study_session(session_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    PRIMARY KEY (session_id, student_id)
);
