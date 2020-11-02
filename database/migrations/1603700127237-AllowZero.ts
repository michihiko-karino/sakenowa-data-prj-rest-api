import {MigrationInterface, QueryRunner} from "typeorm";

export class AllowZero1603700127237 implements MigrationInterface {
    name = 'AllowZero1603700127237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brand_score` DROP FOREIGN KEY `FK_b5063d0eee715d4e47bf8b280fd`");
        await queryRunner.query("ALTER TABLE `brewery` DROP FOREIGN KEY `FK_d405dc3d2097dc699e922123dca`");
        await queryRunner.query("ALTER TABLE `area` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `area` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `area` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `area` ADD `id` int NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `brand` DROP FOREIGN KEY `FK_cc3560717d16b8579100bfaee88`");
        await queryRunner.query("ALTER TABLE `brewery` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `brewery` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `brewery` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `brewery` ADD `id` int NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` DROP FOREIGN KEY `FK_9fd0b5618f7fe78c366fed74aa9`");
        await queryRunner.query("ALTER TABLE `flavor_tag` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `flavor_tag` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `flavor_tag` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `flavor_tag` ADD `id` int NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` DROP FOREIGN KEY `FK_59652891da555fbd572bb773dac`");
        await queryRunner.query("ALTER TABLE `brand_score` DROP FOREIGN KEY `FK_dcc1e8e6f47443fc192bd27e607`");
        await queryRunner.query("ALTER TABLE `flavor_chart` DROP FOREIGN KEY `FK_e3642fbecef2217923519ff0041`");
        await queryRunner.query("ALTER TABLE `brand` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `brand` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `brand` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `brand` ADD `id` int NOT NULL PRIMARY KEY");
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
        await queryRunner.query("ALTER TABLE `brand` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `brand` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `brand` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `brand` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `flavor_chart` ADD CONSTRAINT `FK_e3642fbecef2217923519ff0041` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand_score` ADD CONSTRAINT `FK_dcc1e8e6f47443fc192bd27e607` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` ADD CONSTRAINT `FK_59652891da555fbd572bb773dac` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `flavor_tag` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `flavor_tag` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `flavor_tag` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `flavor_tag` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `brand_flavor_tag` ADD CONSTRAINT `FK_9fd0b5618f7fe78c366fed74aa9` FOREIGN KEY (`flavorTagId`) REFERENCES `flavor_tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brewery` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `brewery` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `brewery` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `brewery` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `brand` ADD CONSTRAINT `FK_cc3560717d16b8579100bfaee88` FOREIGN KEY (`breweryId`) REFERENCES `brewery`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `area` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `area` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `area` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `area` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `brewery` ADD CONSTRAINT `FK_d405dc3d2097dc699e922123dca` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `brand_score` ADD CONSTRAINT `FK_b5063d0eee715d4e47bf8b280fd` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
