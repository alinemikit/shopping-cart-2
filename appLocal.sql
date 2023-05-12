-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 05/04/2023 às 03:05
-- Versão do servidor: 8.0.32
-- Versão do PHP: 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `appLocal`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Categoria`
--

CREATE TABLE `Categoria` (
  `cat_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Compra`
--

CREATE TABLE `Compra` (
  `comp_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usu_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comp_data` datetime NOT NULL,
  `comp_total` decimal(10,0) NOT NULL,
  `comp_status` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_compra`
--

CREATE TABLE `item_compra` (
  `comp_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prod_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ic_quantity` int DEFAULT NULL,
  `ic_discount` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Produto`
--

CREATE TABLE `Produto` (
  `prod_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prod_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prod_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prod_val` decimal(10,0) NOT NULL,
  `cat_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prod_imagePath` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Usuario`
--

CREATE TABLE `Usuario` (
  `usu_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `usu_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `usu_password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `usu_type` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `Categoria`
--
ALTER TABLE `Categoria`
  ADD PRIMARY KEY (`cat_id`),
  ADD UNIQUE KEY `cat_id` (`cat_id`);

--
-- Índices de tabela `Compra`
--
ALTER TABLE `Compra`
  ADD PRIMARY KEY (`comp_id`),
  ADD UNIQUE KEY `comp_id` (`comp_id`),
  ADD KEY `usu_id` (`usu_id`);

--
-- Índices de tabela `item_compra`
--
ALTER TABLE `item_compra`
  ADD PRIMARY KEY (`comp_id`,`prod_id`),
  ADD UNIQUE KEY `comp_id` (`comp_id`),
  ADD UNIQUE KEY `prod_id` (`prod_id`);

--
-- Índices de tabela `Produto`
--
ALTER TABLE `Produto`
  ADD PRIMARY KEY (`prod_id`),
  ADD UNIQUE KEY `prod_id` (`prod_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Índices de tabela `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`usu_id`),
  ADD UNIQUE KEY `usu_id` (`usu_id`);

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `Compra`
--
ALTER TABLE `Compra`
  ADD CONSTRAINT `FK_UsuarioId` FOREIGN KEY (`usu_id`) REFERENCES `Usuario` (`usu_id`);

--
-- Restrições para tabelas `item_compra`
--
ALTER TABLE `item_compra`
  ADD CONSTRAINT `FK_CompraId` FOREIGN KEY (`comp_id`) REFERENCES `Compra` (`comp_id`);

--
-- Restrições para tabelas `Produto`
--
ALTER TABLE `Produto`
  ADD CONSTRAINT `FK_CategoriaId` FOREIGN KEY (`cat_id`) REFERENCES `Categoria` (`cat_id`),
  ADD CONSTRAINT `FK_ProdutoId` FOREIGN KEY (`prod_id`) REFERENCES `Produto` (`prod_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
