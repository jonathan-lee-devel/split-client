import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FailureSuccessRateDto } from '../../dtos/metrics/FailureSuccessRateDto';
import { NumberOfDeliveriesDto } from '../../dtos/metrics/NumberOfDeliveriesDto';
import { RestoreTimeDto } from '../../dtos/metrics/RestoreTimeDto';
import { DeliveryTimeDto } from '../../dtos/metrics/DeliveryTimeDto';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private httpClient: HttpClient) {}

  getNumberOfDeliveries(jobName: string): Observable<NumberOfDeliveriesDto> {
    return this.httpClient.get<NumberOfDeliveriesDto>(
      `${environment.MAIN_API_URL}/metrics/job/${jobName}/numberOfDeliveries`
    );
  }

  getRestoreTime(jobName: string): Observable<RestoreTimeDto> {
    return this.httpClient.get<RestoreTimeDto>(
      `${environment.MAIN_API_URL}/metrics/job/${jobName}/restoreTime`
    );
  }

  getDeliveryTime(jobName: string): Observable<DeliveryTimeDto> {
    return this.httpClient.get<DeliveryTimeDto>(
      `${environment.MAIN_API_URL}/metrics/job/${jobName}/deliveryTime`
    );
  }

  getFailureSuccessRate(jobName: string): Observable<FailureSuccessRateDto> {
    return this.httpClient.get<FailureSuccessRateDto>(
      `${environment.MAIN_API_URL}/metrics/job/${jobName}/failureSuccessRate`
    );
  }
}
