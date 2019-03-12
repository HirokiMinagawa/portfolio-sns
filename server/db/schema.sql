DROP DATABASE IF EXISTS `portfoliosns`;
CREATE DATABASE `portfoliosns` DEFAULT CHARACTER SET utf8mb4;

USE `portfoliosns`;

CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT,
  `auth_uid` VARCHAR(100) UNIQUE,
  `prof_img_url` TEXT,
  `self_introduction` TEXT,
  `programming_experience` BIGINT,
  `github_account` TEXT,
  `twitter_account` TEXT,
  `other_url` TEXT,
  `other_url_comment` TEXT,
  `created_by` BIGINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_by` BIGINT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
  PRIMARY KEY (`id`),
  FOREIGN KEY (`created_by`) REFERENCES users(`id`),
  FOREIGN KEY (`updated_by`) REFERENCES users(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;