import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {ModalService} from '../../../../services/modal/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-auth-google-failure',
  templateUrl: './login-auth-google-failure.component.html',
  styleUrls: ['./login-auth-google-failure.component.css']
})
export class LoginAuthGoogleFailureComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.setUserInfo({login_status: 'FAILURE'});
    this.modalService.showModal('Sign in with Google',
      'Our sign in attempt to Google was unsuccessful.');
    this.router.navigate(['/login']);
  }

}
