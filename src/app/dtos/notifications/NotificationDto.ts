export interface NotificationDto {
  title: string;
  text: string;
  datetime: Date;
  routerLink: string | undefined;
  buttonText: string | undefined;
}
