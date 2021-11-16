import {SortDirective} from './sort.directive';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('', () => {
  let fixture: ComponentFixture<MockComponent>;
  let component: MockComponent;
  let directive: DebugElement[];

  @Component({
    template: `
      <table>
          <thead>
                <th><span [appSort]="mockDataList" data-order="desc" data-name="age">Sort by age</span></th>
                <th><span [appSort]="mockDataList" data-order="desc" data-name="date" data-type="date">Sort by date</span></th>
          </thead>
      </table>
    `
  })
  class MockComponent {
    public mockDataList = [
      {
        age: 45,
        date: '10/19/1975'
      },
      {
        age: 20,
        date: '01/01/1985'
      },
      {
        age: 44,
        date: '12/15/1990'
      },
    ];
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, SortDirective]
    });
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement.queryAll(By.directive(SortDirective));
    fixture.autoDetectChanges();
  });

  it('should have 2 elements with directive', async(() => {
    expect(directive.length).toEqual(2);
  }));

  it('should sort by age after click', () => {
    const [sortByAge] = getSpanList();
    sortByAge.click();
    expect(component.mockDataList[0].age).toBe(45);
    sortByAge.click();
    expect(component.mockDataList[0].age).toBe(20);
  });

  it('should sort by date after click', () => {
    const [_, sortByDate] = getSpanList();
    sortByDate.click();
    expect(component.mockDataList[0].date).toBe('12/15/1990');
    sortByDate.click();
    expect(component.mockDataList[0].date).toBe('10/19/1975');
  });

  it('should add active class to clicked element', () => {
    const [sortByAge, sortByDate] = getSpanList();
    sortByAge.click();
    /* Directive should add active class to the span */
    activeClassIsOne();
    /* Directive should remove active class from prev element and add active class to the current element */
    sortByDate.click();
    activeClassIsOne();
  });

  function activeClassIsOne() {
    expect(fixture.nativeElement.querySelectorAll('.active').length).toBe(1);
  }

  function getSpanList(): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll('span');
  }
});
