import retrieveSomething from './retrieve-something';

describe('the retrieve-something function', () => {
  test('should return something', async () => {
    const response = await retrieveSomething();
    expect(response).toBeDefined();
  });
});