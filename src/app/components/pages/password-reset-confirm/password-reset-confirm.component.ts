import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PasswordResetDto} from '../../../dtos/ auth/PasswordResetDto';
import {environment} from '../../../../environments/environment';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css'],
})
export class PasswordResetConfirmComponent implements OnInit {
  token: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient,
              private modalService: ModalService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams
        .subscribe((params) => {
          this.token = params['token'];
        });
  }

  doConfirmPasswordReset() {
    const body = {
      token: this.token,
      password: this.password,
      confirm_password: this.confirmPassword,
    };

    this.httpClient
        .post<PasswordResetDto>(
            `${environment.FRONT_END_API_URL}/users/password/reset/confirm`,
            body).subscribe((response) => {
          if (response.password_reset_status === 'SUCCESS') {
            this.modalService.showModal('Password Reset',
                'Password reset successfuly, you can now login');
            this.router.navigate(['/login']);
          }
        });
  }
}
