import {Sort} from './sort';

describe('test Sort class', () => {
  let sort;
  let mockDataList;

  beforeEach(() => {
    sort = new Sort();
    mockDataList = [
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
  });

  it('should sort by age (ACS)', () => {
    const sortDataSpy = spyOn(sort, 'sortData');
    mockDataList.sort(sort.startSort('age', 'asc'));
    expect(mockDataList[0].age).toBe(20);
    expect(sortDataSpy).not.toHaveBeenCalled();
  });

  it('should sort by age (DESC)', () => {
    mockDataList.sort(sort.startSort('age', 'desc'));
    expect(mockDataList[0].age).toBe(45);
  });

  it('should sort date (ACS)', () => {
    const sortDataSpy = spyOn(sort, 'sortData');
    mockDataList.sort(sort.startSort('date', 'asc', 'date'));
    expect(mockDataList[0].date).toBe('10/19/1975');
    expect(sortDataSpy).toHaveBeenCalled();
  });

  it('should sort date (DESC)', () => {
    mockDataList.sort(sort.startSort('date', 'desc', 'date'));
    expect(mockDataList[0].date).toBe('12/15/1990');
  });

  it('sortData should return 0', () => {
    sortDate('12/15/1990', '12/15/1990', 0);
  });

  it('sortData should return 1', () => {
    sortDate('12/15/1990', '12/15/1991', 1);
  });

  it('sortData should return -1', () => {
    sortDate('12/15/1991', '12/15/1990', -1);
  });

  function sortDate(a: string, b: string, expectedResult: number) {
    const startSort = sort.startSort('date', 'desc', 'date');
    const result = startSort({date: a}, {date: b});
    expect(result).toBe(expectedResult);
  }
});
