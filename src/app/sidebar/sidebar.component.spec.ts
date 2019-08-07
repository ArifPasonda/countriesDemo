import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

import { of, BehaviorSubject } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let mocks: any;
  mocks = {
    http: jasmine.createSpyObj('http', ['get']),
    countryService: jasmine.createSpyObj('countryService', ['countryData']),
  };

  beforeEach(() => {
    component = new SidebarComponent(mocks.http, mocks.countryService);
  });

  describe('getCountryOnly', () => {
    it('should call the service and get the result', () => {
      // ARRANGE
      const countryData = 'gb';
      mocks.countryService.countryData = new BehaviorSubject<any>('');
      spyOn(mocks.countryService.countryData, 'subscribe').and.returnValue(of(countryData));
      // ACT
      component.getCountryOnly();
      // ASSERT
      expect(mocks.countryService.countryData.subscribe).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should call the init method and get country', () => {
      // ARRANGE
       spyOn(component, 'init').and.callThrough();
       spyOn(component, 'getCountryOnly');
      // ACT
       component.ngOnInit();
      // ASSERT
       expect(component.init).toHaveBeenCalled();
       expect(component.getCountryOnly).toHaveBeenCalled();
    });
  });
});
