import { ClientDiscountStrategy } from './client-discount.strategy';

describe('ClientDiscountStrategy', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Should validate transaction', () => {
    it('Should return true if client id is matched', () => {
      expect(
        new ClientDiscountStrategy().isSupported({
          clientId: 42,
        } as any),
      ).resolves.toBe(true);
    });

    it('Should return false if client id is not matched', () => {
      expect(
        new ClientDiscountStrategy().isSupported({
          clientId: 41,
        } as any),
      ).resolves.toBe(false);
    });
  });
});
