import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../../services/jobs/job.service';
import { BuildWithDetailsDto } from '../../../dtos/jobs/BuildWithDetailsDto';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent implements OnInit {
  jobName: string | undefined = '';
  buildNumber: number | undefined = -1;
  build: BuildWithDetailsDto = {
    duration: 0,
    timestamp: 0,
    result: '',
  };
  isBuildLoaded: boolean = false;
  formattedBuildTimestamp: string | undefined = '';
  formattedBuildDuration: string | undefined = '';

  constructor(private router: Router, private jobService: JobService) {
    this.jobName = this.router.url.split('/')[2];
    if (!this.jobName) {
      this.jobName = 'undefined';
    }
    this.buildNumber = parseInt(this.router.url.split('/')[4]);
    if (!this.buildNumber) {
      this.buildNumber = -1;
    }
    this.jobService
      .getBuild(this.jobName, this.buildNumber)
      .subscribe((buildWithDetails) => {
        this.build = buildWithDetails;
        this.formattedBuildDuration = BuildComponent.millisToMinutesAndSeconds(
          this.build.duration
        );
        this.formattedBuildTimestamp = new Date(
          this.build.timestamp * 1000
        ).toString();
        this.isBuildLoaded = true;
      });
  }

  public static millisToMinutesAndSeconds(millis: number): string {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return parseInt(seconds) == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  ngOnInit(): void {}
}
