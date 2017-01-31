-- phpMyAdmin SQL Dump
-- version 4.6.4deb1+deb.cihar.com~xenial.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Янв 31 2017 г., 21:25
-- Версия сервера: 5.7.16-0ubuntu0.16.04.1
-- Версия PHP: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dblogin`
--
CREATE DATABASE IF NOT EXISTS `dblogin` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dblogin`;

-- --------------------------------------------------------

--
-- Структура таблицы `grades`
--

DROP TABLE IF EXISTS `grades`;
CREATE TABLE IF NOT EXISTS `grades` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `grade_number` int(10) UNSIGNED NOT NULL,
  `grade_name` varchar(7) NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `grades`
--

INSERT IGNORE INTO `grades` (`id`, `grade_number`, `grade_name`, `school_id`) VALUES
(1, 8, 'E', 1),
(2, 9, 'E', 1),
(3, 10, 'E', 1),
(4, 11, 'E', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

DROP TABLE IF EXISTS `lessons`;
CREATE TABLE IF NOT EXISTS `lessons` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_id` int(20) UNSIGNED NOT NULL,
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `grade_id` int(10) UNSIGNED NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `lessons`
--

INSERT IGNORE INTO `lessons` (`id`, `subject_id`, `teacher_id`, `grade_id`, `school_id`) VALUES
(1, 1, 27, 3, 1),
(2, 2, 27, 1, 1),
(3, 1, 28, 2, 1),
(4, 2, 28, 4, 1),
(6, 2, 28, 3, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `project_data` json DEFAULT NULL,
  `school_id` int(10) UNSIGNED DEFAULT NULL,
  `start` date DEFAULT NULL,
  `finish` date DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lessons_per_day` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `projects`
--

INSERT IGNORE INTO `projects` (`id`, `owner_id`, `project_name`, `project_data`, `school_id`, `start`, `finish`, `creation_time`, `lessons_per_day`) VALUES
(1, 27, 'project1(Е классы)', NULL, 1, NULL, NULL, '2017-01-16 17:43:02', 6),
(2, 30, 'project2(Е классы)', '{"table": {"table": [[-1, -1, -1, -1], [-1, 5, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 6, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 4, "isUsed": false, "verbose": true}, {"x": 1, "y": 1, "color": "red", "db_id": "3", "index": 0, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 5, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 6, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 7, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 8, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 9, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 10, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 11, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 12, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 13, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 14, "isUsed": false, "verbose": false}]}', 1, NULL, NULL, '2017-01-16 17:43:02', 6),
(4, 27, 'аощльдва', NULL, 1, NULL, NULL, '2017-01-16 17:43:02', 6),
(5, 27, 'аощльдва', NULL, 1, NULL, NULL, '2017-01-16 17:43:02', 6),
(6, 27, 'аощльдва', NULL, 1, '2017-10-11', '2017-11-11', '2017-01-16 17:43:02', 7),
(7, 27, 'аощлsasasasьдва', NULL, 1, '2017-10-11', '2017-11-11', '2017-01-16 17:43:02', 9),
(8, 27, 'lalalalalal', NULL, 1, '2017-01-23', '2017-01-28', '2017-01-20 16:32:02', 8),
(9, 27, 'аощльдва', NULL, 1, '2017-10-11', '2017-11-11', '2017-01-20 16:50:05', 6),
(10, 27, 'lol', NULL, 1, '2017-01-11', '2017-01-21', '2017-01-20 17:03:09', 8),
(11, 27, 'sukscsc', NULL, 1, '2017-01-01', '2017-01-03', '2017-01-20 17:43:46', 7),
(12, 30, 'asdfasdf', '{"table": {"table": [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 6, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "red", "db_id": "4", "index": 5, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "red", "db_id": "4", "index": 6, "isUsed": false, "verbose": false}]}', 1, '2017-01-01', '2017-01-04', '2017-01-20 15:14:41', 7),
(13, 27, 'aaaaaaaaaaaaaaaa', NULL, 1, '2017-01-01', '2017-01-07', '2017-01-26 19:03:18', 12),
(14, 27, 'аощльдва', NULL, 1, '2017-10-11', '2017-11-11', '2017-01-26 20:38:10', 17),
(15, 30, 'asdfasdf', NULL, 1, '2017-01-27', '2017-01-31', '2017-01-27 14:49:01', 5),
(16, 30, '31312123113321131331312', '{"table": {"table": [[-1, -1, -1, 16], [-1, -1, -1, -1], [-1, 5, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, 15], [-1, -1, -1, -1], [-1, 6, -1, -1], [-1, -1, -1, 14], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, 7, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, 17], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, 8, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 25, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 4, "isUsed": false, "verbose": true}, {"x": 2, "y": 1, "color": "yellow", "db_id": "3", "index": 0, "isUsed": true, "verbose": false}, {"x": 6, "y": 1, "color": "yellow", "db_id": "3", "index": 1, "isUsed": true, "verbose": false}, {"x": 11, "y": 1, "color": "yellow", "db_id": "3", "index": 6, "isUsed": true, "verbose": false}, {"x": 16, "y": 1, "color": "yellow", "db_id": "3", "index": 7, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 5, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 6, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 7, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 8, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 9, "isUsed": false, "verbose": false}, {"x": 7, "y": 3, "color": "yellow", "db_id": "4", "index": 2, "isUsed": true, "verbose": false}, {"x": 4, "y": 3, "color": "yellow", "db_id": "4", "index": 3, "isUsed": true, "verbose": false}, {"x": 0, "y": 3, "color": "yellow", "db_id": "4", "index": 4, "isUsed": true, "verbose": false}, {"x": 13, "y": 3, "color": "yellow", "db_id": "4", "index": 5, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "4", "index": 10, "isUsed": false, "verbose": false}]}', 1, '2017-01-27', '2017-01-31', '2017-01-27 14:54:57', 5),
(17, 30, 'asdfasdfasdfasdf', '{"table": {"table": [[-1, -1, -1, -1], [-1, -1, 12, -1], [-1, -1, -1, -1], [-1, -1, 11, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, 7, -1, -1], [-1, 5, 9, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, 6, 8, -1], [-1, -1, 13, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 50, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#aaddff", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#0693e3", "db_id": "6", "index": 4, "isUsed": false, "verbose": true}, {"x": 7, "y": 1, "color": "yellow", "db_id": "3", "index": 2, "isUsed": true, "verbose": false}, {"x": 12, "y": 1, "color": "yellow", "db_id": "3", "index": 3, "isUsed": true, "verbose": false}, {"x": 6, "y": 1, "color": "yellow", "db_id": "3", "index": 6, "isUsed": true, "verbose": false}, {"x": 12, "y": 2, "color": "#aaddff", "db_id": "1", "index": 4, "isUsed": true, "verbose": false}, {"x": 7, "y": 2, "color": "#aaddff", "db_id": "1", "index": 5, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#aaddff", "db_id": "1", "index": 5, "isUsed": false, "verbose": false}, {"x": 3, "y": 2, "color": "#0693e3", "db_id": "6", "index": 0, "isUsed": true, "verbose": false}, {"x": 1, "y": 2, "color": "#0693e3", "db_id": "6", "index": 1, "isUsed": true, "verbose": false}, {"x": 13, "y": 2, "color": "#0693e3", "db_id": "6", "index": 7, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#0693e3", "db_id": "6", "index": 6, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#0693e3", "db_id": "6", "index": 7, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#0693e3", "db_id": "6", "index": 8, "isUsed": false, "verbose": false}]}', 1, '2017-01-18', '2017-01-27', '2017-01-27 21:54:08', 5),
(18, 30, 'asdasdfasdfasdf', '{"table": {"table": [[-1, -1, -1, -1], [-1, -1, 18, -1], [-1, 8, -1, -1], [5, -1, 17, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, 9, 12, -1], [-1, -1, -1, 20], [6, 10, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, 16, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 25, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#335566", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8ed1fc", "db_id": "3", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#00d084", "db_id": "4", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#abb8c3", "db_id": "6", "index": 3, "isUsed": false, "verbose": true}, {"x": 3, "y": 0, "color": "#335566", "db_id": "2", "index": 1, "isUsed": true, "verbose": false}, {"x": 8, "y": 0, "color": "#335566", "db_id": "2", "index": 6, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#335566", "db_id": "2", "index": 5, "isUsed": false, "verbose": false}, {"x": 2, "y": 1, "color": "#8ed1fc", "db_id": "3", "index": 0, "isUsed": true, "verbose": false}, {"x": 6, "y": 1, "color": "#8ed1fc", "db_id": "3", "index": 2, "isUsed": true, "verbose": false}, {"x": 8, "y": 1, "color": "#8ed1fc", "db_id": "3", "index": 4, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#8ed1fc", "db_id": "3", "index": 6, "isUsed": false, "verbose": false}, {"x": 6, "y": 2, "color": "#FFFF00", "db_id": "1", "index": 3, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 7, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 8, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 9, "isUsed": false, "verbose": false}, {"x": 11, "y": 2, "color": "#abb8c3", "db_id": "6", "index": 5, "isUsed": true, "verbose": false}, {"x": 3, "y": 2, "color": "#abb8c3", "db_id": "6", "index": 7, "isUsed": true, "verbose": false}, {"x": 1, "y": 2, "color": "#abb8c3", "db_id": "6", "index": 9, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#abb8c3", "db_id": "6", "index": 10, "isUsed": false, "verbose": false}, {"x": 7, "y": 3, "color": "#00d084", "db_id": "4", "index": 8, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#00d084", "db_id": "4", "index": 11, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#00d084", "db_id": "4", "index": 12, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#00d084", "db_id": "4", "index": 13, "isUsed": false, "verbose": false}]}', 1, '2017-01-27', '2017-01-31', '2017-01-28 21:34:26', 5),
(19, 30, '32132132132132', '{"table": {"table": [], "width": -85, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "6", "index": 4, "isUsed": false, "verbose": true}]}', 1, '2017-01-20', '2017-01-02', '2017-01-29 13:21:27', 5),
(20, 30, '987', '{"table": {"table": [], "width": -5, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "6", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "2", "index": 5, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "2", "index": 6, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "2", "index": 7, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "3", "index": 8, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "3", "index": 9, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "3", "index": 10, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "3", "index": 11, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 12, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "1", "index": 13, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#FFFF00", "db_id": "6", "index": 14, "isUsed": false, "verbose": false}]}', 1, '2017-01-27', '2017-01-25', '2017-01-29 13:22:39', 5),
(21, 30, '00000', NULL, 1, '2017-01-10', '2017-01-28', '2017-01-29 13:30:47', 666);

-- --------------------------------------------------------

--
-- Структура таблицы `role_user_school_relation`
--

DROP TABLE IF EXISTS `role_user_school_relation`;
CREATE TABLE IF NOT EXISTS `role_user_school_relation` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  `is_approved` tinyint(1) NOT NULL,
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `role_user_school_relation`
--

INSERT IGNORE INTO `role_user_school_relation` (`id`, `user_id`, `role_id`, `school_id`, `is_approved`) VALUES
(1, 27, 1, 1, 1),
(2, 28, 1, 1, 1),
(3, 29, 1, 1, 1),
(4, 30, 1, 1, 1),
(5, 27, 2, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  `free_pairs` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_user_date` (`user_id`,`date`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `schedule`
--

INSERT IGNORE INTO `schedule` (`id`, `user_id`, `date`, `school_id`, `free_pairs`) VALUES
(80, 30, '2017-01-10', 1, '[false, false, false, false, false, false]'),
(81, 30, '2017-01-11', 1, '[false, false, false, false, false, false]'),
(82, 30, '2017-01-12', 1, '[false, false, false, false, false, false]'),
(83, 30, '2017-01-13', 1, '[false, false, false, false, false, false]'),
(84, 30, '2017-01-14', 1, '[false, false, false, false, false, false]'),
(85, 30, '2017-01-15', 1, '[false, false, false, false, false, false]'),
(86, 30, '2017-01-16', 1, '[false, false, false, false, false, false]'),
(87, 30, '2017-01-17', 1, '[false, false, false, false, false, false]'),
(88, 30, '2017-01-18', 1, '[false, false, false, false, false, false]'),
(89, 30, '2017-01-19', 1, '[false, false, false, false, false, false]'),
(90, 30, '2017-01-20', 1, '[false, false, false, false, false, false]'),
(91, 30, '2017-01-21', 1, '[false, false, false, false, false, false]'),
(92, 30, '2017-01-22', 1, '[false, false, false, false, false, false]'),
(93, 30, '2017-01-23', 1, '[false, false, false, false, false, false]'),
(115, 30, '2017-01-24', 1, '[false, false, true, true, true, false]'),
(116, 30, '2017-01-25', 1, '[true, false, false, false, false, false]'),
(117, 30, '2017-01-26', 1, '[false, true, false, false, false, false]'),
(118, 30, '2017-01-27', 1, '[true, true, false, false, false, false]'),
(119, 30, '2017-01-28', 1, '[false, false, false, true, false, false]'),
(120, 30, '2017-01-29', 1, '[false, false, false, false, true, false]'),
(121, 30, '2017-01-30', 1, '[false, false, false, false, false, true]'),
(122, 30, '2017-01-31', 1, '[false, false, false, false, true, false]');

-- --------------------------------------------------------

--
-- Структура таблицы `schools`
--

DROP TABLE IF EXISTS `schools`;
CREATE TABLE IF NOT EXISTS `schools` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(80) CHARACTER SET utf8 NOT NULL,
  `lessons_per_day` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `schools`
--

INSERT IGNORE INTO `schools` (`id`, `name`, `lessons_per_day`) VALUES
(1, '179 МИОО', 6),
(2, '58 ШК', 8),
(3, '13337', 6),
(4, 'аощл', 13);

-- --------------------------------------------------------

--
-- Структура таблицы `school_time`
--

DROP TABLE IF EXISTS `school_time`;
CREATE TABLE IF NOT EXISTS `school_time` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int(10) UNSIGNED NOT NULL,
  `lesson` int(10) UNSIGNED NOT NULL,
  `start_time` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `school_time`
--

INSERT IGNORE INTO `school_time` (`id`, `school_id`, `lesson`, `start_time`) VALUES
(27, 1, 0, '09:00:00'),
(28, 1, 1, '09:50:00'),
(29, 1, 2, '10:55:00'),
(30, 1, 3, '11:45:00'),
(31, 1, 4, '13:00:00'),
(32, 1, 5, '14:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` tinytext CHARACTER SET utf8 NOT NULL,
  `school_id` int(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `subjects`
--

INSERT IGNORE INTO `subjects` (`id`, `name`, `school_id`) VALUES
(1, 'Физика', 1),
(2, 'Химия', 1),
(3, 'Алгебра', 1),
(4, 'А.Я.', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(60) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `name` tinytext CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `user_email` (`user_email`),
  UNIQUE KEY `user_email_2` (`user_email`),
  UNIQUE KEY `user_name_2` (`user_name`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT IGNORE INTO `users` (`user_id`, `user_name`, `user_email`, `user_pass`, `name`) VALUES
(27, 'g1231234', 'lololo', '$2y$10$uSnV4KxCkBGp6JvYdrGnfulqIx1SvEbJLxj7Sd5w7bJRu.OsPgdfS', 'G1234re213'),
(28, 'acadab', 'acadab', '$2y$10$sluHNeXvfPFaG4lRkuyGhelCV2O8brIJmX8M4/Z64JZm3hcOWGX9.', 'Greeeg'),
(29, 'greg', 'lalallalal', '$2y$10$UjYIQWhfAvFOSG2mwgznQ.UAy5S6vQxth45l8tT4wsFQdR0e9IO4C', 'Гриша'),
(30, 'root', 'root', '$2y$10$sluHNeXvfPFaG4lRkuyGhelCV2O8brIJmX8M4/Z64JZm3hcOWGX9.', 'Дмитрий Викторович Емельяненко');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
