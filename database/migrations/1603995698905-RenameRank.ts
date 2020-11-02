import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameRank1603995698905 implements MigrationInterface {
    name = 'RenameRank1603995698905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brand_score` CHANGE `rank` `allRank` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `brand_score` CHANGE `allRank` `rank` int NULL");
    }

}
