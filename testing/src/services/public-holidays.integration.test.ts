import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';
import axios from 'axios';



describe('public holidays service integration tests', () => {
  jest.spyOn(axios, 'get');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of public holidays', async () => {
    const list = await getListOfPublicHolidays(2023, 'GB');

    expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/PublicHolidays/2023/GB');
    expect(list.length).toEqual(16);
  });

  it('checkIfTodayIsPublicHoliday should return boolean value', async () => {
    const isPublicHoliday = await checkIfTodayIsPublicHoliday('GB');

    expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/GB');
    expect(typeof isPublicHoliday).toBe('boolean');
  });

  it('should return next public holidays', async () => {
    const list = await getNextPublicHolidays('GB');

    expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/NextPublicHolidays/GB');
    expect(list.length).toBeGreaterThan(0);
  });
});
