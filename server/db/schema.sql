DROP DATABASE IF EXISTS `portfoliosns`;
CREATE DATABASE `portfoliosns` DEFAULT CHARACTER SET utf8mb4;

USE `portfoliosns`;

CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT,
  `auth_uid` VARCHAR(100) UNIQUE,
  `prof_img_url` TEXT,
  `self_introduction` TEXT,
  `programming_experience` FlOAT,
  `github_account` TEXT,
  `twitter_account` TEXT,
  `other_url` TEXT,
  `other_url_comment` TEXT,
  `created_by` BIGINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_by` BIGINT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
  PRIMARY KEY (`id`),
  FOREIGN KEY (`created_by`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`updated_by`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `programming_languages` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_programming_language` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `programming_language_id` BIGINT NOT NULL,
  `created_by` BIGINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_by` BIGINT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`programming_language_id`) REFERENCES programming_languages(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`updated_by`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
