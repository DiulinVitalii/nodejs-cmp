import { shortenPublicHoliday, validateInput } from './helpers';
import { PUBLIC_HOLIDAY } from './tests-constants';

describe('helpers functions', () => {
  describe('should validate input', () => {
    it('should return true if year and country valid', () => {
      const input = { year: 2023, country: 'GB' };
      expect(validateInput(input)).toBeTruthy();
    });

    it('should throw error if year invalid and country valid', () => {
      const input = { year: 2022, country: 'GB' };
      expect(() => validateInput(input)).toThrow(new Error(`Year provided not the current, received: ${input.year}`));
    });

    it('should throw error if year valid and country invalid', () => {
      const input = { year: 2023, country: 'RG' };
      expect(() => validateInput(input)).toThrow(new Error(`Country provided is not supported, received: ${input.country}`));
    });
  });

  it('should return shorten public holiday', () => {
    expect(shortenPublicHoliday(PUBLIC_HOLIDAY)).toEqual({name: 'New Year\'s Day', localName: 'New Year\'s Day', date: '2023-01-01'})
  });
});
