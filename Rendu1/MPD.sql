-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 22 mars 2025 à 16:22
-- Version du serveur : 10.11.6-MariaDB-0+deb12u1
-- Version de PHP : 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sr10p068`
--

-- --------------------------------------------------------

--
-- Structure de la table `Administrateur`
--

CREATE TABLE `Administrateur` (
  `id_admin` int(255) NOT NULL,
  `utilisateur` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Candidat`
--

CREATE TABLE `Candidat` (
  `id_candidat` int(255) NOT NULL,
  `utilisateur` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Candidature`
--

CREATE TABLE `Candidature` (
  `id_candidat` int(255) NOT NULL,
  `num_offre` int(255) NOT NULL,
  `date_de_candidature` date NOT NULL,
  `piece_jointe` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`piece_jointe`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Entreprise`
--

CREATE TABLE `Entreprise` (
  `siren` int(255) NOT NULL,
  `nom` varchar(64) NOT NULL,
  `type` varchar(64) NOT NULL,
  `siege_social` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Fiche_de_poste`
--

CREATE TABLE `Fiche_de_poste` (
  `numero` int(255) NOT NULL,
  `intitule` varchar(64) NOT NULL,
  `statut_poste` varchar(64) NOT NULL,
  `responsable` varchar(64) NOT NULL,
  `type_metier` varchar(64) NOT NULL,
  `lieux` varchar(64) NOT NULL,
  `rythme` varchar(64) NOT NULL,
  `description` varchar(64) NOT NULL,
  `salaire` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Formulaire`
--

CREATE TABLE `Formulaire` (
  `matricule` int(255) NOT NULL,
  `administrateur` int(255) NOT NULL,
  `entreprise` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Offre`
--

CREATE TABLE `Offre` (
  `numero` int(255) NOT NULL,
  `etat` enum('non_publiée','publiée','expirée') NOT NULL,
  `date_validite` date NOT NULL,
  `indication` varchar(64) NOT NULL,
  `nbr_piece` int(255) NOT NULL,
  `fiche_de_poste` int(255) NOT NULL,
  `recruteur` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Recruteur`
--

CREATE TABLE `Recruteur` (
  `id_recruteur` int(255) NOT NULL,
  `utilisateur` int(255) NOT NULL,
  `administrateur` int(255) NOT NULL,
  `entreprise` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `id_utilisateur` int(255) NOT NULL,
  `nom` varchar(64) NOT NULL,
  `prenom` varchar(64) NOT NULL,
  `mdp` varchar(64) NOT NULL,
  `tel` varchar(64) NOT NULL,
  `ddc` date NOT NULL,
  `statut` enum('actif','non_actif') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Administrateur`
--
ALTER TABLE `Administrateur`
  ADD PRIMARY KEY (`id_admin`),
  ADD KEY `fk_utilisateur` (`utilisateur`);

--
-- Index pour la table `Candidat`
--
ALTER TABLE `Candidat`
  ADD PRIMARY KEY (`id_candidat`),
  ADD KEY `candidat_fk_utilisateur` (`utilisateur`);

--
-- Index pour la table `Candidature`
--
ALTER TABLE `Candidature`
  ADD PRIMARY KEY (`id_candidat`,`num_offre`),
  ADD KEY `candidature_fk_num_offre` (`num_offre`);

--
-- Index pour la table `Entreprise`
--
ALTER TABLE `Entreprise`
  ADD PRIMARY KEY (`siren`);

--
-- Index pour la table `Fiche_de_poste`
--
ALTER TABLE `Fiche_de_poste`
  ADD PRIMARY KEY (`numero`);

--
-- Index pour la table `Formulaire`
--
ALTER TABLE `Formulaire`
  ADD PRIMARY KEY (`matricule`),
  ADD KEY `formulaire_fk_administrateur` (`administrateur`),
  ADD KEY `formulaire_fk_entreprise` (`entreprise`);

--
-- Index pour la table `Offre`
--
ALTER TABLE `Offre`
  ADD PRIMARY KEY (`numero`),
  ADD KEY `offre_fk_fiche_de_poste` (`fiche_de_poste`),
  ADD KEY `offre_fk_recruteur` (`recruteur`);

--
-- Index pour la table `Recruteur`
--
ALTER TABLE `Recruteur`
  ADD PRIMARY KEY (`id_recruteur`),
  ADD KEY `recruteur_fk_administrateur` (`administrateur`),
  ADD KEY `recruteur_fk_entreprise` (`entreprise`),
  ADD KEY `recruteur_fk_utilisateur` (`utilisateur`);

--
-- Index pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Administrateur`
--
ALTER TABLE `Administrateur`
  ADD CONSTRAINT `administrateur_fk_utilisateur` FOREIGN KEY (`utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `Candidat`
--
ALTER TABLE `Candidat`
  ADD CONSTRAINT `candidat_fk_utilisateur` FOREIGN KEY (`utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `Candidature`
--
ALTER TABLE `Candidature`
  ADD CONSTRAINT `candidature_fk_id_candidat` FOREIGN KEY (`id_candidat`) REFERENCES `Candidat` (`id_candidat`),
  ADD CONSTRAINT `candidature_fk_num_offre` FOREIGN KEY (`num_offre`) REFERENCES `Offre` (`numero`);

--
-- Contraintes pour la table `Formulaire`
--
ALTER TABLE `Formulaire`
  ADD CONSTRAINT `formulaire_fk_administrateur` FOREIGN KEY (`administrateur`) REFERENCES `Administrateur` (`id_admin`),
  ADD CONSTRAINT `formulaire_fk_entreprise` FOREIGN KEY (`entreprise`) REFERENCES `Entreprise` (`siren`);

--
-- Contraintes pour la table `Offre`
--
ALTER TABLE `Offre`
  ADD CONSTRAINT `offre_fk_fiche_de_poste` FOREIGN KEY (`fiche_de_poste`) REFERENCES `Fiche_de_poste` (`numero`),
  ADD CONSTRAINT `offre_fk_recruteur` FOREIGN KEY (`recruteur`) REFERENCES `Recruteur` (`id_recruteur`);

--
-- Contraintes pour la table `Recruteur`
--
ALTER TABLE `Recruteur`
  ADD CONSTRAINT `recruteur_fk_administrateur` FOREIGN KEY (`administrateur`) REFERENCES `Administrateur` (`id_admin`),
  ADD CONSTRAINT `recruteur_fk_entreprise` FOREIGN KEY (`entreprise`) REFERENCES `Entreprise` (`siren`),
  ADD CONSTRAINT `recruteur_fk_utilisateur` FOREIGN KEY (`utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
