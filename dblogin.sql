-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Дек 29 2016 г., 19:41
-- Версия сервера: 5.7.16-0ubuntu0.16.04.1
-- Версия PHP: 7.0.13-1~dotdeb+8.1

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
(4, 11, 'E', 1);

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
(1, 'Физика', 27, 3),
(2, 'Физика2', 27, 1),
(3, 'Алгебра', 28, 2),
(4, 'Алгебра2', 28, 4),
(5, 'jkdsnvdjknv', 1, 3),
(6, 'Maths', 28, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `owner_id`, `project_name`) VALUES
(1, 27, 'project1(Е классы)'),
(2, 28, 'project2(Е классы)');

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
(7, 1, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `schools`
--

CREATE TABLE `schools` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(80) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `schools`
--

INSERT INTO `schools` (`id`, `name`) VALUES
(1, '179 МИОО'),
(2, '58 ШК'),
(3, '13337');

-- --------------------------------------------------------

--
-- Структура таблицы `school_user_relation`
--

CREATE TABLE `school_user_relation` (
  `id` int(10) UNSIGNED NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `school_user_relation`
--

INSERT INTO `school_user_relation` (`id`, `school_id`, `user_id`) VALUES
(1, 1, 27),
(2, 1, 28),
(3, 2, 29);

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
  `is_maker` tinyint(1) NOT NULL,
  `is_approved` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_pass`, `name`, `is_maker`, `is_approved`) VALUES
(27, 'g1231234', 'root', '$2y$10$uSnV4KxCkBGp6JvYdrGnfulqIx1SvEbJLxj7Sd5w7bJRu.OsPgdfS', 'G1234re213', 1, 0),
(28, 'acadab', 'newuserrrrr', '$2y$10$zn2lcIXahaicOJtCRELoLuAU0689pzbhc8nrJXyHivW4XzJbI.bDy', 'Greeeg', 1, 0),
(29, 'greg', 'lalallalal', '$2y$10$UjYIQWhfAvFOSG2mwgznQ.UAy5S6vQxth45l8tT4wsFQdR0e9IO4C', 'Гриша', 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `user_role_relation`
--

CREATE TABLE `user_role_relation` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
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
-- Индексы таблицы `project_lesson_relation`
--
ALTER TABLE `project_lesson_relation`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `school_user_relation`
--
ALTER TABLE `school_user_relation`
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
-- Индексы таблицы `user_role_relation`
--
ALTER TABLE `user_role_relation`
  ADD KEY `id` (`id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `project_lesson_relation`
--
ALTER TABLE `project_lesson_relation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `school_user_relation`
--
ALTER TABLE `school_user_relation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT для таблицы `user_role_relation`
--
ALTER TABLE `user_role_relation`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
