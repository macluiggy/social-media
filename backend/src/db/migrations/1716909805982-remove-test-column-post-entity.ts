import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestColumnPostEntity1716909805982 implements MigrationInterface {
    name = 'RemoveTestColumnPostEntity1716909805982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "test" text`);
    }

}
