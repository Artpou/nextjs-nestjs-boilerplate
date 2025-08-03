import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/auth.guard';

import { Company, CompanyEntity } from './company.model';
import { CompanyService } from './company.service';

const company = new CompanyEntity();

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [company.selectDto] })
  async findAll(): Promise<Company[]> {
    return await this.companyService.findMany();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
