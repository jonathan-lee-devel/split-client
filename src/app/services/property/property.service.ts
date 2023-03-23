import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PropertyDto} from '../../dtos/properties/PropertyDto';
import {
  PropertyInvitationStatusDto,
} from '../../dtos/properties/PropertyInvitationStatusDto';
import {ExpenseBreakdownDto} from '../../dtos/expenses/ExpenseBreakdownDto';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private httpClient: HttpClient) {
  }

  getPropertyById(propertyId: string) {
    return this.httpClient.get<PropertyDto>(
        `${environment.FRONT_END_API_URL}/properties/${propertyId}`,
    );
  }

  createProperty(title: string, tenantEmails: string[]) {
    const property = {
      title,
      tenantEmails,
    };
    return this.httpClient.post<PropertyDto>(
        `${environment.FRONT_END_API_URL}/properties/create`, property,
    );
  }

  getPropertiesForUserAsAdmin() {
    return this.httpClient.get<PropertyDto[]>(
        `${environment.FRONT_END_API_URL}/properties/my/admin`,
    );
  }

  getPropertiesForUserAsTenant() {
    return this.httpClient.get<PropertyDto[]>(
        `${environment.FRONT_END_API_URL}/properties/my/tenant`,
    );
  }

  confirmPropertyInvitation(token: string) {
    return this.httpClient.post<PropertyInvitationStatusDto>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/invitations/confirm`, {
          tokenValue: token,
        },
    );
  }

  getIsPropertyAdmin(propertyId: string) {
    return this.httpClient.get<boolean>(
        `${environment.FRONT_END_API_URL}/properties/${propertyId}/isAdmin`,
    );
  }

  deleteProperty(propertyId: string) {
    return this.httpClient.delete<void>(
        `${environment.FRONT_END_API_URL}/properties/delete/${propertyId}`,
    );
  }

  removeTenantFromProperty(propertyId: string, tenantEmailToRemove: string) {
    const body = {
      propertyId,
      tenantEmailToRemove,
    };
    return this.httpClient.patch<void>(
        `${environment.FRONT_END_API_URL}/properties/remove-tenant`, body,
    );
  }

  removeCurrentUserAsTenantFromProperty(propertyId: string) {
    const body = {
      propertyId,
    };
    return this.httpClient.patch<void>(
        `${environment.FRONT_END_API_URL}/properties/tenant-leave`, body,
    );
  }

  inviteToProperty(propertyId: string, tenantEmails: string[]) {
    const body = {
      propertyId,
      tenantEmails,
    };
    return this.httpClient.patch<void>(
        `${environment.FRONT_END_API_URL}/properties/tenant-invite`, body,
    );
  }

  getTotalExpensesPerMonthForProperty(
      propertyId: string,
      month: number,
      year: number,
  ) {
    return this.httpClient.get<string>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/properties/${propertyId}/expenses-total/${month}/${year}`,
    );
  }

  getTotalExpensesPerTenantPerMonthForProperty(
      propertyId: string,
      month: number,
      year: number,
  ) {
    return this.httpClient.get<ExpenseBreakdownDto>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/properties/${propertyId}/expenses-per-tenant/${month}/${year}`,
    );
  }
}
