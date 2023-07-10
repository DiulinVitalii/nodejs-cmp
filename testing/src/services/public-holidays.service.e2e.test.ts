import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';


describe('Nager.Date API', () => {
  describe('/AvailableCountries', () => {
    it('should return 200 and available countries', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get('/AvailableCountries');

      expect(status).toEqual(200);
      expect(body.length).toEqual(110);
      expect(Array.isArray(body)).toEqual(true);
      expect(body[0]).toEqual({
        countryCode: expect.any(String),
        name: expect.any(String),
      });
    });
  });

  describe('/PublicHolidays/{year}/{countryCode}', () => {
    it('should return 200 and public holidays', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/2023/UA');

      expect(status).toEqual(200);
      expect(body.length).toEqual(11);
      expect(Array.isArray(body)).toEqual(true);
      expect(body[0]).toEqual({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
        countryCode: expect.any(String),
        fixed: expect.any(Boolean),
        global: expect.any(Boolean),
        counties: null,
        launchYear: null,
        types: expect.any(Array),
      });
    });

    it('should return 404 and Not Found message if CountryCode in unknown', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/2023/RR');

      expect(status).toEqual(404);
      expect(body.title).toEqual('Not Found');
    });

    it('should return 400 and error message if validation failed', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/1900/UA');

      expect(status).toEqual(400);
      expect(body.title).toEqual('One or more validation errors occurred.');
    });
  });
})
