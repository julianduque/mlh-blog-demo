CREATE TABLE posts
(
  id          bigserial                NOT NULL,
  user_id     bigserial                NOT NULL,
  title       character varying        NOT NULL,
  description character varying       ,
  content     character varying        NOT NULL,
  created_at  timestamp with time zone NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users
(
  id           bigserial                NOT NULL,
  username     character varying        NOT NULL,
  profile      character varying        NOT NULL,
  display_name character varying       ,
  avatar_url   character varying       ,
  created_at   timestamp with time zone NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (username, profile, display_name, avatar_url, created_at)
VALUES ('jduque', 'Developer Advocate at Salesforce', 'Julián Duque', 'https://s.gravatar.com/avatar/c2d1139b787a469e13229070d6be918c?s=300', now());

ALTER TABLE posts
  ADD CONSTRAINT FK_users_TO_posts
    FOREIGN KEY (user_id)
    REFERENCES users (id);