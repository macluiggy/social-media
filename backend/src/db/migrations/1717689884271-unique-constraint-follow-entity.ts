import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueConstraintFollowEntity1717689884271
  implements MigrationInterface
{
  name = 'UniqueConstraintFollowEntity1717689884271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "follows" ADD CONSTRAINT "UQ_FOLLOWER_FOLLOWING" UNIQUE ("follower_id", "following_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "follows" DROP CONSTRAINT "UQ_FOLLOWER_FOLLOWING"`,
    );
  }
}
