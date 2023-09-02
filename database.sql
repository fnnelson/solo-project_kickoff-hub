
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

-- Adding my own tables:

CREATE TABLE "team" (
  "id" SERIAL PRIMARY KEY,
  "team_name" VARCHAR(160) NOT NULL,
  "home_jersey" VARCHAR(60),
  "away_jersey" VARCHAR(60),
  "wins" INTEGER NOT NULL DEFAULT 0,
  "losses" INTEGER NOT NULL DEFAULT 0,
  "draws" INTEGER NOT NULL DEFAULT 0,
  "total_points" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "admin" BOOLEAN NOT NULL DEFAULT FALSE,
  "name" VARCHAR(160) NOT NULL,
  "position" VARCHAR(50),
  "fav_team" VARCHAR(100),
  "interests" VARCHAR(750),
  "photo" VARCHAR(256),
  "team_id" INTEGER REFERENCES "team"
);

CREATE TABLE "field" (
  "id" SERIAL PRIMARY KEY,
  "field_name" VARCHAR(160) NOT NULL,
  "location" VARCHAR(160),
  "maps_link" VARCHAR(256),
  "field_photo" VARCHAR(256)
);

CREATE TABLE "game" (
  "id" SERIAL PRIMARY KEY,
  "game_date" DATE NOT NULL,
  "game_time" TIME NOT NULL DEFAULT '7:00',
  "field_id" INTEGER NOT NULL REFERENCES "field",
  "home_team_id" INTEGER NOT NULL REFERENCES "team",
  "home_team_score" INTEGER DEFAULT -1,
  "away_team_id" INTEGER NOT NULL REFERENCES "team",
  "away_team_score" INTEGER DEFAULT -1
);

CREATE TABLE "announcement" (
  "id" SERIAL PRIMARY KEY,
  "date" DATE NOT NULL,
  "description" VARCHAR(750) NOT NULL
);

-- entering starting data
INSERT INTO team (team_name, home_jersey, away_jersey)
VALUES
    ('Brutal Foxes', '#FFFFFF', '#D35400'),
    ('Polar Hornets', '#FEE440', '#454545'),
    ('Hustlin'' Cheetahs', '#F2DA9D', '#000407'),
    ('Flaming Dragons', '#FE9494', '#343489'),
    ('Scrappy Koalas', '#ECE2D9', '#513D27'),
    ('Honey Badgers', '#A6D0DF', '#44547C');
    
INSERT INTO field (field_name, location, maps_link, field_photo)
VALUES
    ('Braemar Field', 'Edina', 'https://www.google.com/maps/place/Braemar+Field/@44.869766,-93.3967276,17z/data=!3m1!4b1!4m6!3m5!1s0x87f62223f6183a1f:0xabcb14f5e7d6e558!8m2!3d44.869766!4d-93.3941527!16s%2Fg%2F11b6hy8qt7?entry=ttu', 'https://www.rjmconstruction.com/wp-content/uploads/2021/02/EdinaSDoutdoorturf-768x368.jpg'),
    ('Pamela Turf Field', 'Edina', 'https://www.google.com/maps/place/Pamela+Turf+Field/@44.8928403,-93.3368165,17z/data=!3m1!4b1!4m6!3m5!1s0x87f626b42ea1ba65:0xb82a311422e316ff!8m2!3d44.8928403!4d-93.3342416!16s%2Fg%2F11c5xvrd17?entry=ttu', 'https://www.edinamn.gov/ImageRepository/Document?documentID=6749');
    
    
INSERT INTO game (game_date, game_time, field_id, home_team_id, away_team_id)
VALUES
    ('8/12/2023', '7:00', 1, 1, 2),
    ('8/19/2023', '8:00', 2, 3, 4),
    ('8/28/2023', '6:00', 1, 5, 6),
    ('9/4/2023', '8:00', 2, 3, 1),
    ('9/12/2023', '9:00', 2, 5, 2),
    ('8/12/2023', '7:00', 2, 6, 4);
    
INSERT INTO "user" (username, password, admin, name, position, fav_team, interests)
VALUES
    ('aquaman', '1234', false, 'Aqua Man', 'forward', 'Fish FC', 'swimming'),
    ('superman', '1234', true, 'Clark Kent', 'defense', 'Flying Burritos United', 'beating up bad dudes');

INSERT INTO announcement (date, description)
VALUES
    ('9/1/2023', 'creating first announcement'),
    ('9/2/2023', 'today we play!');