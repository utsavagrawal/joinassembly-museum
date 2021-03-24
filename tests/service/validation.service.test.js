const validationService = require('../../service/validation.service');

test('Date Parameter Skipped', () => {
    expect(() => {
        validationService.validateInput({});
      }).toThrow();
  });

test('Date Format - milliseconds', () => {
    expect(() => {
        validationService.validateInput({date: 1404198000000});
      }).not.toThrow();
  });

test('Date Format - YYYY-mm-dd', () => {
    expect(() => {
        validationService.validateInput({date: new Date("2021-02-21")});
      }).toThrow();
  });
  
test('Date Format - Future Date - [Dec 22 2414]', () => {
    expect(() => {
        validationService.validateInput({date: 14041980000000});
      }).toThrow();
  });