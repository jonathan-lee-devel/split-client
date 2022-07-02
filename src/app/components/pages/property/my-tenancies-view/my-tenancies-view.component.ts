import {Component, OnInit} from '@angular/core';
import {PropertyDto} from '../../../../dtos/properties/PropertyDto';
import {PropertyService} from '../../../../services/property/property.service';

@Component({
  selector: 'app-my-tenancies-view',
  templateUrl: './my-tenancies-view.component.html',
  styleUrls: ['./my-tenancies-view.component.css'],
})
export class MyTenanciesViewComponent implements OnInit {
  properties: PropertyDto[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyService.
        getPropertiesForUserAsTenant()
        .subscribe((properties) => {
          this.properties = properties;
        });
  }

  leaveProperty(propertyId: string) {
    this.propertyService.removeCurrentUserAsTenantFromProperty(propertyId)
        .subscribe((_) => {
          this.ngOnInit();
        });
  }
}
