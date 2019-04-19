import RespondEx from '..';
import ApiError from '@respondex/apierror';
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

  describe('error', () => {
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
      const error = new ApiError('Some error', [], 400);

      RespondEx.error(error, res);

      expect(setSpy).toHaveBeenCalledWith({
        'content-type': 'application/json',
      });
    });

    it('should set the status code to 400', () => {
      const error = new ApiError('Some error', ['error'], 400);

      RespondEx.error(error, res);

      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({
        success: false,
        message: 'Some error',
        possibleCauses: ['error'],
      });
    });

    it('should set the status code to 500 with custom possible cases', () => {
      const error = new ApiError('Some error');

      RespondEx.error(error, res);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        success: false,
        message: 'Some error',
        possibleCauses: [],
      });
    });
  });

  describe('errorByType', () => {
    describe('ClientError', () => {
      let res;
      let respondexSpy;

      beforeEach(() => {
        res = new ResMock();
        respondexSpy = jest.spyOn(RespondEx, 'error')
          .mockImplementation(() => {});
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should call RespondEx.error with default message', () => {
        RespondEx.errorByType(
          'ClientError',
          res,
        );

        const error = new ApiError(
          'A client error has occurred.',
          [
            'You may not be sending all the information required',
            'Some of the information may be in the wrong type or format',
          ],
          400,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });

      it('should call RespondEx.error with custom message', () => {
        RespondEx.errorByType(
          'ClientError',
          res,
          'A custom message',
          [],
        );

        const error = new ApiError(
          'A custom message',
          [],
          400,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });
    });

    describe('Unauthorized', () => {
      let res;
      let respondexSpy;

      beforeEach(() => {
        res = new ResMock();
        respondexSpy = jest.spyOn(RespondEx, 'error')
          .mockImplementation(() => {});
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should call RespondEx.error with default message', () => {
        RespondEx.errorByType(
          'Unauth­orized',
          res,
        );

        const error = new ApiError(
          'Unauthorized',
          [
            'Authorization for this resource failed.',
          ],
          401,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });

      it('should call RespondEx.error with custom message', () => {
        RespondEx.errorByType(
          'Unauthorized',
          res,
          'A custom message',
          [],
        );

        const error = new ApiError(
          'A custom message',
          [],
          401,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });
    });

    describe('Forbidden', () => {
      let res;
      let respondexSpy;

      beforeEach(() => {
        res = new ResMock();
        respondexSpy = jest.spyOn(RespondEx, 'error')
          .mockImplementation(() => {});
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should call RespondEx.error with default message', () => {
        RespondEx.errorByType(
          'Forbidden',
          res,
        );

        const error = new ApiError(
          'Access denied',
          [
            'You may not have the right access level to this resource',
          ],
          403,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });

      it('should call RespondEx.error with custom message', () => {
        RespondEx.errorByType(
          'Forbidden',
          res,
          'A custom message',
          [],
        );

        const error = new ApiError(
          'A custom message',
          [],
          403,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });
    });

    describe('NotFound', () => {
      let res;
      let respondexSpy;

      beforeEach(() => {
        res = new ResMock();
        respondexSpy = jest.spyOn(RespondEx, 'error')
          .mockImplementation(() => {});
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should call RespondEx.error with default message', () => {
        RespondEx.errorByType(
          'NotFound',
          res,
        );

        const error = new ApiError(
          'Resource not found',
          [
            'The URL may be wrong',
          ],
          404,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });

      it('should call RespondEx.error with custom message', () => {
        RespondEx.errorByType(
          'NotFound',
          res,
          'A custom message',
          [],
        );

        const error = new ApiError(
          'A custom message',
          [],
          404,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });
    });

    describe('ServerError', () => {
      let res;
      let respondexSpy;

      beforeEach(() => {
        res = new ResMock();
        respondexSpy = jest.spyOn(RespondEx, 'error')
          .mockImplementation(() => {});
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should call RespondEx.error with default message', () => {
        RespondEx.errorByType(
          'ServerError',
          res,
        );

        const error = new ApiError(
          'A server error has occurred! Please contact the administrator',
          [
            'This error is caused by a malfunction in this application',
          ],
          404,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });

      it('should call RespondEx.error with custom message', () => {
        RespondEx.errorByType(
          'ServerError',
          res,
          'A custom message',
          [],
        );

        const error = new ApiError(
          'A custom message',
          [],
          404,
        );

        expect(respondexSpy).toHaveBeenCalledWith(
          error,
          res,
          {},
        );
      });
    });
  });
});
