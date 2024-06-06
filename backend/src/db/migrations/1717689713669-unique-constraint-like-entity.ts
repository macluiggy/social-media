import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueConstraintLikeEntity1717689713669
  implements MigrationInterface
{
  name = 'UniqueConstraintLikeEntity1717689713669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "UQ_USER_POST" UNIQUE ("user_id", "post_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "UQ_USER_POST"`,
    );
  }
}
