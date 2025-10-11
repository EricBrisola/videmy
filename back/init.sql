CREATE TABLE videos (
  id VARCHAR(50) PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(60) NOT NULL UNIQUE,
  removed BOOLEAN DEFAULT FALSE,
  defaultThumbnail VARCHAR(60) NOT NULL,
  mediumThumbnail VARCHAR(60) NOT NULL,
  highThumbnail VARCHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  video_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_video 
    FOREIGN KEY (video_id) REFERENCES videos (id)
);