import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobDto } from '../../dtos/jobs/JobDto';
import { BuildWithDetailsDto } from '../../dtos/jobs/BuildWithDetailsDto';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private httpClient: HttpClient) {}

  getAllJobs(): Observable<JobDto[]> {
    return this.httpClient.get<JobDto[]>(`${environment.MAIN_API_URL}/jobs`);
  }

  getJob(jobName: string): Observable<JobDto> {
    return this.httpClient.get<JobDto>(
      `${environment.MAIN_API_URL}/jobs/${jobName}`
    );
  }

  getBuild(
    jobName: string,
    buildNumber: number
  ): Observable<BuildWithDetailsDto> {
    return this.httpClient.get<BuildWithDetailsDto>(
      `${environment.MAIN_API_URL}/jobs/${jobName}/build/${buildNumber}`
    );
  }
}
