-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Янв 20 2017 г., 17:46
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
  `subject_id` int(20) UNSIGNED NOT NULL,
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `grade_id` int(10) UNSIGNED NOT NULL,
  `school_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`id`, `subject_id`, `teacher_id`, `grade_id`, `school_id`) VALUES
(1, 1, 27, 3, 1),
(2, 2, 27, 1, 1),
(3, 1, 28, 2, 1),
(4, 2, 28, 4, 1),
(5, 1, 1, 3, 1),
(6, 2, 28, 3, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `project_data` int(11) DEFAULT NULL,
  `school_id` int(10) UNSIGNED DEFAULT NULL,
  `start` date DEFAULT NULL,
  `finish` date DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lessons_per_day` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `owner_id`, `project_name`, `project_data`, `school_id`, `start`, `finish`, `creation_time`, `lessons_per_day`) VALUES
(1, 27, 'project1(Е классы)', NULL, 1, NULL, NULL, '2017-01-16 17:43:02', 5),
(2, 30, 'project2(Е классы)', NULL, 1, NULL, NULL, '2017-01-16 17:43:02', 6),
(4, 27, 'аощльдва', NULL, 1, NULL, NULL, '2017-01-16 17:43:02', 7),
(5, 27, 'аощльдва', NULL, 1, NULL, NULL, '2017-01-16 17:43:02', 5),
(6, 27, 'аощльдва', NULL, 1, '2017-10-11', '2017-11-11', '2017-01-16 17:43:02', 6),
(7, 27, 'аощлsasasasьдва', NULL, 1, '2017-10-11', '2017-11-11', '2017-01-16 17:43:02', 5),
(8, 27, 'lalalalalal', NULL, 1, '2017-01-23', '2017-01-28', '2017-01-20 16:32:02', 6),
(9, 27, 'аощльдва', NULL, 1, '2017-10-11', '2017-11-11', '2017-01-20 16:50:05', 17),
(10, 27, 'lol', NULL, 1, '2017-01-11', '2017-01-21', '2017-01-20 17:03:09', 123),
(11, 27, 'sukscsc', NULL, 1, '2017-01-01', '2017-01-03', '2017-01-20 17:43:46', 139);

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
(5, 27, 2, 1, 1);

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
(1, 'Физика', 1),
(2, 'Химия', 1),
(3, 'Алгебра', 1),
(4, 'А.Я.', 1);

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
(27, 'g1231234', 'lololo', '$2y$10$uSnV4KxCkBGp6JvYdrGnfulqIx1SvEbJLxj7Sd5w7bJRu.OsPgdfS', 'G1234re213'),
(28, 'acadab', 'acadab', '$2y$10$sluHNeXvfPFaG4lRkuyGhelCV2O8brIJmX8M4/Z64JZm3hcOWGX9.', 'Greeeg'),
(29, 'greg', 'lalallalal', '$2y$10$UjYIQWhfAvFOSG2mwgznQ.UAy5S6vQxth45l8tT4wsFQdR0e9IO4C', 'Гриша'),
(30, 'root', 'root', '$2y$10$sluHNeXvfPFaG4lRkuyGhelCV2O8brIJmX8M4/Z64JZm3hcOWGX9.', 'Дмитрий Викторович Емельяненко');

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT для таблицы `role_user_school_relation`
--
ALTER TABLE `role_user_school_relation`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `school_time`
--
ALTER TABLE `school_time`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT для таблицы `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
