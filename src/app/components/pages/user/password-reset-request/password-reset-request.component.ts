import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {PasswordResetDto} from '../../../../dtos/ auth/PasswordResetDto';
import {ModalService} from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css'],
})
/**
 * Component for password reset requests.
 */
export class PasswordResetRequestComponent implements OnInit {
  email: string = '';

  /**
   * Standard constructor.
   * @param {HttpClient} httpClient client used to interact with API
   * @param {ModalService} modalService used to create modals
   */
  constructor(private httpClient: HttpClient,
              private modalService: ModalService) {
  }

  /**
   * Init method for password reset request components.
   */
  ngOnInit(): void {
  }

  /**
   * Action to perform password reset request called from U.I.
   */
  doPasswordReset() {
    const body = {
      email: this.email,
    };

    this.httpClient
        .post<PasswordResetDto>(
            `${environment.FRONT_END_API_URL}/users/password/reset`, body)
        .subscribe((response) => {
          if (response.status ===
          'AWAITING_EMAIL_VERIFICATION') {
            this.modalService
                .showModal('Password Reset',
                    'Awaiting e-mail verification, please check your inbox');
          }
        });
  }
}
