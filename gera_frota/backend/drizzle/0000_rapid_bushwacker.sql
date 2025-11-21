CREATE TABLE `usuarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`matricula` text NOT NULL,
	`senha` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usuarios_matricula_unique` ON `usuarios` (`matricula`);--> statement-breakpoint
CREATE TABLE `veiculos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tipo` text NOT NULL,
	`marca` text NOT NULL,
	`modelo` text NOT NULL,
	`placa` text NOT NULL,
	`ano_fabricacao` integer NOT NULL,
	`km_atual` integer NOT NULL,
	`combustivel` text NOT NULL,
	`status` text NOT NULL,
	`responsavel` text NOT NULL,
	`data_ultima_manutencao` text,
	`proxima_revisao_km` integer,
	`documentacao_validade` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `veiculos_placa_unique` ON `veiculos` (`placa`);