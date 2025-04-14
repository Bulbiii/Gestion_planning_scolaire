-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 14, 2025 at 05:16 PM
-- Server version: 10.5.28-MariaDB-0+deb11u1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `info3`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `user_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `surname`, `user_id`) VALUES
(1, 'Ludovic', 'Herve', 16),
(20, 'Marc', 'Lefevre', 65);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`name`) VALUES
('3C'),
('4A'),
('5B');

-- --------------------------------------------------------

--
-- Table structure for table `classroom`
--

CREATE TABLE `classroom` (
  `num` int(11) NOT NULL,
  `specificity` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classroom`
--

INSERT INTO `classroom` (`num`, `specificity`) VALUES
(1, 'MATH'),
(2, 'INFO'),
(205, 'INFO');

-- --------------------------------------------------------

--
-- Table structure for table `class_teacher`
--

CREATE TABLE `class_teacher` (
  `teacher_id` int(11) NOT NULL,
  `class_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_teacher`
--

INSERT INTO `class_teacher` (`teacher_id`, `class_name`) VALUES
(1, '3C'),
(1, '4A'),
(2, '3C');

-- --------------------------------------------------------

--
-- Table structure for table `constraint`
--

CREATE TABLE `constraint` (
  `id` int(11) NOT NULL,
  `day` varchar(100) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `h_start` time NOT NULL,
  `h_end` time NOT NULL,
  `description` text NOT NULL,
  `recurrent` tinyint(1) NOT NULL,
  `id_teacher` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `constraint`
--

INSERT INTO `constraint` (`id`, `day`, `date_start`, `date_end`, `h_start`, `h_end`, `description`, `recurrent`, `id_teacher`) VALUES
(1, 'Lundi', '2025-02-04', '2025-02-04', '08:00:00', '15:00:00', 'Piscine', 0, 1),
(3, 'Mercredi', '2025-01-12', '2025-01-14', '08:00:00', '10:00:00', 'Grasse matiné', 0, 1),
(13, '...', '2025-03-10', '2025-03-11', '09:00:00', '00:30:00', '', 0, 1),
(14, 'monday', '2025-03-10', '2025-03-10', '08:00:00', '10:00:00', '..', 1, 2),
(24, '...', '2025-03-10', '2025-03-11', '08:00:00', '00:30:00', 'coucou', 0, 1),
(37, '...', '2025-11-01', '2025-11-01', '08:00:00', '10:00:00', 'toto', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `day` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `date` date NOT NULL,
  `recurrent` tinyint(1) NOT NULL,
  `h_start` time NOT NULL,
  `h_end` time NOT NULL,
  `subject_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `classroom_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `day`, `date`, `recurrent`, `h_start`, `h_end`, `subject_id`, `teacher_id`, `class_name`, `classroom_num`) VALUES
(1, 'friday', '2025-02-11', 1, '08:00:00', '11:00:00', 1, 1, '3C', 1),
(3, 'monday', '2025-02-15', 0, '14:00:00', '15:00:00', 4, 1, '4A', 205),
(4, 'thursday', '2025-02-16', 0, '10:00:00', '11:30:00', 4, 2, '3C', 205),
(5, 'friday', '2025-03-10', 1, '14:00:00', '15:00:00', 1, 2, '3C', 205),
(21, 'monday', '2025-08-04', 0, '08:00:00', '10:00:00', 1, 1, '4A', 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `class_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `surname`, `user_id`, `class_name`) VALUES
(7, 'Jean', 'Dupont', 10, '3C'),
(19, 'Lou', 'Lorville', 75, '4A');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `nb_hours` time NOT NULL,
  `specificity` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`, `nb_hours`, `specificity`) VALUES
(1, 'Math', '00:00:02', ''),
(2, 'Info', '00:01:28', 'INFO'),
(3, 'Sport', '00:00:12', 'Gymnase'),
(4, 'Français', '00:00:01', ''),
(7, 'Informatique', '04:00:00', 'INFO');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `surname` varchar(200) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `surname`, `id_user`) VALUES
(1, 'Michel', 'Jackson', 2),
(2, 'Riviere', 'Charles', 13);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_subject`
--

CREATE TABLE `teacher_subject` (
  `id_teacher` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_subject`
--

INSERT INTO `teacher_subject` (`id_teacher`, `id_subject`) VALUES
(1, 1),
(1, 2),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role` enum('admin','teacher','student','') NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `role`, `mail`, `password`) VALUES
(2, 'teacher', 'mich.jack@mail.fr', 'azerty'),
(10, 'student', 'jeandu93@mail.fr', 'password'),
(13, 'teacher', 'ruisseau@mail.fr', 'motdepasse'),
(16, 'admin', 'ludo.herve@mail.com', 'aaaaa'),
(65, 'admin', 'marc.lefevre@mail.fr', 'lelele'),
(75, 'student', 'LL@mail.fr', 'lolo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id_admin` (`user_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`num`);

--
-- Indexes for table `class_teacher`
--
ALTER TABLE `class_teacher`
  ADD PRIMARY KEY (`teacher_id`,`class_name`),
  ADD KEY `fk_classs_name` (`class_name`);

--
-- Indexes for table `constraint`
--
ALTER TABLE `constraint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teacher_id` (`id_teacher`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teachers_id_courses` (`teacher_id`),
  ADD KEY `fk_suject_id_courses` (`subject_id`),
  ADD KEY `fk_class_name_courses` (`class_name`),
  ADD KEY `fk_classroom_num_courses` (`classroom_num`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id_student` (`user_id`),
  ADD KEY `fk_class_name` (`class_name`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `teacher_subject`
--
ALTER TABLE `teacher_subject`
  ADD PRIMARY KEY (`id_teacher`,`id_subject`),
  ADD KEY `fk_subject_id_teacher_subject` (`id_subject`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `constraint`
--
ALTER TABLE `constraint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_user_id_admin` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `class_teacher`
--
ALTER TABLE `class_teacher`
  ADD CONSTRAINT `fk_classs_name` FOREIGN KEY (`class_name`) REFERENCES `class` (`name`),
  ADD CONSTRAINT `fk_teachers_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `constraint`
--
ALTER TABLE `constraint`
  ADD CONSTRAINT `fk_teacher_id` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `fk_class_name_courses` FOREIGN KEY (`class_name`) REFERENCES `class` (`name`),
  ADD CONSTRAINT `fk_classroom_num_courses` FOREIGN KEY (`classroom_num`) REFERENCES `classroom` (`num`),
  ADD CONSTRAINT `fk_suject_id_courses` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
  ADD CONSTRAINT `fk_teachers_id_courses` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `fk_class_name` FOREIGN KEY (`class_name`) REFERENCES `class` (`name`),
  ADD CONSTRAINT `fk_user_id_student` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `teacher_subject`
--
ALTER TABLE `teacher_subject`
  ADD CONSTRAINT `fk_subject_id_teacher_subject` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`),
  ADD CONSTRAINT `fk_teacher_id_teacher_subject` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
