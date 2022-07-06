import {Component, OnInit} from '@angular/core';
import {NotificationDto} from '../../../dtos/notifications/NotificationDto';

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
  constructor() {
  }

  /**
   * Init function.
   */
  ngOnInit(): void {
  }

  calculateTimeDifference(datetime: Date): string {
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
