import { PrismaClient } from './prisma-client';

describe('PrismaClient', () => {
  it('should be defined', () => {
    expect(new PrismaClient()).toBeDefined();
  });
});
