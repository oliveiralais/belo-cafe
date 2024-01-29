USE belocafe;

/* USER ROLES */
INSERT INTO `role` (`name`) VALUES ('ROLE_USER');
INSERT INTO `role` (`name`) VALUES ('ROLE_ADMIN');

/* USER */
INSERT INTO `user` (`city`, `cpf_cnpj`, `email`, `name`, `password`, `property_name`, `uf`) VALUES ('São João da Boa Vista', '123.456.789-10', 'admin@belocafe.com', 'Administrador', '$2a$10$beqatY/soXzSS5AK7Q3l0.s4NHp5V4eLNcEnO9lc.2pYvcepBE5S6', 'Fazenda do Admin', 'SP');

/* TIPO_ATIVIDADE */
INSERT INTO `tipo_atividade` (`nome`) VALUES ('PLANTIO');
INSERT INTO `tipo_atividade` (`nome`) VALUES ('ADUBACAO');
INSERT INTO `tipo_atividade` (`nome`) VALUES ('PULVERIZACAO');
INSERT INTO `tipo_atividade` (`nome`) VALUES ('CALAGEM');
INSERT INTO `tipo_atividade` (`nome`) VALUES ('COLHEITA');
INSERT INTO `tipo_atividade` (`nome`) VALUES ('BENEFICIAMENTO');
INSERT INTO `tipo_atividade` (`nome`) VALUES ('IRRIGACAO');

/* STATUS_ATIVIDADE */
INSERT INTO `status_atividade`(`nome`) VALUES (`PLANEJADA`);
INSERT INTO `status_atividade`(`nome`) VALUES (`EM_ANDAMENTO`);
INSERT INTO `status_atividade`(`nome`) VALUES (`CONCLUIDA`);

/* TIPO_INSUMO */
INSERT INTO `tipo_insumo` (`nome`) VALUES (`COMBUSTIVEL`);
INSERT INTO `tipo_insumo` (`nome`) VALUES (`DEFENSIVO`);
INSERT INTO `tipo_insumo` (`nome`) VALUES (`FERTILIZANTE`);
INSERT INTO `tipo_insumo` (`nome`) VALUES (`OUTROS`);
