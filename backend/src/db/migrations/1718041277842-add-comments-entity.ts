import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentsEntity1718041277842 implements MigrationInterface {
  name = 'AddCommentsEntity1718041277842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "user_id" integer, "post_id" integer, "parent_comment_id" integer, CONSTRAINT "PK_5a0d63e41c3c55e11319613550c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD CONSTRAINT "FK_c650660354f70a9fdfa72f106e9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD CONSTRAINT "FK_36bc7eb15ed86f27d6898f21298" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD CONSTRAINT "FK_4baccd9a122871c162f90a6461a" FOREIGN KEY ("parent_comment_id") REFERENCES "post_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_comment" DROP CONSTRAINT "FK_4baccd9a122871c162f90a6461a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" DROP CONSTRAINT "FK_36bc7eb15ed86f27d6898f21298"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" DROP CONSTRAINT "FK_c650660354f70a9fdfa72f106e9"`,
    );
    await queryRunner.query(`DROP TABLE "post_comment"`);
  }
}
