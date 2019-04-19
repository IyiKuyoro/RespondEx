import ApiError from '@respondex/apierror';

export default class RespondEx {
  /**
   * @description Send a success response for a created resource.
   * @param  {string} message The message of the response
   * @param  {object} data The data to be sent
   * @param  {string} location The URL of the new resource
   * @param  {object} res The express response object
   * @param  {object} options={} Object containing options
   */
  static createdResource(message, data, location, res, options = {}) {
    res.set({
      'content-type': options.contentType || 'application/json',
      url: location,
    });
    res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * @description Send error response to the serve
   * @param  {object} error The APIError object of the error that occurred
   * @param  {object} res The express response object
   * @param  {object} options={} Object containing options
   */
  static error(error, res, options = {}) {
    res.set({
      'content-type': options.contentType || 'application/json',
    });
    res.status(error.code).json({
      success: false,
      message: error.message,
      possibleCauses: error.possibleCauses || [],
    });
  }

  /**
   * @description Sends error response based on type
   * @param  {string} type The type of error
   * @param  {object} res The express response object
   * @param  {string} message The error message
   * @param  {object[]} possibleErrors Possible error messages
   * @param  {object} options={} Object containing options
   */
  static errorByType(type, res, message, possibleErrors, options = {}) {
    switch (type) {
      case 'ClientError':
      {
        const error = new ApiError(
          message || 'A client error has occurred.',
          possibleErrors || [
            'You may not be sending all the information required',
            'Some of the information may be in the wrong type or format',
          ],
          400,
        );
        RespondEx.error(error, res, options);
        break;
      }
      case 'Unauth­orized':
      {
        const error = new ApiError(
          message || 'Unauthorized',
          possibleErrors || [
            'Authorization for this resource failed.',
          ],
          401,
        );
        RespondEx.error(error, res, options);
        break;
      }
      case 'Forbidden':
      {
        const error = new ApiError(
          message || 'Access denied',
          possibleErrors || [
            'You may not have the right access level to this resource',
          ],
          403,
        );
        RespondEx.error(error, res, options);
        break;
      }
      case 'NotFound':
      {
        const error = new ApiError(
          message || 'Resource not found',
          possibleErrors || [
            'The URL may be wrong',
          ],
          404,
        );
        RespondEx.error(error, res, options);
        break;
      }
      default:
      {
        const error = new ApiError(
          message || 'A server error has occurred! Please contact the administrator',
          possibleErrors || [
            'This error is caused by a malfunction in this application',
          ],
        );
        RespondEx.error(error, res, options);
        break;
      }
    }
  }
}
