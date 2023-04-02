export interface PropertyDto {
  id: string;
  title: string;
  tenantEmails: string[];
  administratorEmails: string[];
  acceptedTenantEmails: string[];
}

export const DEFAULT_PROPERTY_DTO: PropertyDto = {
  id: 'Loading...',
  title: 'Loading...',
  tenantEmails: [],
  administratorEmails: [],
  acceptedTenantEmails: [],
};
