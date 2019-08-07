import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentComponent } from './main-content.component';
import { observable, of } from 'rxjs';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let mocks: any;
  mocks = {
    http: jasmine.createSpyObj('http', ['get']),
    countryService: jasmine.createSpyObj('countryService', ['changeCountryOnly', 'clearCountryInfo']),
  };

  beforeEach(() => {
    component = new MainContentComponent(mocks.http, mocks.countryService);
  });

  describe('getCountryData', () => {
    it('should call the api and get the result', () => {
      // ARRANGE
      const region = 'asia';
      const expectedCountries = [{
        name: 'test1',
        capital: 'testcap1'
      }];
      mocks.http.get.and.returnValue(of(expectedCountries));
      // ACT
      component.getCountryData(region);
      // ASSERT
      expect(mocks.http.get).toHaveBeenCalledWith('https://restcountries.eu/rest/v2' +  region);
      expect(component.countries).toEqual(expectedCountries);
    });
  });

  describe('getCountryDataByCountryCode', () => {
    it('should update the record after get the data based on country code from the api', () => {
      // ARRANGE
      const countryCode = 'gb';
      // ACT
      component.getCountryDataByCountryCode(countryCode);
      // ASSERT
      expect(component.countries).toEqual(countryCode);
    });
  });

  describe('ngOnInit', () => {
    it('should call the init method and and subscribe the region and country code api methods', () => {
      // ARRANGE
       spyOn(component, 'init');
      // ACT
       component.ngOnInit();
      // ASSERT
       expect(component.init).toHaveBeenCalled();
    });
  });

  describe('getCountryByName', () => {
    it('should call the api and get the Country by name', () => {
      // ARRANGE
      const expectedCountries = [{
        name: 'test1',
        capital: 'testcap1'
      }];
      const region = 'asia';
      const index=1;
      mocks.countryService.changeCountryOnly.and.returnValue(of(expectedCountries));
      // ACT
      component.getCountryByName(region,index);
      // ASSERT
      expect(mocks.countryService.changeCountryOnly).toHaveBeenCalled();
      expect(component.selectedRow).toEqual(index);
    });
    it('should call the api and clear the result', () => {
      // ARRANGE
      const expectedCountries = [{
        name: 'test1',
        capital: 'testcap1'
      }];
      const region = '';
      const index=1;
      mocks.countryService.changeCountryOnly.and.returnValue(of(expectedCountries));
      // ACT
      component.getCountryByName(region,index);
      // ASSERT
      expect(mocks.countryService.changeCountryOnly).toHaveBeenCalled();
      expect(component.selectedRow).toEqual(index);
    });
  });

  describe('clearResult', () => {
    it('should call the methods and api to clear the result', () => {
      // ARRANGE
      spyOn(component, 'getCountryData');
      mocks.countryService.changeCountryOnly.and.returnValue(of(''));
      mocks.countryService.clearCountryInfo.and.returnValue(of(''));
      // ACT
      component.clearResult();
      // ASSERT
      expect(component.getCountryData).toHaveBeenCalled();
      expect(mocks.countryService.changeCountryOnly).toHaveBeenCalled();
      expect(mocks.countryService.clearCountryInfo).toHaveBeenCalled();
      expect(component.selectedRow).toEqual(-1);
    });
  });
});
