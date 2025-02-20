-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 20, 2025 at 04:29 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `filmreserve`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movieid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `poster` varchar(255) NOT NULL,
  `release_date` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movieid`, `title`, `poster`, `release_date`, `duration`, `genre`, `price`) VALUES
(1, 'Captain America: Brave New World', 'https://www.themoviedb.org/t/p/w1280/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', '2025', '1h 59m', 'Action, Thriller, Science Fiction', 320),
(2, 'Sonic the Hedgehog 3', 'https://www.themoviedb.org/t/p/w1280/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg', '2025', '1h 50m', 'Action, Comedy, Science Fiction', 290),
(3, 'Flow', 'https://www.themoviedb.org/t/p/w1280/imKSymKBK7o73sajciEmndJoVkR.jpg', '2024', '1h 25m', 'Animation, Fantasy, Adventure', 350),
(4, 'The Monkey', 'https://www.themoviedb.org/t/p/w1280/yYa8Onk9ow7ukcnfp2QWVvjWYel.jpg', '2025', '1h 38m', 'Horror, Comedy', 300);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movieid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movieid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
