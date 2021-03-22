import { BasicPage } from '../../src/core/BasicPage';

describe('BasicPage', () => {
  test('Should create instance', () => {
    const basicPage = new BasicPage();

    expect(basicPage).toBeDefined();
  });

  test('Should set props and build', () => {
    const basicPage = new BasicPage().setContent([]).setHasNext(false).setTotal(0);

    expect(basicPage).toBeDefined();
    expect(basicPage.getContent()).toStrictEqual([]);
    expect(basicPage.getHasNext()).toBeFalsy();
    expect(basicPage.getTotal()).toBe(0);
  });
});