import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  PropertyService,
} from '../../../../../services/property/property.service';
import {ModalService} from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-property-invitation-verification',
  templateUrl: './property-invitation-verification.component.html',
  styleUrls: ['./property-invitation-verification.component.css'],
})
/**
 * View component for property invitation verification tokens.
 */
export class PropertyInvitationVerificationComponent implements OnInit {
  propertyId: string = '';

  /**
   * Basic constructor
   * @param {ActivatedRoute} route used to obtain route parameters
   * @param {PropertyService} propertyService to handle invitation
   * @param {ModalService} modalService used to display status
   */
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private modalService: ModalService,
  ) { }

  /**
   * Basic init method.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyService.confirmPropertyInvitation(params['token'])
          .subscribe((propertyInvitationStatus) => {
            let message;
            switch (propertyInvitationStatus.property_invitation_status) {
              case 'INVALID_TOKEN':
                message = 'An invalid token has been provided';
                break;
              case 'EMAIL_VERIFICATION_EXPIRED':
                // eslint-disable-next-line max-len
                message = 'E-mail verification has expired, you will need to be re-invited';
                break;
              case 'SUCCESS':
                // eslint-disable-next-line max-len
                message = 'Your e-mail has been verified successfully, you may now view the property';
                this.propertyId = propertyInvitationStatus.property_id;
                break;
              default:
                message = 'An unknown error has occurred';
            }
            this.modalService.showModal('Property Invitation Status', message);
          });
    });
  }
}
