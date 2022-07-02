import {Component, OnInit} from '@angular/core';
import {
  PropertyService,
} from '../../../../../../../services/property/property.service';
import {ModalService} from '../../../../../../../services/modal/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-property-manage-tenants-invite',
  templateUrl: './property-manage-tenants-invite.component.html',
  styleUrls: ['./property-manage-tenants-invite.component.css'],
})
export class PropertyManageTenantsInviteComponent implements OnInit {
  propertyId: string = '';
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  visible: boolean = true;
  tenants: string[] = [];

  constructor(private propertyService: PropertyService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  doInviteToProperty() {
    this.propertyService.inviteToProperty(this.propertyId, this.tenants)
        .subscribe((_) => {
          this.modalService.showModal(
              'Property Invitation',
              'Tenants invited to property',
          );
          this.router.navigate([`/property/view/${this.propertyId}`]);
        });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = params['id'];
    });
  }

  remove(tenant: string): void {
    const index = this.tenants.indexOf(tenant);

    if (index >= 0) {
      this.tenants.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent) {
    if (!event) {
      return;
    }
    const input = event.chipInput?.inputElement;
    const value = event.value;

    if ((value || '').trim()) {
      this.tenants.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
}
