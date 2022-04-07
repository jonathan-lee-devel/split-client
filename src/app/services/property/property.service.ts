import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PropertyDto} from '../../dtos/properties/PropertyDto';

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

  createProperty(title: string, tenants: string[]) {
    const property = {
      title,
      tenants,
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
}
