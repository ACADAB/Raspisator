-- phpMyAdmin SQL Dump
-- version 4.6.4deb1+deb.cihar.com~xenial.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Фев 26 2017 г., 21:58
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

-- --------------------------------------------------------

--
-- Структура таблицы `grades`
--

CREATE TABLE `grades` (
  `id` int(10) UNSIGNED NOT NULL,
  `grade_number` int(10) UNSIGNED NOT NULL,
  `grade_name` varchar(7) NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `grades`
--

INSERT INTO `grades` (`id`, `grade_number`, `grade_name`, `school_id`) VALUES
(1, 8, 'E', 1),
(2, 9, 'E', 1),
(3, 10, 'E', 1),
(4, 11, 'E', 1),
(5, 6, 'E', 1),
(6, 7, 'E', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(20) UNSIGNED NOT NULL,
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `grade_id` int(10) UNSIGNED NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`id`, `subject_id`, `teacher_id`, `grade_id`, `school_id`) VALUES
(7, 4, 31, 4, 1),
(8, 4, 31, 2, 1),
(9, 8, 32, 4, 1),
(10, 8, 32, 3, 1),
(11, 8, 32, 1, 1),
(12, 8, 32, 5, 1),
(13, 8, 32, 6, 1),
(14, 7, 33, 5, 1),
(15, 8, 33, 6, 1),
(18, 9, 34, 4, 1),
(19, 9, 34, 3, 1),
(20, 19, 34, 2, 1),
(21, 10, 35, 1, 1),
(22, 10, 35, 3, 1),
(23, 10, 35, 5, 1),
(24, 11, 36, 5, 1),
(25, 11, 36, 3, 1),
(26, 11, 37, 6, 1),
(27, 8, 38, 2, 1),
(28, 3, 39, 1, 1),
(29, 3, 39, 6, 1),
(30, 4, 40, 1, 1),
(31, 4, 40, 3, 1),
(32, 12, 41, 1, 1),
(33, 12, 41, 2, 1),
(34, 12, 41, 3, 1),
(35, 12, 41, 5, 1),
(36, 12, 41, 6, 1),
(37, 13, 42, 4, 1),
(38, 7, 43, 1, 1),
(39, 7, 43, 5, 1),
(40, 7, 43, 6, 1),
(41, 7, 43, 2, 1),
(42, 13, 44, 2, 1),
(43, 3, 45, 2, 1),
(44, 3, 45, 3, 1),
(45, 9, 45, 1, 1),
(46, 14, 46, 4, 1),
(47, 14, 46, 3, 1),
(48, 14, 46, 2, 1),
(49, 15, 47, 1, 1),
(50, 15, 47, 5, 1),
(51, 15, 47, 6, 1),
(52, 14, 48, 1, 1),
(53, 14, 48, 5, 1),
(54, 14, 48, 6, 1),
(55, 3, 49, 5, 1),
(56, 9, 49, 2, 1),
(57, 18, 49, 3, 1),
(58, 17, 49, 4, 1),
(59, 3, 50, 4, 1),
(60, 10, 51, 6, 1),
(61, 10, 51, 4, 1),
(62, 10, 51, 2, 1),
(63, 11, 52, 1, 1),
(64, 20, 70, 6, 1),
(65, 20, 70, 2, 1),
(66, 20, 70, 3, 1),
(67, 20, 71, 5, 1),
(68, 20, 71, 1, 1),
(69, 20, 71, 4, 1),
(70, 2, 72, 4, 1),
(71, 12, 73, 4, 1),
(72, 3, 30, 4, 1),
(74, 3, 30, 3, 1),
(75, 3, 29, 3, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `project_data` json DEFAULT NULL,
  `school_id` int(10) UNSIGNED DEFAULT NULL,
  `start` date DEFAULT NULL,
  `finish` date DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lessons_per_day` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `owner_id`, `project_name`, `project_data`, `school_id`, `start`, `finish`, `creation_time`, `lessons_per_day`) VALUES
(22, 30, '179E', '{"table": {"table": [[-1, -1, -1, -1], [-1, -1, 10, -1], [-1, -1, -1, -1], [-1, 5, 15, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [11, 6, -1, -1], [-1, -1, 8, -1], [-1, 7, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, 16, -1], [12, -1, -1, 13], [-1, -1, 9, -1], [-1, -1, -1, 14], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 30, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#7bdcb5", "db_id": "1", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#abb8c3", "db_id": "2", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7bdcb5", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#f78da7", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#9900ef", "db_id": "6", "index": 4, "isUsed": false, "verbose": true}, {"x": 3, "y": 1, "color": "#7bdcb5", "db_id": "3", "index": 0, "isUsed": true, "verbose": false}, {"x": 6, "y": 1, "color": "#7bdcb5", "db_id": "3", "index": 1, "isUsed": true, "verbose": false}, {"x": 8, "y": 1, "color": "#7bdcb5", "db_id": "3", "index": 2, "isUsed": true, "verbose": false}, {"x": 7, "y": 2, "color": "#7bdcb5", "db_id": "1", "index": 7, "isUsed": true, "verbose": false}, {"x": 13, "y": 2, "color": "#7bdcb5", "db_id": "1", "index": 8, "isUsed": true, "verbose": false}, {"x": 1, "y": 2, "color": "#9900ef", "db_id": "6", "index": 3, "isUsed": true, "verbose": false}, {"x": 6, "y": 0, "color": "#abb8c3", "db_id": "2", "index": 4, "isUsed": true, "verbose": false}, {"x": 12, "y": 0, "color": "#abb8c3", "db_id": "2", "index": 5, "isUsed": true, "verbose": false}, {"x": 12, "y": 3, "color": "#f78da7", "db_id": "4", "index": 6, "isUsed": true, "verbose": false}, {"x": 14, "y": 3, "color": "#f78da7", "db_id": "4", "index": 9, "isUsed": true, "verbose": false}, {"x": 3, "y": 2, "color": "#7bdcb5", "db_id": "1", "index": 10, "isUsed": true, "verbose": false}, {"x": 11, "y": 2, "color": "#7bdcb5", "db_id": "1", "index": 11, "isUsed": true, "verbose": false}]}', 1, '2017-01-16', '2017-01-21', '2017-01-31 18:42:51', 5),
(24, 30, 'zxcvxv', '{"table": {"table": [[-1, -1, -1, -1], [-1, 7, 10, -1], [-1, -1, -1, 14], [-1, -1, -1, -1], [-1, -1, 11, -1], [-1, -1, -1, -1], [6, -1, -1, 12], [-1, -1, -1, -1], [-1, 8, -1, -1], [-1, -1, 15, -1], [-1, -1, -1, -1], [5, -1, -1, 13], [-1, -1, 16, -1], [-1, 9, -1, -1], [-1, -1, 17, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 35, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#f78da7", "db_id": "1", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#ff6900", "db_id": "2", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#123123", "db_id": "3", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#00d084", "db_id": "4", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#fcb900", "db_id": "6", "index": 0, "isUsed": false, "verbose": true}, {"x": 11, "y": 0, "color": "#ff6900", "db_id": "2", "index": 1, "isUsed": true, "verbose": false}, {"x": 6, "y": 0, "color": "#ff6900", "db_id": "2", "index": 2, "isUsed": true, "verbose": false}, {"x": 1, "y": 1, "color": "#123123", "db_id": "3", "index": 9, "isUsed": true, "verbose": false}, {"x": 8, "y": 1, "color": "#123123", "db_id": "3", "index": 10, "isUsed": true, "verbose": false}, {"x": 13, "y": 1, "color": "#123123", "db_id": "3", "index": 11, "isUsed": true, "verbose": false}, {"x": 1, "y": 2, "color": "#f78da7", "db_id": "1", "index": 0, "isUsed": true, "verbose": false}, {"x": 4, "y": 2, "color": "#fcb900", "db_id": "6", "index": 3, "isUsed": true, "verbose": false}, {"x": 6, "y": 3, "color": "#00d084", "db_id": "4", "index": 6, "isUsed": true, "verbose": false}, {"x": 11, "y": 3, "color": "#00d084", "db_id": "4", "index": 8, "isUsed": true, "verbose": false}, {"x": 2, "y": 3, "color": "#00d084", "db_id": "4", "index": 12, "isUsed": true, "verbose": false}, {"x": 9, "y": 2, "color": "#fcb900", "db_id": "6", "index": 4, "isUsed": true, "verbose": false}, {"x": 12, "y": 2, "color": "#fcb900", "db_id": "6", "index": 5, "isUsed": true, "verbose": false}, {"x": 14, "y": 2, "color": "#fcb900", "db_id": "6", "index": 7, "isUsed": true, "verbose": false}]}', 1, '2017-01-25', '2017-01-31', '2017-01-31 19:10:12', 5),
(25, 30, 'aaaaaaa', '{"table": {"table": [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]], "width": 35, "height": 6}, "grades": ["5", "6", "1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#585381", "db_id": "2", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "4", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "6", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 5, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 6, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 7, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 8, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "13", "index": 9, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 10, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 11, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 12, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 13, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "13", "index": 14, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 15, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#585381", "db_id": "2", "index": 16, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 17, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 18, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "6", "index": 19, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 20, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "4", "index": 21, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 22, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 23, "isUsed": false, "verbose": false}]}', 1, '2017-02-22', '2017-02-28', '2017-02-02 14:53:50', 5),
(26, 30, 'куклы', '{"table": {"table": [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]], "width": 54, "height": 6}, "grades": ["5", "6", "1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#585381", "db_id": "2", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "4", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "6", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 5, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 6, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 7, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 8, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "13", "index": 9, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 10, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 11, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "18", "index": 12, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "19", "index": 13, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "20", "index": 14, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 15, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "22", "index": 16, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 17, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 18, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "25", "index": 19, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aff0f0", "db_id": "26", "index": 20, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#90eae9", "db_id": "27", "index": 21, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "28", "index": 22, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "29", "index": 23, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "30", "index": 24, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "31", "index": 25, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "32", "index": 26, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "33", "index": 27, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "34", "index": 28, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 29, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "36", "index": 30, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c2c70f", "db_id": "37", "index": 31, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "38", "index": 32, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 33, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "40", "index": 34, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "41", "index": 35, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7bdcb5", "db_id": "42", "index": 36, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "43", "index": 37, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "44", "index": 38, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "45", "index": 39, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "46", "index": 40, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "47", "index": 41, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "48", "index": 42, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "49", "index": 43, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 44, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "51", "index": 45, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "52", "index": 46, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 47, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "54", "index": 48, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 49, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "56", "index": 50, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "57", "index": 51, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "58", "index": 52, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bf670f", "db_id": "59", "index": 53, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "60", "index": 54, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "61", "index": 55, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "62", "index": 56, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#78d5ec", "db_id": "63", "index": 57, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "64", "index": 58, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "65", "index": 59, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "66", "index": 60, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 61, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "68", "index": 62, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "69", "index": 63, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#068200", "db_id": "70", "index": 64, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#beb40d", "db_id": "71", "index": 65, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "52", "index": 66, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "49", "index": 67, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "38", "index": 68, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "45", "index": 69, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "32", "index": 70, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "30", "index": 71, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 72, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 73, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 74, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 75, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 76, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 77, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 78, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 79, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 80, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 81, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "13", "index": 82, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 83, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#aff0f0", "db_id": "26", "index": 84, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "29", "index": 85, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "36", "index": 86, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "40", "index": 87, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "51", "index": 88, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "54", "index": 89, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "60", "index": 90, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "64", "index": 91, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#585381", "db_id": "2", "index": 92, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 93, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 94, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "28", "index": 95, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "30", "index": 96, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#78d5ec", "db_id": "63", "index": 97, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "68", "index": 98, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "65", "index": 99, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "62", "index": 100, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "56", "index": 101, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "48", "index": 102, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "43", "index": 103, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#7bdcb5", "db_id": "42", "index": 104, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "41", "index": 105, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "33", "index": 106, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#90eae9", "db_id": "27", "index": 107, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "20", "index": 108, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 109, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "6", "index": 110, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 111, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "19", "index": 112, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "22", "index": 113, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "25", "index": 114, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "31", "index": 115, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "34", "index": 116, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "44", "index": 117, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "47", "index": 118, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "57", "index": 119, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "66", "index": 120, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#cdfc9d", "db_id": "4", "index": 121, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 122, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 123, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "18", "index": 124, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c2c70f", "db_id": "37", "index": 125, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "46", "index": 126, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "58", "index": 127, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bf670f", "db_id": "59", "index": 128, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "69", "index": 129, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "61", "index": 130, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#068200", "db_id": "70", "index": 131, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#beb40d", "db_id": "71", "index": 132, "isUsed": false, "verbose": false}]}', 1, '2017-02-06', '2017-02-14', '2017-02-02 16:01:49', 6),
(27, 30, 'qqqq', '{"table": {"table": [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]], "width": 84, "height": 6}, "grades": ["5", "6", "1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 5, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "13", "index": 6, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 7, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 8, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "18", "index": 9, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "19", "index": 10, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "20", "index": 11, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 12, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "22", "index": 13, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 14, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 15, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "25", "index": 16, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aff0f0", "db_id": "26", "index": 17, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#90eae9", "db_id": "27", "index": 18, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "28", "index": 19, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "29", "index": 20, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "30", "index": 21, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "31", "index": 22, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "32", "index": 23, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "33", "index": 24, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "34", "index": 25, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 26, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "36", "index": 27, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c2c70f", "db_id": "37", "index": 28, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "38", "index": 29, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 30, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "40", "index": 31, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "41", "index": 32, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#76902e", "db_id": "42", "index": 33, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "43", "index": 34, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "44", "index": 35, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "45", "index": 36, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "46", "index": 37, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "47", "index": 38, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "48", "index": 39, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "49", "index": 40, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 41, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "51", "index": 42, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "52", "index": 43, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 44, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "54", "index": 45, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 46, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "56", "index": 47, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "57", "index": 48, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "58", "index": 49, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bf670f", "db_id": "59", "index": 50, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "60", "index": 51, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "61", "index": 52, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "62", "index": 53, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#78d5ec", "db_id": "63", "index": 54, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "64", "index": 55, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "65", "index": 56, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "66", "index": 57, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 58, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "68", "index": 59, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "69", "index": 60, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#068200", "db_id": "70", "index": 61, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#beb40d", "db_id": "71", "index": 62, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3df85a", "db_id": "72", "index": 63, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3df85a", "db_id": "72", "index": 64, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3df85a", "db_id": "72", "index": 65, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#beb40d", "db_id": "71", "index": 66, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#068200", "db_id": "70", "index": 67, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "69", "index": 68, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "61", "index": 69, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bf670f", "db_id": "59", "index": 70, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "58", "index": 71, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "46", "index": 72, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c2c70f", "db_id": "37", "index": 73, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 74, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 75, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "18", "index": 76, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 77, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 78, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 79, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 80, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 81, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 82, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 83, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 84, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 85, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 86, "isUsed": false, "verbose": false}]}', 1, '2017-02-15', '2017-02-28', '2017-02-02 16:15:04', 6),
(28, 30, 'Good Рабочий', '{"table": {"table": [[66, 81, 84, -1, -1, -1], [64, 82, 86, -1, -1, -1], [67, 83, 87, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, 78, -1, -1, -1, -1], [69, 74, 85, -1, -1, -1], [65, 80, -1, -1, -1, -1], [72, 79, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [68, 75, -1, -1, -1, -1], [71, 77, -1, -1, -1, -1], [70, 76, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]], "width": 35, "height": 6}, "grades": ["5", "6", "1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 5, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#eb144c", "db_id": "13", "index": 6, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 7, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 8, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "18", "index": 9, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "19", "index": 10, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "20", "index": 11, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 12, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "22", "index": 13, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 14, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 15, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "25", "index": 16, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aff0f0", "db_id": "26", "index": 17, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#90eae9", "db_id": "27", "index": 18, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "28", "index": 19, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "29", "index": 20, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "30", "index": 21, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "31", "index": 22, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "32", "index": 23, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "33", "index": 24, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "34", "index": 25, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 26, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "36", "index": 27, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c2c70f", "db_id": "37", "index": 28, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "38", "index": 29, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 30, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "40", "index": 31, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "41", "index": 32, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#76902e", "db_id": "42", "index": 33, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "43", "index": 34, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "44", "index": 35, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "45", "index": 36, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "46", "index": 37, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "47", "index": 38, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "48", "index": 39, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "49", "index": 40, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 41, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "51", "index": 42, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "52", "index": 43, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 44, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "54", "index": 45, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 46, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "56", "index": 47, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "57", "index": 48, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "58", "index": 49, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bf670f", "db_id": "59", "index": 50, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "60", "index": 51, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "61", "index": 52, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "62", "index": 53, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#78d5ec", "db_id": "63", "index": 54, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "64", "index": 55, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "65", "index": 56, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "66", "index": 57, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 58, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "68", "index": 59, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "69", "index": 60, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#068200", "db_id": "70", "index": 61, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#beb40d", "db_id": "71", "index": 62, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3df85a", "db_id": "72", "index": 63, "isUsed": false, "verbose": true}, {"x": 1, "y": 0, "color": "#af8500", "db_id": "12", "index": 0, "isUsed": true, "verbose": false}, {"x": 6, "y": 0, "color": "#5b9aea", "db_id": "14", "index": 6, "isUsed": true, "verbose": false}, {"x": 0, "y": 0, "color": "#bb7bee", "db_id": "23", "index": 9, "isUsed": true, "verbose": false}, {"x": 2, "y": 0, "color": "#7d902e", "db_id": "24", "index": 11, "isUsed": true, "verbose": false}, {"x": 10, "y": 0, "color": "#c48200", "db_id": "35", "index": 17, "isUsed": true, "verbose": false}, {"x": 5, "y": 0, "color": "#6a8200", "db_id": "39", "index": 4, "isUsed": true, "verbose": false}, {"x": 12, "y": 0, "color": "#dc8300", "db_id": "50", "index": 21, "isUsed": true, "verbose": false}, {"x": 11, "y": 0, "color": "#3ec80f", "db_id": "53", "index": 19, "isUsed": true, "verbose": false}, {"x": 7, "y": 0, "color": "#311c3c", "db_id": "55", "index": 15, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 64, "isUsed": false, "verbose": false}, {"x": 5, "y": 1, "color": "#238eed", "db_id": "60", "index": 8, "isUsed": true, "verbose": false}, {"x": 10, "y": 1, "color": "#3ec80f", "db_id": "54", "index": 18, "isUsed": true, "verbose": false}, {"x": 12, "y": 1, "color": "#c5cf0c", "db_id": "64", "index": 22, "isUsed": true, "verbose": false}, {"x": 11, "y": 1, "color": "#dc8300", "db_id": "51", "index": 20, "isUsed": true, "verbose": false}, {"x": 4, "y": 1, "color": "#6a8200", "db_id": "40", "index": 5, "isUsed": true, "verbose": false}, {"x": 7, "y": 1, "color": "#c48200", "db_id": "36", "index": 16, "isUsed": true, "verbose": false}, {"x": 6, "y": 1, "color": "#aa2dde", "db_id": "29", "index": 14, "isUsed": true, "verbose": false}, {"x": 0, "y": 1, "color": "#aff0f0", "db_id": "26", "index": 10, "isUsed": true, "verbose": false}, {"x": 1, "y": 1, "color": "#5b9aea", "db_id": "15", "index": 1, "isUsed": true, "verbose": false}, {"x": 2, "y": 1, "color": "#eb144c", "db_id": "13", "index": 3, "isUsed": true, "verbose": false}, {"x": 0, "y": 2, "color": "#af8500", "db_id": "11", "index": 2, "isUsed": true, "verbose": false}, {"x": 5, "y": 2, "color": "#bb7bee", "db_id": "21", "index": 7, "isUsed": true, "verbose": false}, {"x": 1, "y": 2, "color": "#aa2dde", "db_id": "28", "index": 12, "isUsed": true, "verbose": false}, {"x": 2, "y": 2, "color": "#aa2dde", "db_id": "28", "index": 13, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 65, "isUsed": false, "verbose": false}]}', 1, '2017-02-19', '2017-02-25', '2017-02-02 16:40:30', 5);
INSERT INTO `projects` (`id`, `owner_id`, `project_name`, `project_data`, `school_id`, `start`, `finish`, `creation_time`, `lessons_per_day`) VALUES
(29, 30, '1234', '{"table": {"table": [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]], "width": 30, "height": 6}, "grades": ["5", "6", "1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 5, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "13", "index": 6, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 7, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 8, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "18", "index": 9, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "19", "index": 10, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "20", "index": 11, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 12, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "22", "index": 13, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 14, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 15, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "25", "index": 16, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aff0f0", "db_id": "26", "index": 17, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#90eae9", "db_id": "27", "index": 18, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "28", "index": 19, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "29", "index": 20, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "30", "index": 21, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "31", "index": 22, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "32", "index": 23, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "33", "index": 24, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "34", "index": 25, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 26, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "36", "index": 27, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c2c70f", "db_id": "37", "index": 28, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "38", "index": 29, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7bdcb5", "db_id": "39", "index": 30, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "40", "index": 31, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "41", "index": 32, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#76902e", "db_id": "42", "index": 33, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "43", "index": 34, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "44", "index": 35, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "45", "index": 36, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "46", "index": 37, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "47", "index": 38, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "48", "index": 39, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "49", "index": 40, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 41, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "51", "index": 42, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "52", "index": 43, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 44, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "54", "index": 45, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 46, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "56", "index": 47, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "57", "index": 48, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "58", "index": 49, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bf670f", "db_id": "59", "index": 50, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "60", "index": 51, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "61", "index": 52, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "62", "index": 53, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#78d5ec", "db_id": "63", "index": 54, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "64", "index": 55, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "65", "index": 56, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "66", "index": 57, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 58, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "68", "index": 59, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "69", "index": 60, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#068200", "db_id": "70", "index": 61, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#beb40d", "db_id": "71", "index": 62, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3df85a", "db_id": "72", "index": 63, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 64, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 65, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 66, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 67, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 68, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#7bdcb5", "db_id": "39", "index": 69, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 70, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 71, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 72, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 73, "isUsed": false, "verbose": false}]}', 1, '2017-02-13', '2017-02-18', '2017-02-18 09:51:58', 5),
(30, 30, 'Проект  2', '{"table": {"table": [[-1, -1, 99, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [64, 81, -1, 84, -1, -1], [-1, -1, 95, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, 82, -1, 86, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, 102, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]], "width": 30, "height": 6}, "grades": ["5", "6", "1", "2", "3", "4"], "lessons": [{"x": -1, "y": -1, "color": "#acba01", "db_id": "7", "index": 0, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#acba01", "db_id": "8", "index": 1, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "9", "index": 2, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "10", "index": 3, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "11", "index": 4, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "12", "index": 6, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#af8500", "db_id": "13", "index": 5, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 9, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "15", "index": 7, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "18", "index": 8, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "19", "index": 10, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "20", "index": 11, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 12, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "22", "index": 13, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 14, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 15, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "25", "index": 16, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aff0f0", "db_id": "26", "index": 17, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#90eae9", "db_id": "27", "index": 18, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "28", "index": 19, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "29", "index": 20, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "30", "index": 21, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#1f8b2b", "db_id": "31", "index": 22, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "32", "index": 23, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "33", "index": 24, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "34", "index": 25, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 44, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "36", "index": 26, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c2c70f", "db_id": "37", "index": 27, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "38", "index": 28, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 29, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "40", "index": 30, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "41", "index": 31, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#76902e", "db_id": "42", "index": 32, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "43", "index": 33, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "44", "index": 34, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "45", "index": 35, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "46", "index": 36, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "47", "index": 37, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "48", "index": 38, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "49", "index": 39, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 40, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "51", "index": 41, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "52", "index": 42, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 43, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "54", "index": 45, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 46, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "56", "index": 47, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "57", "index": 48, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "58", "index": 49, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#bf670f", "db_id": "59", "index": 50, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "60", "index": 51, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "61", "index": 52, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "62", "index": 53, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#78d5ec", "db_id": "63", "index": 54, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "64", "index": 55, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "65", "index": 56, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "66", "index": 57, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 58, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "68", "index": 59, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "69", "index": 60, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#068200", "db_id": "70", "index": 61, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#beb40d", "db_id": "71", "index": 62, "isUsed": false, "verbose": true}, {"x": -1, "y": -1, "color": "#3df85a", "db_id": "72", "index": 63, "isUsed": false, "verbose": true}, {"x": 3, "y": 0, "color": "#af8500", "db_id": "12", "index": 2, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 64, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "23", "index": 65, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#7d902e", "db_id": "24", "index": 66, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "35", "index": 67, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 68, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "50", "index": 69, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "53", "index": 70, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "55", "index": 71, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "67", "index": 72, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "64", "index": 73, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "60", "index": 74, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "54", "index": 75, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "51", "index": 76, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "40", "index": 77, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "36", "index": 78, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#aff0f0", "db_id": "26", "index": 79, "isUsed": false, "verbose": false}, {"x": 3, "y": 1, "color": "#5b9aea", "db_id": "15", "index": 3, "isUsed": true, "verbose": false}, {"x": 6, "y": 1, "color": "#af8500", "db_id": "13", "index": 6, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "29", "index": 80, "isUsed": false, "verbose": false}, {"x": 3, "y": 3, "color": "#acba01", "db_id": "8", "index": 1, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#c5dd71", "db_id": "20", "index": 81, "isUsed": false, "verbose": false}, {"x": 6, "y": 3, "color": "#90eae9", "db_id": "27", "index": 5, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "33", "index": 82, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "41", "index": 83, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#76902e", "db_id": "42", "index": 84, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "43", "index": 85, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3c283c", "db_id": "48", "index": 86, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#311c3c", "db_id": "56", "index": 87, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#238eed", "db_id": "62", "index": 88, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#c5cf0c", "db_id": "65", "index": 89, "isUsed": false, "verbose": false}, {"x": 4, "y": 2, "color": "#af8500", "db_id": "11", "index": 4, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 90, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#bb7bee", "db_id": "21", "index": 91, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#aa2dde", "db_id": "28", "index": 92, "isUsed": false, "verbose": false}, {"x": 0, "y": 2, "color": "#1f8b2b", "db_id": "30", "index": 0, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#c48200", "db_id": "32", "index": 93, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#d8c1ed", "db_id": "45", "index": 94, "isUsed": false, "verbose": false}, {"x": 12, "y": 2, "color": "#6a8200", "db_id": "38", "index": 7, "isUsed": true, "verbose": false}, {"x": -1, "y": -1, "color": "#dc8300", "db_id": "49", "index": 95, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#3ec80f", "db_id": "52", "index": 96, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#78d5ec", "db_id": "63", "index": 97, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#8030f1", "db_id": "68", "index": 98, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 99, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#5b9aea", "db_id": "14", "index": 100, "isUsed": false, "verbose": false}, {"x": -1, "y": -1, "color": "#6a8200", "db_id": "39", "index": 101, "isUsed": false, "verbose": false}]}', 1, '2017-02-19', '2017-02-25', '2017-02-18 09:59:22', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `role_user_school_relation`
--

CREATE TABLE `role_user_school_relation` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  `is_approved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `role_user_school_relation`
--

INSERT INTO `role_user_school_relation` (`id`, `user_id`, `role_id`, `school_id`, `is_approved`) VALUES
(1, 27, 1, 1, 1),
(2, 28, 1, 1, 1),
(3, 29, 1, 1, 1),
(4, 30, 1, 1, 1),
(5, 27, 2, 1, 1),
(10, 31, 1, 1, 1),
(11, 32, 1, 1, 1),
(12, 33, 1, 1, 1),
(13, 34, 1, 1, 1),
(14, 35, 1, 1, 1),
(15, 36, 1, 1, 1),
(16, 37, 1, 1, 1),
(17, 38, 1, 1, 1),
(18, 39, 1, 1, 1),
(19, 40, 1, 1, 1),
(20, 41, 1, 1, 1),
(21, 42, 1, 1, 1),
(22, 43, 1, 1, 1),
(23, 44, 1, 1, 1),
(24, 45, 1, 1, 1),
(25, 46, 1, 1, 1),
(26, 47, 1, 1, 1),
(27, 48, 1, 1, 1),
(28, 49, 1, 1, 1),
(29, 50, 1, 1, 1),
(30, 51, 1, 1, 1),
(31, 52, 1, 1, 1),
(37, 55, 1, 1, 1),
(38, 56, 1, 1, 1),
(39, 57, 1, 1, 1),
(40, 58, 1, 1, 1),
(41, 59, 1, 1, 1),
(42, 60, 1, 1, 1),
(43, 61, 1, 1, 1),
(44, 62, 1, 1, 1),
(45, 63, 1, 1, 1),
(46, 64, 1, 1, 1),
(47, 65, 1, 1, 1),
(48, 66, 1, 1, 1),
(49, 67, 1, 1, 1),
(50, 68, 1, 1, 1),
(51, 69, 1, 1, 1),
(52, 70, 1, 1, 1),
(53, 71, 1, 1, 1),
(54, 72, 1, 1, 1),
(55, 73, 1, 1, 1),
(56, 74, 1, 1, 1),
(57, 75, 1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

CREATE TABLE `schedule` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  `free_pairs` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `schedule`
--

INSERT INTO `schedule` (`id`, `user_id`, `date`, `school_id`, `free_pairs`) VALUES
(80, 30, '2017-01-10', 1, '[false, false, false, false, false, false]'),
(81, 30, '2017-01-11', 1, '[false, false, false, false, false, false]'),
(84, 30, '2017-01-14', 1, '[false, false, false, false, false, false]'),
(85, 30, '2017-01-15', 1, '[false, false, false, false, false, false]'),
(123, 30, '2017-01-16', 1, '[true, false, false, false, false, false]'),
(124, 30, '2017-01-17', 1, '[false, true, false, false, false, false]'),
(125, 30, '2017-01-18', 1, '[false, false, true, false, false, false]'),
(126, 30, '2017-01-19', 1, '[false, false, false, true, false, false]'),
(127, 30, '2017-01-20', 1, '[false, false, false, false, true, false]'),
(128, 30, '2017-01-21', 1, '[false, false, false, false, false, true]'),
(129, 30, '2017-01-12', 1, '[false, false, true, false, false, false]'),
(130, 30, '2017-01-13', 1, '[true, true, true, true, true, false]'),
(131, 30, '2017-01-22', 1, '[false, false, false, false, false, false]'),
(132, 30, '2017-01-23', 1, '[false, false, false, false, false, false]'),
(133, 30, '2017-01-24', 1, '[false, false, true, true, true, false]'),
(134, 30, '2017-01-25', 1, '[true, false, false, false, false, false]'),
(135, 30, '2017-01-26', 1, '[false, true, false, false, false, false]'),
(136, 30, '2017-01-27', 1, '[false, true, true, false, false, false]'),
(137, 30, '2017-01-28', 1, '[false, false, false, true, false, false]'),
(138, 30, '2017-01-29', 1, '[false, false, false, false, true, false]'),
(139, 30, '2017-01-30', 1, '[false, false, false, false, false, true]'),
(140, 30, '2017-01-31', 1, '[false, false, false, false, true, false]'),
(167, 29, '2017-02-13', 1, '[true, true, false, false, false, false]'),
(168, 29, '2017-02-14', 1, '[true, true, false, false, false, false]'),
(169, 29, '2017-02-15', 1, '[false, false, false, false, false, false]'),
(170, 29, '2017-02-16', 1, '[false, false, false, false, false, false]'),
(171, 29, '2017-02-17', 1, '[false, false, false, false, false, false]'),
(172, 29, '2017-02-18', 1, '[false, false, false, false, false, false]'),
(191, 30, '2017-02-19', 1, '[true, false, false, false, false, false]'),
(192, 30, '2017-02-20', 1, '[true, false, false, false, false, false]'),
(193, 30, '2017-02-21', 1, '[true, false, false, false, false, false]'),
(194, 30, '2017-02-22', 1, '[true, false, false, false, false, false]'),
(195, 30, '2017-02-23', 1, '[true, false, false, false, false, false]'),
(196, 30, '2017-02-24', 1, '[false, false, false, false, false, false]'),
(197, 30, '2017-02-25', 1, '[false, false, false, false, false, false]'),
(198, 30, '2017-02-26', 1, '[false, false, false, false, false, false]'),
(199, 30, '2017-02-27', 1, '[false, false, false, false, false, false]'),
(200, 30, '2017-02-28', 1, '[false, false, false, false, false, false]'),
(201, 33, '2017-02-13', 1, '[false, true, false, false, false, true]'),
(202, 33, '2017-02-14', 1, '[false, true, false, false, false, true]'),
(203, 33, '2017-02-15', 1, '[false, true, false, false, false, true]'),
(204, 33, '2017-02-16', 1, '[false, true, false, false, false, true]'),
(205, 33, '2017-02-17', 1, '[false, true, false, false, false, true]'),
(206, 33, '2017-02-18', 1, '[false, true, false, false, false, true]'),
(207, 33, '2017-02-19', 1, '[false, true, false, false, false, true]'),
(208, 33, '2017-02-20', 1, '[false, true, false, false, false, true]'),
(209, 33, '2017-02-21', 1, '[false, true, false, false, false, true]'),
(210, 33, '2017-02-22', 1, '[false, true, false, false, false, true]'),
(211, 33, '2017-02-23', 1, '[false, false, false, false, false, false]'),
(212, 33, '2017-02-24', 1, '[false, false, false, false, false, false]'),
(213, 33, '2017-02-25', 1, '[false, false, false, false, false, false]'),
(214, 33, '2017-02-26', 1, '[false, false, false, false, false, false]'),
(215, 33, '2017-02-27', 1, '[false, false, false, false, false, false]'),
(216, 33, '2017-02-28', 1, '[false, false, false, false, false, false]'),
(217, 30, '2017-02-13', 1, '[true, false, false, false, false, false]'),
(218, 30, '2017-02-14', 1, '[true, false, false, false, false, false]'),
(219, 30, '2017-02-15', 1, '[true, false, false, false, false, false]'),
(220, 30, '2017-02-16', 1, '[true, true, true, true, false, false]'),
(221, 30, '2017-02-17', 1, '[true, false, false, false, false, false]'),
(222, 30, '2017-02-18', 1, '[true, false, false, false, false, false]');

-- --------------------------------------------------------

--
-- Структура таблицы `schools`
--

CREATE TABLE `schools` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(80) CHARACTER SET utf8 NOT NULL,
  `lessons_per_day` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `schools`
--

INSERT INTO `schools` (`id`, `name`, `lessons_per_day`) VALUES
(1, '179 МИОО', 6),
(2, '58 ШК', 8),
(3, '13337', 6),
(4, 'аощл', 13);

-- --------------------------------------------------------

--
-- Структура таблицы `school_time`
--

CREATE TABLE `school_time` (
  `id` int(10) UNSIGNED NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  `lesson` int(10) UNSIGNED NOT NULL,
  `start_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `school_time`
--

INSERT INTO `school_time` (`id`, `school_id`, `lesson`, `start_time`) VALUES
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

CREATE TABLE `subjects` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` tinytext CHARACTER SET utf8 NOT NULL,
  `school_id` int(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `school_id`) VALUES
(2, 'Химия', 1),
(3, 'Алгебра', 1),
(4, 'Англ.яз.', 1),
(7, 'География', 1),
(8, 'Физика', 1),
(9, 'Геометрия', 1),
(10, 'История', 1),
(11, 'Сл-сть', 1),
(12, 'Физ-ра', 1),
(13, 'Руск. яз', 1),
(14, 'Литература', 1),
(15, 'Информатика', 1),
(16, 'МХК', 1),
(17, 'Экономика', 1),
(18, 'Теорвер', 1),
(19, 'Мат.анализ', 1),
(20, 'Биология', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(60) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `name` tinytext CHARACTER SET utf8 NOT NULL,
  `approved` int(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_pass`, `name`, `approved`) VALUES
(27, 'g1231234', 'lololo', '$2y$10$uSnV4KxCkBGp6JvYdrGnfulqIx1SvEbJLxj7Sd5w7bJRu.OsPgdfS', 'G1234re213', 1),
(28, 'acadab', 'acadab', '$2y$10$sluHNeXvfPFaG4lRkuyGhelCV2O8brIJmX8M4/Z64JZm3hcOWGX9.', 'Greeeg', 1),
(29, 'greg', 'lalallalal', '$2y$10$UjYIQWhfAvFOSG2mwgznQ.UAy5S6vQxth45l8tT4wsFQdR0e9IO4C', 'Гриша', 1),
(30, 'root', 'root', '$2y$10$J4p5ulzOUTR5fEGNiZ9ocO0kboz4TA/Pk1vejJ6nrCMVXMOM9OtsS', 'Дмитрий Викторович Емельяненко', 1),
(31, 'asasas', 'asasas', '$2y$10$.dY5lCm83ph/dxx4CumXFuaDhVmfOAv5magjHTfsB9ey7gpzx/Mge', 'Ольга', 1),
(32, 'zxzxzx', 'zxzxzx', '$2y$10$BstbRjYW3XQi272svouwu.pncLLGnxwycXuTo.wMjHs0wn76fKQeq', 'ЮН', 1),
(33, 'grgrgr', 'grgrgr', '$2y$10$oYUgNv3ZLDWlkag8t6TiyutRBDDJJ57op1M82XArmPJ5MCWfcTJlW', 'Гриц', 1),
(34, 'dndndn', 'dndndn', '$2y$10$Ne1jHeG8wu8DKXzM3aK1Zuc52nIZwWQVgwBHQhXE1h8ukFZGvCEA6', 'Денис', 1),
(35, 'nasnas', 'nasnas', '$2y$10$7SY4CzbAUbpeiFQsG6C8MecAgBqWzHXollq3JB9EuZlp68VBlxzJG', 'Настя', 1),
(36, 'asdfasdf', 'massmass', '$2y$10$.uOIHKIc.lVOS.xuFjEF.Ol3gCqesjluLjeMj3xs4z3Pqj./aLfHy', 'Маша С', 1),
(37, 'sonson', 'sonson', '$2y$10$5tcHrhW2bqHcPpOzb92.5.CTXRIMcYSQY3CuMihaDq26ERXW4cfge', 'Соня', 1),
(38, 'vanvan', 'vanvan', '$2y$10$SDS/z1MKIGU41OK5wXAW5OnyAwJsmURgT6gPRVq9mujyg8iJzCVje', 'Ваня', 1),
(39, 'volvol', 'volvol', '$2y$10$bVltpXqraRnWTEGfSgMcDu4Fps48MEYpNDdFOBEVYzrn2GYQqxTT2', 'Володя', 1),
(40, 'marmar', 'marmar', '$2y$10$e3bgqrjJX2eqQSE9lZ8aAelo54zu0v6NMdOlATSm2ia1Y6zHZKJDu', 'Марина', 1),
(41, 'zkzkzk', 'zkzkzk', '$2y$10$HZSGtd7KSGGgCdhidB2yFO5DJPUY641LRiA.evzOWKYnVpBZ96JIe', 'ЖК', 1),
(42, 'ananvyb', 'ananvyb', '$2y$10$7J.LjYBaNNQTIQwNt6IEuOlDNwc/Bv1i4LxH6yBtnOZpJgSlNfUby', 'Аня', 1),
(43, 'gngngn', 'gngngn', '$2y$10$U3HpvUQ4p12Rk0JV5FgP4.XvsGYUtC7u5iqQsh3GYI4VER2FzlVTe', 'ГН', 1),
(44, 'mashk', 'mashk', '$2y$10$Stjn5iSD0A7ar/9bZu1MFOqJ1YciTwc8IUpkC53iRdxvbN0iks7qG', 'Маша К', 1),
(45, 'kolkol', 'kolkol', '$2y$10$JCsPBMXAXE72WY76xPa0hO5EhvU13vXj7ZyQSn1IkMohX2Jd423pm', 'Коля', 1),
(46, 'Alalal', 'Alalal', '$2y$10$1qpts0nLaGShJG2pM85M8eruGiMKgwUSbBpElghnDjkvKZGbmV/eq', 'Алиса', 1),
(47, 'okokok', 'okokok', '$2y$10$I6nIOsJzqBonEATKGEUkGeIMx6Hy4kSUG7uLbMsgWHtZVb8t3so96', 'Ок', 1),
(48, 'asasasya', 'asasasya', '$2y$10$p7E2WkGUz.F9rmCPptDXi.83bUCVAUrA8MUT3TTq5IszaYvCzpEIi', 'Ася', 1),
(49, 'alexalex', 'alexalex', '$2y$10$WfPdjOVaQb/.BFRfL//vDefItAG8MICIkTPP2SXXBM5KfW8nxK1tG', 'Алекс', 1),
(50, 'irinae', 'irinae', '$2y$10$QQ9QDSkON5r5bwU65ju58eb59JglSaskUvsEv726hHWHHBPr5q76q', 'И.Е', 1),
(51, 'KatSosn', 'KatSosn', '$2y$10$T6MUMrr1kDDLPJM6.W5YXu16fO44khD1F8SyB0SgirdFYSYRCJd6W', 'Катя', 1),
(52, 'innaa', 'innaa', '$2y$10$K7USoTdTm.lT7nzCsXXoNuYnrqWFJUF.Kw2/cQHGtbqij1pSpWBWC', 'Инна', 1),
(74, 'zxzxc', 'zxcv@zx.cv', '$2y$10$XI/joJHOr2O9WhC4PZ9cSufo0eiNy/KIl5.ehFO28rWeS9XGW9INi', 'zx', 1),
(70, 'azamat', 'azamat', '$2y$10$iPJ3wLHXTSCVNYsfjjiiguNu0bSnnH4RPTtDFWwxOIlykiFso041e', 'Азамат', 1),
(71, 'mariakhina', 'mariakhina', '$2y$10$vf4JOFGiC2FAceu3U7icy.bvdfKEVjeRzLfpi30nPXU0mIJzmjscC', 'Таня', 1),
(72, 'zhigulev', 'zhigulev', '$2y$10$sD14s3vjPkyDcS5XsYORmuZrOY4gUTu.7vMbiaEHnMONWmIwpXNYG', 'АЖ', 1),
(73, 'aivazyan', 'aivazyan', '$2y$10$6DwinupXWjsIStADg/n1EumIFr//GRuZgSit4iQPm1/HbxcCDe0Ne', 'Айвазян', 1),
(82, 'DimkaE', 'dimdi-y@ya.ru', '$2y$10$6AqQ3etlCNUOv8qnxjpQzuoYGUosjGmgRGjI1TgjJb/JuBgtOYtSq', 'Димка Е', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `user_approve`
--

CREATE TABLE `user_approve` (
  `user_id` int(20) NOT NULL,
  `token` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `role_user_school_relation`
--
ALTER TABLE `role_user_school_relation`
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Индексы таблицы `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UQ_user_date` (`user_id`,`date`);

--
-- Индексы таблицы `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `school_time`
--
ALTER TABLE `school_time`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD UNIQUE KEY `user_email_2` (`user_email`),
  ADD UNIQUE KEY `user_name_2` (`user_name`);

--
-- Индексы таблицы `user_approve`
--
ALTER TABLE `user_approve`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT для таблицы `role_user_school_relation`
--
ALTER TABLE `role_user_school_relation`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT для таблицы `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;
--
-- AUTO_INCREMENT для таблицы `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `school_time`
--
ALTER TABLE `school_time`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT для таблицы `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
