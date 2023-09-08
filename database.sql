
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
  "total_points" INTEGER GENERATED ALWAYS AS (("wins" * 3) + ("draws" * 1)) STORED
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "admin" BOOLEAN NOT NULL DEFAULT FALSE,
  "name" VARCHAR(160),
  "position" VARCHAR(50),
  "fav_team" VARCHAR(100),
  "interests" VARCHAR(750),
  "photo" VARCHAR(300),
  "team_id" INTEGER REFERENCES "team"
);

CREATE TABLE "field" (
  "id" SERIAL PRIMARY KEY,
  "field_name" VARCHAR(160) NOT NULL,
  "address" VARCHAR(160),
  "maps_link" VARCHAR(300),
  "field_photo" VARCHAR(300)
);

CREATE TABLE "game" (
  "id" SERIAL PRIMARY KEY,
  "game_date" DATE NOT NULL,
  "game_time" TIME NOT NULL DEFAULT '19:00',
  "field_id" INTEGER NOT NULL REFERENCES "field",
  "home_team_id" INTEGER NOT NULL REFERENCES "team",
  "home_team_score" INTEGER DEFAULT -1,
  "away_team_id" INTEGER NOT NULL REFERENCES "team",
  "away_team_score" INTEGER DEFAULT -1,
  "cancel_status" BOOLEAN DEFAULT FALSE
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

INSERT INTO field (field_name, address, maps_link, field_photo)
VALUES
    ('Braemar Field', '7509 Ikola Way, Edina, MN 55439', 'https://www.google.com/maps/place/Braemar+Field/@44.869766,-93.3967276,17z/data=!3m1!4b1!4m6!3m5!1s0x87f62223f6183a1f:0xabcb14f5e7d6e558!8m2!3d44.869766!4d-93.3941527!16s%2Fg%2F11b6hy8qt7?entry=ttu', 'https://www.rjmconstruction.com/wp-content/uploads/2021/02/EdinaSDoutdoorturf-768x368.jpg'),
    ('Pamela Turf Field', '6117 Brookview Ave, Minneapolis, MN 55424', 'https://www.google.com/maps/place/Pamela+Turf+Field/@44.8928403,-93.3368165,17z/data=!3m1!4b1!4m6!3m5!1s0x87f626b42ea1ba65:0xb82a311422e316ff!8m2!3d44.8928403!4d-93.3342416!16s%2Fg%2F11c5xvrd17?entry=ttu', 'https://www.edinamn.gov/ImageRepository/Document?documentID=6749'),
    ('Kuhlman Stadium', '5701 Normandale Rd Edina MN 55424', 'https://www.google.com/maps/place/Kuhlman+Field/@44.8978705,-93.3472352,15z/data=!4m6!3m5!1s0x87f621370f6a41e5:0x81571014f95b79a0!8m2!3d44.8978705!4d-93.3472352!16s%2Fg%2F119tbcdz7?entry=ttu', 'https://pbs.twimg.com/media/CFc5Y2YWIAES3Gv?format=jpg&name=900x900'),
    ('Plymouth Fieldhouse', '14800 34th Ave N, Plymouth, MN 55447', 'https://www.google.com/maps/place/Soccer+Dome/@45.0216197,-93.47367,17z/data=!3m1!4b1!4m6!3m5!1s0x52b3498009899bc1:0x1c9d7dc2c8a55b76!8m2!3d45.0216198!4d-93.4687991!16s%2Fg%2F11b6gbr0vl?entry=ttu', 'https://www.plymouthmn.gov/home/showpublishedimage/5538/636481725759830000');

INSERT INTO game (game_date, game_time, field_id, home_team_id, away_team_id)
VALUES
    ('2023-08-05', '19:00', 1, 1, 2),
    ('2023-08-10', '20:00', 2, 3, 4),
    ('2023-08-15', '18:00', 3, 5, 6),
    ('2023-08-20', '19:30', 4, 1, 3),
    ('2023-08-25', '20:00', 1, 4, 6),
    ('2023-08-28', '19:30', 2, 2, 5),
    ('2023-09-02', '19:00', 3, 6, 1),
    ('2023-09-07', '20:00', 4, 3, 2),
    ('2023-09-12', '18:00', 1, 1, 3),
    ('2023-09-17', '19:30', 2, 2, 4),
    ('2023-09-22', '20:00', 3, 5, 1),
    ('2023-09-27', '19:30', 4, 6, 2);

INSERT INTO announcement (date, description)
VALUES
    ('2023-09-01', 'Dear league members, we are excited to kick off another fantastic season of recreational soccer! As we prepare for our first games, we want to remind all players to prioritize safety and sportsmanship on the field. Lets enjoy the beautiful game and make this season memorable for all.'),
    ('2023-09-02', 'Game Day Reminder: Today is the big day! Get your cleats on, grab your jersey, and join us on the field for some fun-filled soccer action. Our dedicated referees are here to ensure fair play, so lets show them respect and make this day a great experience for everyone.'),
    ('2023-09-03', 'Referee Update: We would like to thank our referees for their hard work and dedication to our league. Your role is essential in maintaining the integrity of the game. We encourage players and spectators to respect their decisions and refrain from confrontations. Remember, it is all about fair play!'),
    ('2023-09-05', 'A Note on Physical Play: While we all love the intensity of soccer, we must emphasize the importance of playing within the rules. Recent games have seen an increase in physical challenges. We urge all players to be mindful of your actions and prioritize the safety of your fellow athletes. Lets keep it friendly and enjoyable for everyone.'),
    ('2023-09-06', 'Upcoming Event: Mark your calendars for our leagues annual charity match on September 30th. It is a chance for us to come together, have some fun, and give back to the community. Stay tuned for more details on how you can get involved!'),
    ('2023-09-07', 'Weather Advisory: As we head into the fall season, be prepared for changing weather conditions. Bring appropriate clothing and stay informed about game cancellations or delays due to inclement weather. Safety first!'),
    ('2023-09-08', 'Season Finale: Our recreational soccer season is coming to a close, but not without a bang! Join us for the championship games, followed by our end-of-season celebration at the clubhouse. It has been a fantastic journey, and we look forward to seeing you there!');

-- can't enter this info in below (need to hash and salt passwords), but can use as reference
INSERT INTO "user" (username, password, admin, name, position, fav_team, interests)
VALUES
    ('aquaman', '1234', false, 'Arthur', 'Forward', 'Fishy FC', 'Swimming, Checking the Weather, Tridents'),
    ('superman', '1234', true, 'Clark', 'Defense', 'Valencia CF', 'Gadgets, Masks, Raves, Movie: Eyes Wide Shut');