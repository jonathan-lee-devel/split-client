import {Component, OnInit} from '@angular/core';
import {PropertyDto} from '../../../../../dtos/properties/PropertyDto';
import {ActivatedRoute} from '@angular/router';
import {
  PropertyService,
} from '../../../../../services/property/property.service';

@Component({
  selector: 'app-property-manage-tenants',
  templateUrl: './property-manage-tenants.component.html',
  styleUrls: ['./property-manage-tenants.component.css'],
})
export class PropertyManageTenantsComponent implements OnInit {
  property: PropertyDto = {
    id: '',
    title: '',
    tenantEmails: [],
    acceptedTenantEmails: [],
  };

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
  ) { }

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
}
