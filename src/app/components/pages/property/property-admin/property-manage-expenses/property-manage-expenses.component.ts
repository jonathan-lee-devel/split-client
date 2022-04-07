import {Component, OnInit} from '@angular/core';
import {PropertyDto} from '../../../../../dtos/properties/PropertyDto';
import {
  PropertyService,
} from '../../../../../services/property/property.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-property-manage-expenses',
  templateUrl: './property-manage-expenses.component.html',
  styleUrls: ['./property-manage-expenses.component.css'],
})
export class PropertyManageExpensesComponent implements OnInit {
  property: PropertyDto = {
    id: '',
    title: '',
    tenantEmails: [],
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
}
