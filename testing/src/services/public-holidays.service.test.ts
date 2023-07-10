import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';
import axios from 'axios';
import { PUBLIC_HOLIDAY } from '../tests-constants';
import * as helpers from '../helpers';
import { shortenPublicHoliday, validateInput } from '../helpers';

jest.spyOn(helpers, 'shortenPublicHoliday');
jest.spyOn(helpers, 'validateInput');

describe('public holidays service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get list of public holidays init tests', () => {
    it('should return list of public holidays', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [PUBLIC_HOLIDAY] }));
      const list = await getListOfPublicHolidays(2023, 'GB');

      expect(helpers.validateInput).toHaveBeenCalledWith({ year: 2023, country: 'GB' });
      expect(shortenPublicHoliday).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/PublicHolidays/2023/GB');
      expect(list).toEqual([{name: 'New Year\'s Day', localName: 'New Year\'s Day', date: '2023-01-01'}]);
    });

    it('should return empty array if request failed', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const list = await getListOfPublicHolidays(2023, 'GB');

      expect(shortenPublicHoliday).not.toHaveBeenCalled();
      expect(helpers.validateInput).toHaveBeenCalledWith({ year: 2023, country: 'GB' });
      expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/PublicHolidays/2023/GB');
      expect(list).toEqual([]);
    });
  })

  describe('check if today is public holiday', () => {
    it('should return true if today is public holiday', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
      const isPublicHoliday = await checkIfTodayIsPublicHoliday('GB');

      expect(helpers.validateInput).toHaveBeenCalledWith({ country: 'GB' });
      expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/GB');
      expect(isPublicHoliday).toBeTruthy();
    });

    it('should return false if status code different then 200', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 201 }));
      const isPublicHoliday = await checkIfTodayIsPublicHoliday('GB');

      expect(helpers.validateInput).toHaveBeenCalledWith({ country: 'GB' });
      expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/GB');
      expect(isPublicHoliday).toBeFalsy();
    });

    it('should return false if request failed', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const isPublicHoliday = await checkIfTodayIsPublicHoliday('GB');

      expect(helpers.validateInput).toHaveBeenCalledWith({ country: 'GB' });
      expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/GB');
      expect(isPublicHoliday).toBeFalsy();
    });
  });

  describe('get next public holidays', () => {
    it('should return next public holidays', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [PUBLIC_HOLIDAY] }));
      const list = await getNextPublicHolidays('GB');

      expect(helpers.validateInput).toHaveBeenCalledWith({ country: 'GB' });
      expect(shortenPublicHoliday).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/NextPublicHolidays/GB');
      expect(list).toEqual([{name: 'New Year\'s Day', localName: 'New Year\'s Day', date: '2023-01-01'}]);
    });

    it('should return empty array if request failed', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const list = await getNextPublicHolidays('GB');

      expect(helpers.validateInput).toHaveBeenCalledWith({ country: 'GB' });
      expect(shortenPublicHoliday).not.toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/NextPublicHolidays/GB');
      expect(list).toEqual([]);
    });
  });
});
