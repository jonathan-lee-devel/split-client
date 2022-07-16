import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationDto} from '../../dtos/notifications/NotificationDto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private httpClient: HttpClient) { }

  getNotificationsForUser() {
    return this.httpClient.get<NotificationDto[]>(
        `${environment.FRONT_END_API_URL}/notifications`,
    );
  }
}
