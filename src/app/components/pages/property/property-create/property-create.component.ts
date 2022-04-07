import {Component, OnInit} from '@angular/core';
import {PropertyService} from '../../../../services/property/property.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {ModalService} from '../../../../services/modal/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css'],
})
export class PropertyCreateComponent implements OnInit {
  title: string = '';
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  visible: boolean = true;
  tenants: string[] = [];

  constructor(private propertyService: PropertyService,
              private modalService: ModalService,
              private router: Router) {
  }

  doCreateProperty() {
    this.propertyService.createProperty(this.title, this.tenants)
        .subscribe((property) => {
          this.modalService.showModal(
              'Property Creation',
              `Property \'${property.title}\' successfully created`,
          );
          this.router.navigate([`/property/view/${property.id}`]);
        });
  }

  ngOnInit(): void {
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
