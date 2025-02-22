-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2025 at 12:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movieid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `poster` varchar(255) NOT NULL,
  `release_date` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movieid`, `title`, `poster`, `release_date`, `duration`, `genre`, `price`) VALUES
(1, 'Captain America: Brave New World', 'https://www.themoviedb.org/t/p/w1280/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', '2025', '1h 59m', 'Action, Thriller, Science Fiction', 320),
(2, 'Sonic the Hedgehog 3', 'https://www.themoviedb.org/t/p/w1280/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg', '2025', '1h 50m', 'Action, Comedy, Science Fiction', 290),
(3, 'Flow', 'https://www.themoviedb.org/t/p/w1280/imKSymKBK7o73sajciEmndJoVkR.jpg', '2024', '1h 25m', 'Animation, Fantasy, Adventure', 350),
(4, 'The Monkey', 'https://www.themoviedb.org/t/p/w1280/yYa8Onk9ow7ukcnfp2QWVvjWYel.jpg', '2025', '1h 38m', 'Horror, Comedy', 300),
(5, 'Flight Risk', 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4cR3hImKd78dSs652PAkSAyJ5Cx.jpg', '2025', '1h 31m', 'Action, Thriller, Crime ', 420),
(6, 'Conclave', 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vYEyxF1UT779RiEalpMjUT6kfdf.jpg', '2024', '2h', 'Drama, Mystery, Thriller ', 350),
(7, 'Better Man', 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fbGCmMp0HlYnAPv28GOENPShezM.jpg', '2024', '2h 16m', 'Music, Drama ', 400),
(8, 'Alarum', 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/v313aUGmMNj6yNveaiQXysBmjVS.jpg', '2025', '1h 35m', 'Action, Crime, Thriller ', 395),
(9, 'Paddington in Peru', 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1ffZAucqfvQu36x1C49XfOdjuOG.jpg', '2024', '1h 46m', 'Family, Adventure, Comedy ', 340),
(10, 'Nosferatu', 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg', '2024', '2h 13m', 'Horror, Fantasy', 390);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movieid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movieid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
