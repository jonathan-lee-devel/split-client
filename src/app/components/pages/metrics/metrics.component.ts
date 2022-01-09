import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../../services/metrics/metrics.service';
import { Router } from '@angular/router';
import { FailureSuccessRateDto } from '../../../dtos/metrics/FailureSuccessRateDto';
import { NumberOfDeliveriesDto } from '../../../dtos/metrics/NumberOfDeliveriesDto';
import { DeliveryTimeDto } from '../../../dtos/metrics/DeliveryTimeDto';
import { RestoreTimeDto } from '../../../dtos/metrics/RestoreTimeDto';
import { BuildComponent } from '../build/build.component';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent implements OnInit {
  jobName: string | undefined = '';

  failureSuccessRate: FailureSuccessRateDto = {
    failure_rate: -1,
    success_rate: -1,
  };
  isFailureSuccessRateLoaded: boolean = false;

  numberOfDeliveries: NumberOfDeliveriesDto = {
    number_of_deliveries: -1,
  };
  isNumberOfDeliveriesLoaded: boolean = false;

  deliveryTime: DeliveryTimeDto = {
    delivery_time: -1,
  };
  formattedDeliveryTime: string | undefined = '';
  isDeliveryTimeLoaded: boolean = false;

  restoreTime: RestoreTimeDto = {
    restore_time: -1,
  };
  isRestoreTimeLoaded: boolean = false;
  formattedRestoreTime: string | undefined = '';

  constructor(private router: Router, private metricsService: MetricsService) {
    this.jobName = this.router.url.split('/')[2];
    if (!this.jobName) {
      this.jobName = 'undefined';
    }
    metricsService
      .getFailureSuccessRate(this.jobName)
      .subscribe((failureSuccessRate) => {
        this.failureSuccessRate = failureSuccessRate;
        this.failureSuccessRate.failure_rate =
          Math.round(
            (this.failureSuccessRate.failure_rate + Number.EPSILON) * 100
          ) / 100;
        this.failureSuccessRate.success_rate =
          Math.round(
            (this.failureSuccessRate.success_rate + Number.EPSILON) * 100
          ) / 100;
        this.isFailureSuccessRateLoaded = true;
      });
    metricsService
      .getNumberOfDeliveries(this.jobName)
      .subscribe((numberOfDeliveries) => {
        this.numberOfDeliveries = numberOfDeliveries;
        this.isNumberOfDeliveriesLoaded = true;
      });
    metricsService.getDeliveryTime(this.jobName).subscribe((deliveryTime) => {
      this.deliveryTime = deliveryTime;
      if (typeof deliveryTime.delivery_time === 'string') {
        this.formattedDeliveryTime = deliveryTime.delivery_time;
      } else {
        this.formattedDeliveryTime = `${BuildComponent.millisToMinutesAndSeconds(
          deliveryTime.delivery_time
        )} (MM:SS)`;
        this.isDeliveryTimeLoaded = true;
      }
    });
    metricsService.getRestoreTime(this.jobName).subscribe((restoreTime) => {
      this.restoreTime = restoreTime;
      this.formattedRestoreTime = MetricsComponent.nanosecondsToSeconds(
        restoreTime.restore_time
      );
      this.isRestoreTimeLoaded = true;
    });
  }

  private static nanosecondsToSeconds(nanoseconds: number): string {
    const seconds = nanoseconds / 1000000000.0;
    return String((Math.round(seconds * 100) / 100).toFixed(2));
  }

  ngOnInit(): void {}
}
