import {Component, OnInit} from '@angular/core';
import {NotificationDto} from '../../../dtos/notifications/NotificationDto';
import {
  NotificationService,
} from '../../../services/notifications/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
/**
 * Home component.
 */
export class HomeComponent implements OnInit {
  notifications: NotificationDto[] = [];
  /**
   * Standard constructor.
   */
  constructor(private notificationService: NotificationService) {
  }

  /**
   * Init function.
   */
  ngOnInit(): void {
    this.notificationService.getNotificationsForUser()
        .subscribe((notifications) => {
          this.notifications = HomeComponent.sortNotifications(notifications);
        });
  }

  private static sortNotifications(notifications: NotificationDto[]) {
    notifications = notifications.sort((object, otherObject) => {
      return new Date(otherObject.datetime).getTime() - new Date(object.datetime).getTime();
    });
    return notifications;
  }

  calculateTimeDifference(datetime: Date): string {
    datetime = new Date(datetime);
    let timeMessage = HomeComponent.timeSince(datetime);
    if (timeMessage === '0 seconds ago') {
      timeMessage = 'Just now';
    }
    return timeMessage;
  }

  private static timeSince(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  }
}
