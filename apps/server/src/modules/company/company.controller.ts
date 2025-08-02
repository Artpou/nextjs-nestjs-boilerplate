import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { CompanyEntity, Company } from './company.model';
import { CompanyService } from './company.service';

const company = new CompanyEntity();

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  @ApiOkResponse({ type: [company.selectDto] })
  async findAll(): Promise<Company[]> {
    return await this.companyService.findMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: company.selectDto })
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Company> {
    const company = await this.companyService.findById(id);
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  @Post()
  @ApiOkResponse({ type: company.selectDto })
  async create(
    @Body() createCompanyDto: typeof company.insertDto,
  ): Promise<Company> {
    return await this.companyService.create(createCompanyDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: company.selectDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: InstanceType<typeof company.updateDto>,
  ) {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.companyService.delete(id);
  }
}
