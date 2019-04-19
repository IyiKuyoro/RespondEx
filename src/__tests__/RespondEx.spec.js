import RespondEx from '..';
import ResMock from '../__mocks__/ResMock';

describe('RespondEx', () => {
  describe('createdResource', () => {
    let res;
    let statusSpy;
    let jsonSpy;
    let setSpy;

    beforeEach(() => {
      res = new ResMock();
      statusSpy = jest.spyOn(res, 'status');
      jsonSpy = jest.spyOn(res, 'json');
      setSpy = jest.spyOn(res, 'set');
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should set the response type to application/json', () => {
      RespondEx.createdResource(
        'Success message',
        {
          name: 'Chair',
          number: 100,
          description: 'A comfortable chair for your afternoon tea',
        },
        'https://fakeURL/api/v1/proucts/12345',
        res,
      );

      expect(setSpy).toHaveBeenCalledWith({
        'content-type': 'application/json',
        url: 'https://fakeURL/api/v1/proucts/12345',
      });
    });

    it('should set the status code to 201', () => {
      RespondEx.createdResource(
        'Success message',
        {
          name: 'Chair',
          number: 100,
          description: 'A comfortable chair for your afternoon tea',
        },
        'https://fakeURL/api/v1/proucts/12345',
        res,
      );

      expect(statusSpy).toHaveBeenCalledWith(201);
      expect(jsonSpy).toHaveBeenCalledWith({
        success: true,
        message: 'Success message',
        data: {
          name: 'Chair',
          number: 100,
          description: 'A comfortable chair for your afternoon tea',
        },
      });
    });
  });
});
