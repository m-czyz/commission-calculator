import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTransaction1652271632506 implements MigrationInterface {
  public name = 'createTransaction1652271632506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction_commission"
       (
           "id"                 character varying NOT NULL,
           "clientId"           integer           NOT NULL,
           "date"               date              NOT NULL,
           "amount"             numeric           NOT NULL,
           "euroAmount"         numeric           NOT NULL,
           "currency"           character varying NOT NULL,
           "commissionAmount"   numeric           NOT NULL,
           "commissionCurrency" character varying NOT NULL,
           CONSTRAINT "PK_1f921f5d48840a2baee611155a5" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8593d679d3b13db1f48113b94f" ON "transaction_commission" ("clientId", "date") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_8593d679d3b13db1f48113b94f"`);
    await queryRunner.query(`DROP TABLE "transaction_commission"`);
  }
}
