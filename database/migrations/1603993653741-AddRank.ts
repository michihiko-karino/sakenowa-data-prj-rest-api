import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRank1603993653741 implements MigrationInterface {
    name = 'AddRank1603993653741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brand_score` ADD `rank` int NULL");
        await queryRunner.query("ALTER TABLE `brand_score` ADD `areaRank` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brand_score` DROP COLUMN `areaRank`");
        await queryRunner.query("ALTER TABLE `brand_score` DROP COLUMN `rank`");
    }

}
