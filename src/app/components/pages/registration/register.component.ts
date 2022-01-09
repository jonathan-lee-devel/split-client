import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../../services/auth/registration.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  doRegister() {
    this.registrationService
      .register(this.email, this.password, this.confirmPassword)
      .subscribe((response) => {
        if (response.registration_status === 'AWAITING_EMAIL_VERIFICATION') {
          this.modalService.showModal(
            'Registration Status',
            'Awaiting e-mail verification, please check your inbox'
          );
          this.router.navigate(['/login']);
        } else {
          window.alert(response.registration_status);
        }
      });
  }
}
