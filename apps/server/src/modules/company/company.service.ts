import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { Tx } from '../../core/database/drizzle/drizzle.module';
import {
  EntityInsert,
  EntityUpdate,
} from '../../core/shared/model/entity.model';
import { EntityService } from '../../core/shared/service/entity.service';

import { Company, CompanyEntity } from './company.model';

@Injectable()
export class CompanyService extends EntityService<CompanyEntity> {
  protected entity = new CompanyEntity();

  async findMany() {
    return await this.db.query.companies.findMany();
  }

  async findById(id: string): Promise<Company | undefined> {
    return await this.db.query.companies.findFirst({
      where: eq(this.table.id, id),
    });
  }

  async exist(id: string): Promise<boolean> {
    const company = await this.db.query.companies.findFirst({
      columns: { id: true },
      where: eq(this.table.id, id),
    });

    return !!company;
  }

  async create(insert: EntityInsert<CompanyEntity>, tx?: Tx): Promise<Company> {
    const [company] = await (tx ?? this.db)
      .insert(this.table)
      .values(insert)
      .returning();
    if (!company) throw new Error('Company not created');
    return company;
  }

  async update(
    id: string,
    update: EntityUpdate<CompanyEntity>,
  ): Promise<Company> {
    const [company] = await this.db
      .update(this.table)
      .set(update)
      .where(eq(this.table.id, id))
      .returning();
    if (!company) throw new Error('Company not updated');
    return company;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(this.table).where(eq(this.table.id, id));
  }
}
