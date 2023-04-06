import {Component, OnInit} from '@angular/core';
import {
  DEFAULT_PROPERTY_DTO,
  PropertyDto,
} from '../../../../../dtos/properties/PropertyDto';
import {ActivatedRoute} from '@angular/router';
import {
  PropertyService,
} from '../../../../../services/property/property.service';
import {ModalService} from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-property-manage-tenants',
  templateUrl: './property-manage-tenants.component.html',
  styleUrls: ['./property-manage-tenants.component.css'],
})
export class PropertyManageTenantsComponent implements OnInit {
  property: PropertyDto = DEFAULT_PROPERTY_DTO;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyService.getPropertyById(params['id'])
          .subscribe((property) => {
            this.property = property;
          });
    });
  }

  removeTenantFromProperty(tenantEmailToRemove: string) {
    this
        .propertyService
        .removeTenantFromProperty(this.property.id, tenantEmailToRemove)
        .subscribe((_) => {
          this.ngOnInit();
        });
  }

  escalateTenantInProperty(tenantEmailToEscalate: string) {
    this
        .propertyService
        .escalateTenantInProperty(this.property.id, tenantEmailToEscalate)
        .subscribe((status) => {
          let statusMessage = 'Failed to escalate tenants privileges';
          if (status.status === 'SUCCESS') {
            statusMessage = 'Successfully escalated tenants privileges';
            this.ngOnInit();
          }
          this.modalService.showModal('Request Status', statusMessage);
        });
  }

  isTenantAdmin(tenantEmailToCheck: string) {
    return this.property.administratorEmails.includes(tenantEmailToCheck);
  }

  deescalateTenantInProperty(tenantEmailToDeescalate: string) {
    this
        .propertyService
        .deescalateTenantInProperty(this.property.id, tenantEmailToDeescalate)
        .subscribe((status) => {
          let statusMessage = 'Failed to deescalate tenants privileges';
          if (status.status === 'SUCCESS') {
            statusMessage = 'Successfully deescalated tenants privileges';
            this.ngOnInit();
          }
          this.modalService.showModal('Request Status', statusMessage);
        });
  }
}
