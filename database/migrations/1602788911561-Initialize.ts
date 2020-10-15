import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1602788911561 implements MigrationInterface {
    name = 'Initialize1602788911561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `area` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `brewery` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `areaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `flavor_tag` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `tag` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `brand` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `breweryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `brand_score` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `yearMonth` varchar(255) NOT NULL, `score` double NOT NULL, `areaId` int NULL, `brandId` int NULL, INDEX `IDX_3d5e4d120336793fbaa8354a9e` (`score`), UNIQUE INDEX `REL_dcc1e8e6f47443fc192bd27e60` (`brandId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `flavor_chart` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `fruity` double NOT NULL, `mellow` double NOT NULL, `rich` double NOT NULL, `soft` double NOT NULL, `dry` double NOT NULL, `light` double NOT NULL, `brandId` int NULL, UNIQUE INDEX `REL_e3642fbecef2217923519ff004` (`brandId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `brand_flavor_tag` (`brandId` int NOT NULL, `flavorTagId` int NOT NULL, INDEX `IDX_59652891da555fbd572bb773da` (`brandId`), INDEX `IDX_9fd0b5618f7fe78c366fed74aa` (`flavorTagId`), PRIMARY KEY (`brandId`, `flavorTagId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `brewery` ADD CONSTRAINT `FK_d405dc3d2097dc699e922123dca` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand` ADD CONSTRAINT `FK_cc3560717d16b8579100bfaee88` FOREIGN KEY (`breweryId`) REFERENCES `brewery`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand_score` ADD CONSTRAINT `FK_b5063d0eee715d4e47bf8b280fd` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand_score` ADD CONSTRAINT `FK_dcc1e8e6f47443fc192bd27e607` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `flavor_chart` ADD CONSTRAINT `FK_e3642fbecef2217923519ff0041` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` ADD CONSTRAINT `FK_59652891da555fbd572bb773dac` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` ADD CONSTRAINT `FK_9fd0b5618f7fe78c366fed74aa9` FOREIGN KEY (`flavorTagId`) REFERENCES `flavor_tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` DROP FOREIGN KEY `FK_9fd0b5618f7fe78c366fed74aa9`");
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` DROP FOREIGN KEY `FK_59652891da555fbd572bb773dac`");
        await queryRunner.query("ALTER TABLE `flavor_chart` DROP FOREIGN KEY `FK_e3642fbecef2217923519ff0041`");
        await queryRunner.query("ALTER TABLE `brand_score` DROP FOREIGN KEY `FK_dcc1e8e6f47443fc192bd27e607`");
        await queryRunner.query("ALTER TABLE `brand_score` DROP FOREIGN KEY `FK_b5063d0eee715d4e47bf8b280fd`");
        await queryRunner.query("ALTER TABLE `brand` DROP FOREIGN KEY `FK_cc3560717d16b8579100bfaee88`");
        await queryRunner.query("ALTER TABLE `brewery` DROP FOREIGN KEY `FK_d405dc3d2097dc699e922123dca`");
        await queryRunner.query("DROP INDEX `IDX_9fd0b5618f7fe78c366fed74aa` ON `brand_flavor_tag`");
        await queryRunner.query("DROP INDEX `IDX_59652891da555fbd572bb773da` ON `brand_flavor_tag`");
        await queryRunner.query("DROP TABLE `brand_flavor_tag`");
        await queryRunner.query("DROP INDEX `REL_e3642fbecef2217923519ff004` ON `flavor_chart`");
        await queryRunner.query("DROP TABLE `flavor_chart`");
        await queryRunner.query("DROP INDEX `REL_dcc1e8e6f47443fc192bd27e60` ON `brand_score`");
        await queryRunner.query("DROP INDEX `IDX_3d5e4d120336793fbaa8354a9e` ON `brand_score`");
        await queryRunner.query("DROP TABLE `brand_score`");
        await queryRunner.query("DROP TABLE `brand`");
        await queryRunner.query("DROP TABLE `flavor_tag`");
        await queryRunner.query("DROP TABLE `brewery`");
        await queryRunner.query("DROP TABLE `area`");
    }

}
