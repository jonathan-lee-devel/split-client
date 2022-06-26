import {Component, OnInit} from '@angular/core';
import {PropertyService} from '../../../../services/property/property.service';
import {PropertyDto} from '../../../../dtos/properties/PropertyDto';

@Component({
  selector: 'app-my-properties-view',
  templateUrl: './my-properties-view.component.html',
  styleUrls: ['./my-properties-view.component.css'],
})
export class MyPropertiesViewComponent implements OnInit {
  properties: PropertyDto[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyService.
        getPropertiesForUserAsAdmin()
        .subscribe((properties) => {
          this.properties = properties;
        });
  }

  deleteProperty(propertyId: string): void {
    this.propertyService
        .deleteProperty(propertyId)
        .subscribe((_) => {});
  }
}
