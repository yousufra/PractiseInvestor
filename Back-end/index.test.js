const app = require('./index');
const request = require('supertest');

const server = app(4567);

describe('Stocks API', () => {
  it('GET /stocks --> array with all stocks', async () => {
    const response = await request(server).get('/stocks')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        symbol: expect.any(String),
        name: expect.any(String),
        __v: expect.any(Number),
      }),
    ]));
  });
});

