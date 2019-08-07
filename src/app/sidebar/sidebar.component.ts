import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CountryService } from '../user_service/country.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  countryDetails: any;
  isDisplay = false;
  constructor(private http: HttpClient, private countryService: CountryService) {
  }
  ngOnInit() {
    this.init();
  }
  public getCountryOnly() {
    this.countryService.countryData.subscribe(countryData => {
      if (countryData) {
        this.isDisplay = true;
      } else {
        this.isDisplay = false;
      }
      this.countryDetails = countryData;
    });
  }
  init() {
    this.getCountryOnly();
  }
}

