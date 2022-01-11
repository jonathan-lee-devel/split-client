import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
/**
 * Footer used within all pages.
 */
export class FooterComponent implements OnInit {
  /**
   * Default constructor
   */
  constructor() {
  }

  /**
   * Init function for footer component.
   */
  ngOnInit(): void {
  }
}
