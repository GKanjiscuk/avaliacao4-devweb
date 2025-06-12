-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: devweb
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `certificacao`
--

DROP TABLE IF EXISTS `certificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` text NOT NULL,
  `perfil_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_certificacao_perfil` (`perfil_id`),
  CONSTRAINT `fk_certificacao_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificacao`
--

LOCK TABLES `certificacao` WRITE;
/*!40000 ALTER TABLE `certificacao` DISABLE KEYS */;
INSERT INTO `certificacao` VALUES (1,'Desenvolvimento de Software Multiplataforma - Cursando - Fatec SJC Prof. Jessen Vidal (Presencial)',1),(2,'Curso Dev Full Stack - Cursando - DevEmDobro',1),(3,'AWS Academy Graduate - AWS Academy Cloud Foundations - SENAI',1),(4,'Implantação de Serviços de Inteligência Artificial em Nuvem - Microsoft AI-900 - SENAI \'Felix Guisard\' (Presencial)',1);
/*!40000 ALTER TABLE `certificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hardskill`
--

DROP TABLE IF EXISTS `hardskill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hardskill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `perfil_id` int DEFAULT NULL,
  `icone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hardskill_perfil` (`perfil_id`),
  CONSTRAINT `fk_hardskill_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hardskill`
--

LOCK TABLES `hardskill` WRITE;
/*!40000 ALTER TABLE `hardskill` DISABLE KEYS */;
INSERT INTO `hardskill` VALUES (1,'HTML','É uma linguagem de marcação utilizada na construção de páginas na Web.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'),(2,'CSS','É um mecanismo para adicionar estilo a um documento web.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'),(3,'JavaScript','É uma linguagem de programação. Juntamente com HTML e CSS, é uma das três principais tecnologias da web.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'),(4,'Python','É uma linguagem de programação de alto nível, interpretada de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'),(5,'Git','É um sistema de controle de versões distribuído, usado principalmente no desenvolvimento de software.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'),(7,'Bootstrap','É um framework front-end que fornece estruturas de CSS para a criação de sites e aplicações responsivas de forma rápida e simples.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg'),(8,'TypeScript','Uma linguagem de programação, superset do JavaScript, que adiciona tipagem estática opcional à linguagem, permitindo um desenvolvimento mais seguro, compreensível e com melhores ferramentas de auxílio em projetos web e Node.js.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'),(9,'React','Uma biblioteca JavaScript para a construção de interfaces de usuário (UIs) interativas e dinâmicas, focada em componentes reutilizáveis para simplificar o desenvolvimento de aplicações web e interfaces complexas.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'),(10,'Tailwind','Um framework CSS utilitário de baixo nível que permite estilizar elementos HTML diretamente no seu markup através de classes predefinidas, oferecendo flexibilidade e rapidez no desenvolvimento de interfaces personalizadas.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'),(11,'Node.js','Um ambiente de tempo de execução JavaScript construído sobre o motor V8 do Chrome, que permite executar código JavaScript fora do navegador, sendo amplamente utilizado para construir aplicações de servidor escaláveis, APIs e ferramentas de linha de comando.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'),(12,'GitHub','É uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git. Facilita a colaboração e o versionamento de projetos de software.',1,'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg');
/*!40000 ALTER TABLE `hardskill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'Meu Portfólio');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` text NOT NULL,
  `perfil_id` int DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projeto_perfil` (`perfil_id`),
  CONSTRAINT `fk_projeto_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES (1,'https://github.com/AgileKrakens/DemoQuerycy',1,'assets/img/demoquerycy.jpg'),(2,'https://github.com/ORBIS-2DSM-API/frontend',1,'assets/img/helpnei3.webp');
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sobre_mim`
--

DROP TABLE IF EXISTS `sobre_mim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sobre_mim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` text NOT NULL,
  `perfil_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sobre_mim_perfil` (`perfil_id`),
  CONSTRAINT `fk_sobre_mim_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sobre_mim`
--

LOCK TABLES `sobre_mim` WRITE;
/*!40000 ALTER TABLE `sobre_mim` DISABLE KEYS */;
INSERT INTO `sobre_mim` VALUES (1,'<p>Meu nome é Giovanni Kanjiscuk, eu sou um entusiasta da tecnologia que decidiu seguir o caminho da programação. Possuo experiência em Desenvolvimento Web. Atualmente estou cursando Desenvolvimento de Software Multiplataforma. na instituição Fatec São José dos Campos Prof. Jessen Vidal, trabalhando com a Aprendizagem com Projeto Integrador.</p><br /><p>Já tive contato com tecnologias como Python, Flask, Bootstrap, Tailwind, Mysql, NodeJS, etc.</p>',1);
/*!40000 ALTER TABLE `sobre_mim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `softskill`
--

DROP TABLE IF EXISTS `softskill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `softskill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `perfil_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_softskill_perfil` (`perfil_id`),
  CONSTRAINT `fk_softskill_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `softskill`
--

LOCK TABLES `softskill` WRITE;
/*!40000 ALTER TABLE `softskill` DISABLE KEYS */;
INSERT INTO `softskill` VALUES (1,'Proativo',1),(2,'Alta Adaptabilidade',1),(3,'Flexível',1),(4,'Dinâmico',1),(5,'Resolução de problemas',1);
/*!40000 ALTER TABLE `softskill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-12 10:50:19
