import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../../../services/modal/modal.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-auth-google',
  templateUrl: './login-auth-google.component.html',
  styleUrls: ['./login-auth-google.component.css']
})
export class LoginAuthGoogleComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.setUserInfo({login_status: 'SUCCESS'});
    this.modalService.showModal('Sign in with Google',
      'You have successfully signed in with Google!');
    this.router.navigate(['/home']);
  }

}
