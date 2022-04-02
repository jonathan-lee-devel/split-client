import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  RegistrationService,
} from '../../../../../services/auth/registration.service';
import {ModalService} from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-email-registration-verification',
  templateUrl: './email-registration-verification.component.html',
  styleUrls: ['./email-registration-verification.component.css'],
})
/**
 * View component for email verification tokens.
 */
export class EmailRegistrationVerificationComponent implements OnInit {
  /**
   * Basic constructor
   * @param {ActivatedRoute} route used to obtain route parameters
   * @param {RegistrationService} registrationService to handle registration
   * @param {ModalService} modalService used to display status
   */
  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private modalService: ModalService,
  ) { }

  /**
   * Basic init method.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.registrationService.confirmRegistration(params['token'])
          .subscribe((registrationStatus) => {
            let message;
            switch (registrationStatus.registration_status) {
              case 'INVALID_TOKEN':
                message = 'An invalid token has been provided';
                break;
              case 'EMAIL_VERIFICATION_EXPIRED':
                // eslint-disable-next-line max-len
                message = 'E-mail verification has expired, you will need to re-register';
                break;
              case 'SUCCESS':
                // eslint-disable-next-line max-len
                message = 'Your e-mail has been verified successfully, you may now login';
                break;
              default:
                message = 'An unknown error has occurred';
            }
            this.modalService.showModal('Registration Status', message);
          });
    });
  }
}
