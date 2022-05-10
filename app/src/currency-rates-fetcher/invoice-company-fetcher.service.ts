import { CACHE_MANAGER, HttpService, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';

const API_URL = process.env.COMPANIES_API_DOMAIN;

export interface CompanyFetcherCompanyDto {
  name: string;
  id: string;
}

export interface CompanyFetcherCompanyWithDocumentsDto {
  siren: string;
  vat_number: string;
  id: string;
}

@Injectable()
export class InvoiceCompanyFetcherService {
  public constructor(private httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async findCompanyByName(name: string): Promise<CompanyFetcherCompanyWithDocumentsDto> {
    let company: CompanyFetcherCompanyWithDocumentsDto;

    try {
      const companyFromList = await this.queryByName(name);

      company = await this.queryDocumentsByCompanyId(companyFromList.id);
    } catch (e) {
      return this.tryToRecoverAfterExternalAPIDowntime(e, name);
    }

    if (!company) {
      throw new NotFoundException(`Company with id ${name} not found`);
    }

    await this.cacheManager.set(name, company, {
      ttl: 500000,
    });

    return company;
  }

  private async queryByName(name: string): Promise<CompanyFetcherCompanyDto> {
    const { data } = await this.httpService
      .get<CompanyFetcherCompanyDto[]>(`${API_URL}/companies`, { params: { search: name } })
      .toPromise();

    return data.find(company => company.name === name);
  }

  private async queryDocumentsByCompanyId(id: string): Promise<CompanyFetcherCompanyWithDocumentsDto> {
    const { data } = await this.httpService
      .get<CompanyFetcherCompanyWithDocumentsDto>(`${API_URL}/documents/${id}`)
      .toPromise();

    return data;
  }

  private async tryToRecoverAfterExternalAPIDowntime<T>(error: AxiosError, key: string): Promise<T> {
    if (error.response.status === 404) {
      throw error;
    }

    const entryInLocalStorage = await this.cacheManager.get<T>(key);

    if (!entryInLocalStorage) {
      throw new NotFoundException(`Failed to load companies data`);
    }

    return entryInLocalStorage;
  }
}
