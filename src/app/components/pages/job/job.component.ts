import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/jobs/job.service';
import { JobDto } from '../../../dtos/jobs/JobDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  job: JobDto = {
    name: '',
    builds: [],
    lastFailedBuild: {
      url: '',
      number: -1,
    },
    lastSuccessfulBuild: {
      url: '',
      number: -1,
    },
  };
  isJobLoaded: boolean = false;

  constructor(private router: Router, private jobsService: JobService) {
    let jobName = this.router.url.split('/').pop();
    if (!jobName) {
      jobName = 'undefined';
    }
    this.jobsService.getJob(jobName).subscribe((job) => {
      this.job = job;
      this.isJobLoaded = true;
    });
  }

  ngOnInit(): void {}
}
