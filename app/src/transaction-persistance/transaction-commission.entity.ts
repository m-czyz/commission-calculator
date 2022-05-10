import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CurrencyEnum } from '../commission-calculator/enum/currency.enum';

@Entity()
export class TransactionCommissionEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public clientId: number;

  @Column('date')
  public date: Date;

  @Column({ type: 'numeric' })
  public amount: string;

  @Column({ type: 'numeric' })
  public euroAmount: string;

  @Column({ type: 'varchar' })
  public currency: CurrencyEnum;

  @Column({ type: 'numeric' })
  public commissionAmount: string;

  @Column({ type: 'varchar' })
  public commissionCurrency: CurrencyEnum;
}
