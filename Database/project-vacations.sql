-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2023 at 10:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3-vacations`
--
CREATE DATABASE IF NOT EXISTS `project3-vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project3-vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 47),
(4, 48),
(2, 6),
(2, 44),
(2, 56),
(2, 50),
(2, 48),
(2, 54),
(2, 3),
(4, 51),
(12, 44),
(6, 51),
(2, 7),
(5, 54),
(11, 3),
(3, 54),
(11, 49),
(4, 51),
(6, 51),
(11, 40),
(12, 59),
(2, 46);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(1, 'yoheved', 'haggege', 'yohevedh26@gmail.com', 'ABCD', 1),
(2, 'ayala', 'haggege', 'ayala@gmail.com', '1234', 2),
(3, 'yehiel', 'haggege', 'yehiel@gmail.com', 'ABCD', 1),
(4, 'yaacov', 'haggege', 'yaacov@gmail.com', 'ABCD', 2),
(5, 'etan', 'haggege', 'eitan23@gmail.com', 'ABCD', 2),
(6, 'eitan', 'haggege', 'eitan45@gmail.com', 'ABCD', 2),
(11, 'sonia', 'zuili', 'soniaz@gmail.com', '1234', 2),
(12, 'myriam', 'haggege', 'mimi111@gmail.com', '1234', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(12,0) NOT NULL,
  `imageName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(3, 'Paris', 'Paris is a city unlike any other. It is overflowing with culture, history, and beauty. And while people travel to Paris to see the Louvre, climb the Eiffel Tower, or see Notre-Dame, the real magic is found in the streets', '2023-11-16', '2023-11-26', 1200, '1dd076d2-5bd5-43c8-81af-971aa3a56b04.jpeg'),
(6, 'Rome', 'Rome was called the “Eternal City” by the ancient Romans because they believed that no matter what happened in the rest of the world, the city of Rome would always remain standing. Exploring the city center by foot surrounded by glorious monuments and colossal remains takes you back in time to the glory that was Rome.', '2023-11-29', '2023-12-06', 500, '63e6891a-910a-48c6-b57c-5384a608f459.jpeg'),
(7, 'Thaiti', 'Feel treasured by warm welcomes and time-honoured traditions. Untouched wonders and breathtaking encounters. Exotic luxuries and hidden sanctuaries. Welcome to a place where you’ve probably never been, but always belonged. You will feel treasured in The Islands of Tahiti.', '2023-11-15', '2023-11-22', 3500, '4e9e3586-73e4-4e4f-acf7-f7ec09c0914c.jpeg'),
(40, 'Lahaina', 'If you’re visiting Maui, there is a high probability that you will visit or stay in Lahaina (or somewhere nearby). These are the best things to do in Lahaina, including exciting activities that will entertain all travelers!', '2023-10-19', '2023-10-31', 800, '425df764-e362-47ea-8c28-2b7e8bad5645.jpeg'),
(44, 'Germany', 'Germany is a paradise for nature lovers. Public transport is a convenient and sustainable way to discover the forest, meadows, mountains and lakes. Time for four insider tips.', '2023-11-22', '2023-11-29', 3000, '7d77cb34-d20c-4797-9f92-5dde5a01e566.jpeg'),
(46, 'Austria', 'No country waltzes so effortlessly between urban and outdoors as Austria. One day youre cresting alpine summits, the next youre swanning around imperial Vienna.', '2023-10-25', '2023-10-30', 799, '1d3526fc-b4d7-49e5-b8e2-836cc41e1c48.jpeg'),
(47, 'Australia', 'Australia boasts countless beaches, hundreds of national parks, and the oldest culture on earth. Explore the countryside, tropical islands, wineries, coral reefs, vibrant cities, the outback, seaside towns, ancient rainforests, and unique wildlife that cannot be found anywhere else in the world. Australia is a world-class destination and is a must to visit.', '2023-11-14', '2023-11-21', 3000, 'e529041a-b467-4a93-9634-c42628356666.jpeg'),
(48, 'London', ' Discover the best of London with Visit London, the official guide to England’s exciting capital. Find things to do in London, from iconic sightseeing spots and fun-filled days out to top restaurants, theatre and unmissable London events. If you’re not able to visit just yet, plan ahead to make the most of your next visit.', '2023-11-11', '2023-11-18', 670, '463a5078-f896-456b-9c32-d4aa8a0191b6.jpeg'),
(49, 'Hilo', 'Located on the northeastern side of the island of Hawaiʻi, Hilo offers breathtaking natural beauty plus all the amenities of a vibrant town. On the geographic flipside of the volcanic Kohala Coast, the region is blessed with dramatic waterfalls, fertile rainforests and blooming gardens. ', '2023-11-18', '2023-11-28', 4000, '5bac9bb8-10b6-40e4-9bd0-6cec707275d8.jpeg'),
(50, 'Rhodes', 'Also known as the \"Knights’ island\", Rhodes combines a rich history, impressive medieval architecture, amazing beaches and a lovely natural scenery! The Old Town of Rhodes with its stone-paved alleys and elegant mansions is a listed World Heritage Site.', '2023-11-18', '2023-11-28', 400, 'e5c9d146-c4aa-41d8-8612-9517e94746d4.jpeg'),
(51, 'Corfu', 'Chic and delicate by nature, Corfu has an unsurpassed natural beauty. The sea, the sun and the wind have carved an impressive shoreline on the island. Golden sandy and snow-white pebbled beaches, fine carved rocks resembling sculptures from a modern gallery, trees which stretch out their shadow up to the water. ', '2023-11-18', '2023-11-27', 5000, '8f7165bd-cd74-40b1-8d3a-60c25b979a85.jpeg'),
(54, 'New York', '“The City that Never Sleeps”  Central Park still stretches from 59th street to 110th Street and the Museum of Natural History still stands more or less across the park from the Guggenheim Museum and the Metropolitan Museum of Art, in Upper West and Upper East sides respectively, and the Empire State Building is still there, towering over Fifth Avenue at 34th Street.', '2023-11-12', '2023-11-22', 2500, 'e9c15ff3-e8d1-4484-a8bc-caf19d52532f.jpeg'),
(56, 'Berlin', 'Berlin awaits you. Visit the great museums & sights and then relax in a café. Look forward to concerts & shows, stroll through the shops and discover with us all the diversity of Berlin.', '2023-11-22', '2023-11-21', 900, '1c908244-717c-4009-93ca-878b1d080271.jpeg'),
(59, 'Africa', 'A vacation in Africa can offer a variety of experiences, from exploring natural wonders to immersing oneself in the rich cultural traditions of its many diverse countries.', '2023-11-29', '2023-12-07', 2780, '14ec9d3b-b32f-4be6-ad04-91dd6c0903dd.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
