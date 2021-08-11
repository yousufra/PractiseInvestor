import { server } from './index';
const request = require('supertest');
const serverConnection = server(4567);

describe('Stocks API', () => {
  it('GET /stocks --> array with all stocks', async () => {
    const response = await request(serverConnection).get('/stocks')

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
    const response = await request(serverConnection).get('/users/ranking')

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
  
  it('GET /users --> array with all users', async () => {
    const response = await request(serverConnection).get('/users')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        cash: expect.any(Number),
        holdings: expect.arrayContaining([
          expect.objectContaining({
            company: expect.any(String),
            ticker: expect.any(String),
            quantity: expect.any(Number),
            avgCost: expect.any(Number),
          })
        ]),
        activities: expect.arrayContaining([
          expect.objectContaining({
            date: expect.any(String),
            company: expect.any(String),
            ticker: expect.any(String),
            action: expect.any(String),
            quantity: expect.any(Number),
            price: expect.any(Number),
            netAmount: expect.any(Number)
          })
        ]),
        totalValueHistory: expect.arrayContaining([
          expect.objectContaining({
            totalValue: expect.any(Number),
            date: expect.any(String)
          })
        ]),
        userName: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      }),
    ]));
  });
});
