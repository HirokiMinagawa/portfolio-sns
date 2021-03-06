const mysql = require("mysql2/promise");
const config = require("../config").db;

const makeDb = async () => {
  const getConnection = async () => {
    const connection = await mysql.createConnection(config);
    return connection;
  };
  const connection = await getConnection();
//   await connection.query("DROP DATABASE IF EXISTS portfoliosns;");
//   await connection.query("CREATE DATABASE portfoliosns DEFAULT CHARACTER SET utf8mb4;");
//   await connection.query("USE portfoliosns;");
  await connection.query("USE ld3e1ut8tgibw2l8;");
//   await connection.query("CREATE TABLE users ( id BIGINT NOT NULL AUTO_INCREMENT,name TEXT NOT NULL,auth_uid VARCHAR(100) UNIQUE NOT NULL,prof_img_url TEXT,self_introduction TEXT,programming_experience FlOAT,github_account TEXT,twitter_account TEXT,other_url TEXT, other_url_comment TEXT,created_by BIGINT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_by BIGINT,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id),FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
//   await connection.query("CREATE TABLE programming_languages (id BIGINT NOT NULL AUTO_INCREMENT,name TEXT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
//   await connection.query("INSERT INTO programming_languages (name) VALUES (?);",["C"]);
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('C++');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('C#');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('Java');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('JavaScript');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('Ruby');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('PHP');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('Python');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('Swift');");
//   await connection.query("INSERT INTO programming_languages (name) VALUES ('Go');");

  await connection.query("CREATE TABLE user_programming_language (id BIGINT NOT NULL AUTO_INCREMENT,user_id BIGINT NOT NULL,programming_language_id BIGINT NOT NULL,created_by BIGINT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_by BIGINT,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id),FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (programming_language_id) REFERENCES programming_languages(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
  await connection.query("CREATE TABLE portfolios (id BIGINT NOT NULL AUTO_INCREMENT,url TEXT NOT NULL,title TEXT NOT NULL,description TEXT NOT NULL,thumbnail_url TEXT,created_by BIGINT NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_by BIGINT,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id),FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
  await connection.query("CREATE TABLE portfolio_programming_language (id BIGINT NOT NULL AUTO_INCREMENT,portfolio_id BIGINT NOT NULL,programming_language_id BIGINT NOT NULL,created_by BIGINT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_by BIGINT,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    PRIMARY KEY (id),FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (programming_language_id) REFERENCES programming_languages(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
  await connection.query("CREATE TABLE likes (id BIGINT NOT NULL AUTO_INCREMENT,portfolio_id BIGINT NOT NULL,created_by BIGINT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_by BIGINT,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    PRIMARY KEY (id),FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

  connection.end();
};

makeDb();
