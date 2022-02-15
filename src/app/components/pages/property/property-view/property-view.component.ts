import {Component, OnInit} from '@angular/core';
import {PropertyDto} from '../../../../dtos/properties/PropertyDto';
import {PropertyService} from '../../../../services/property.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css'],
})
/**
 * Property view component.
 */
export class PropertyViewComponent implements OnInit {
  property: PropertyDto = {
    id: '',
    title: '',
    tenants: [],
  };

  /**
   * Basic constructor.
   */
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService) {
  }

  /**
   * Basic init method.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyService.getPropertyById(params['id'])
          .subscribe((property) => {
            this.property = property;
          });
    });
  }
}
