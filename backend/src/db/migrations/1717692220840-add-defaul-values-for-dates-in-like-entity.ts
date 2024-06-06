import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaulValuesForDatesInLikeEntity1717692220840
  implements MigrationInterface
{
  name = 'AddDefaulValuesForDatesInLikeEntity1717692220840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "created_at" DROP DEFAULT`,
    );
  }
}
