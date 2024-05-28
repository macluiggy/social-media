import { MigrationInterface, QueryRunner } from "typeorm";

export class Haa1716903926395 implements MigrationInterface {
    name = 'Haa1716903926395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "test" text`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "test"`);
    }

}
