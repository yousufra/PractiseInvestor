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

  it('GET /users/ranking --> array with all users info sorted', async () => {
    const response = await request(server).get('/users/ranking')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        totalNumberOfActivities: expect.any(Number),
        numberOfStocks: expect.any(Number),
        _id: expect.any(String),
        userName: expect.any(String),
        totalValue: expect.any(Number),
        __v: expect.any(Number),
      }),
    ]));
  });
});


