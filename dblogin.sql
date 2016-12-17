-- phpMyAdmin SQL Dump
-- version 4.6.4deb1+deb.cihar.com~xenial.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Дек 17 2016 г., 23:08
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
  `grade_name` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `grades`
--

INSERT INTO `grades` (`id`, `grade_number`, `grade_name`) VALUES
(1, 8, 'E'),
(2, 9, 'E'),
(3, 10, 'E'),
(4, 11, 'E');

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `id` int(10) UNSIGNED NOT NULL,
  `lesson_name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `grade_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`id`, `lesson_name`, `teacher_id`, `grade_id`) VALUES
(1, 'Физика', 30, 3),
(2, 'Физика', 28, 1),
(3, 'Алгебра', 30, 2),
(4, 'Алгебра', 28, 4),
(5, 'jkdsnvdjknv', 1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `project_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `owner_id`, `project_name`, `project_data`) VALUES
(1, 30, 'E - классы', '{"lessons":[{"isUsed":true,"index":3,"x":1,"y":2,"db_id":1,"color":"blue"},{"isUsed":true,"index":1,"x":3,"y":0,"db_id":2,"color":"yellow"},{"isUsed":true,"index":4,"x":2,"y":1,"db_id":3,"color":"red"},{"isUsed":true,"index":2,"x":2,"y":3,"db_id":4,"color":"blue"},{"isUsed":true,"index":0,"x":0,"y":1,"db_id":"3","color":"yellow"},{"isUsed":true,"index":5,"x":1,"y":0,"db_id":"2","color":"yellow"}],"table":{"table":[[-1,4,-1,-1],[5,-1,0,-1],[-1,2,-1,3],[1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]],"width":6,"height":4},"grades":["8E","9E","10E","11E"]}'),
(2, 30, 'Больше е-классов', '{"lessons":[{"isUsed":true,"index":0,"x":1,"y":1,"db_id":"2","color":"yellow"},{"isUsed":true,"index":1,"x":3,"y":1,"db_id":"2","color":"yellow"},{"isUsed":true,"index":2,"x":2,"y":0,"db_id":"1","color":"blue"},{"isUsed":true,"index":3,"x":4,"y":1,"db_id":"2","color":"yellow"},{"isUsed":true,"index":4,"x":2,"y":1,"db_id":"2","color":"yellow"},{"isUsed":false,"index":0,"x":-1,"y":-1,"db_id":"1","color":"yellow"},{"isUsed":false,"index":1,"x":-1,"y":-1,"db_id":"2","color":"yellow"},{"isUsed":false,"index":2,"x":-1,"y":-1,"db_id":"1","color":"blue"}],"table":{"width":6,"height":2,"table":[[-1,-1],[-1,0],[2,4],[-1,1],[-1,3],[-1,-1]]},"grades":["10E","8E"]}'),
(3, 27, 'Больше е-классов', 'null');

-- --------------------------------------------------------

--
-- Структура таблицы `project_lesson_relation`
--

CREATE TABLE `project_lesson_relation` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `lesson_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `project_lesson_relation`
--

INSERT INTO `project_lesson_relation` (`id`, `project_id`, `lesson_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 1),
(6, 2, 2),
(9, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(60) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `name` tinytext CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_pass`, `name`) VALUES
(30, 'dimdiem', 'root', '$2y$10$7U2tFQPj5.F7Lj3DDzuBc.NSfwWLCOPrPwnFFK0m5N6WGclsS7oUe', 'dmitry'),
(28, 'acadab', 'newuserrrrr', '$2y$10$zn2lcIXahaicOJtCRELoLuAU0689pzbhc8nrJXyHivW4XzJbI.bDy', 'Greeeg'),
(29, 'greg', 'lalallalal', '$2y$10$UjYIQWhfAvFOSG2mwgznQ.UAy5S6vQxth45l8tT4wsFQdR0e9IO4C', 'Гриша');

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
-- Индексы таблицы `project_lesson_relation`
--
ALTER TABLE `project_lesson_relation`
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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `project_lesson_relation`
--
ALTER TABLE `project_lesson_relation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
