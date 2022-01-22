import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {UserProfileDto} from '../../../dtos/UserProfileDto';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
/**
 * Profile component.
 */
export class ProfileComponent implements OnInit {
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private profileService: ProfileService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.profileService.getProfile('jonathan.lee.devel@gmail.com')
      .subscribe((profile) => {
        this.email = profile.email;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
      });
  }

  doUpdateProfile() {
    const profile: UserProfileDto = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };

    this.profileService.updateProfile(profile).subscribe((updatedProfile) => {
      this.firstName = updatedProfile.firstName;
      this.lastName = updatedProfile.lastName;
      this.updateFields();
      this.modalService.showModal(
        'Profile Update', 'Profile updated successfully',
      );
    });
  }

  private updateFields() {
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
      emailInput.innerText = this.email;
    }
    const firstNameInput = document.getElementById('firstNameInput');
    if (firstNameInput) {
      firstNameInput.innerText = this.firstName;
    }
    const lastNameInput = document.getElementById('lastNameInput');
    if (lastNameInput) {
      lastNameInput.innerText = this.lastName;
    }
  }
}
