-- phpMyAdmin SQL Dump
-- version 4.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2015-05-02 10:26:36
-- 服务器版本： 5.6.24
-- PHP Version: 5.6.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `rapid`
--

-- --------------------------------------------------------

--
-- 表的结构 `identity`
--

CREATE TABLE IF NOT EXISTS `identity` (
  `id` int(11) NOT NULL,
  `data` text NOT NULL,
  `iccid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `releases`
--

CREATE TABLE IF NOT EXISTS `releases` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `data` text NOT NULL,
  `version` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `releases`
--

INSERT INTO `releases` (`id`, `name`, `data`, `version`, `time`) VALUES
(1, 'v1.0', '{"color":"warning","note":"debug","packs":[{"name":"win","link":"http://baidu.com","color":"material-orange"}]}', 1, 1430560595),
(2, 'v1.0', '{"color":"success","note":"debug","packs":[{"name":"win","link":"http://baidu.com","color":"material-orange"},{"name":"android","link":"http://google.com","color":"material-blue"}]}', 2, 1430560600);

-- --------------------------------------------------------

--
-- 表的结构 `token`
--

CREATE TABLE IF NOT EXISTS `token` (
  `id` int(11) NOT NULL,
  `token` varchar(32) NOT NULL,
  `uid` int(11) NOT NULL,
  `iccid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pass` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `identity`
--
ALTER TABLE `identity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iccid` (`iccid`);

--
-- Indexes for table `releases`
--
ALTER TABLE `releases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `version` (`version`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);
