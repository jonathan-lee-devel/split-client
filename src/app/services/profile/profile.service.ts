import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserProfileDto} from '../../dtos/UserProfileDto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {
  }

  getProfile() {
    return this.httpClient
        .get<UserProfileDto>(
            `${environment.FRONT_END_API_URL}/users/profile`,
        );
  }

  updateProfile(firstname: string, lastname: string) {
    const body = {
      firstname, lastname,
    };
    return this.httpClient
        .patch<UserProfileDto>(
            `${environment.FRONT_END_API_URL}/users/profile/update`, body,
        );
  }
}
