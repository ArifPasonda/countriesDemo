import { TestBed } from '@angular/core/testing';

import { CountryService } from './country.service';
import { BehaviorSubject } from 'rxjs';

describe('CountryService', () => {
  let service: CountryService;
  beforeEach(() => {
    service = new CountryService();
  });

  describe('changeCountry', () => {
    it('should be emit next value for changeCountry', () => {
      // ARRANGE
      const region = 'asia';
      service.countryRegion = new BehaviorSubject<string>('/all');
      spyOn(service.countryRegion, 'next');
      // ACT
      service.changeCountry(region);
      // ASSERT
      expect(service.countryRegion.next).toHaveBeenCalledWith(region);
    });
  });

  describe('changeCountryOnly', () => {
    it('should be emit next value for changeCountryOnly', () => {
      // ARRANGE
      const selectedCountry = 'gb';
      service.countryInfo = new BehaviorSubject<any>('');
      spyOn(service.countryInfo, 'next');
      // ACT
      service.changeCountryOnly(selectedCountry);
      // ASSERT
      expect(service.countryInfo.next).toHaveBeenCalledWith(selectedCountry);
    });
  });

  describe('changeCountryOnly', () => {
    it('should be emit next value for changeCountryOnly', () => {
      // ARRANGE
      // const selectedCountry: string = 'gb';
      const selectedCountry = {
         value: 'gb'
        };
      service.countryInfo = new BehaviorSubject<any>('');
      spyOn(service.countryInfo, 'next');
      service.countryNamebyCode = new BehaviorSubject<any>('');
      spyOn(service.countryNamebyCode, 'next');
      // ACT
      service.getCountryDataByCountryCode(selectedCountry);
      // ASSERT
      expect(service.countryNamebyCode.next).toHaveBeenCalledWith(selectedCountry);
    });
  });

  describe('clearCountryInfo', () => {
    it('should be emit next value for clearCountryInfo', () => {
      // ARRANGE
      const selectedCode = 'gb';
      service.clearCountryCode = new BehaviorSubject<any>('');
      spyOn(service.clearCountryCode, 'next');
      // ACT
      service.clearCountryInfo(selectedCode);
      // ASSERT
      expect(service.clearCountryCode.next).toHaveBeenCalledWith(selectedCode);
    });
  });

});
