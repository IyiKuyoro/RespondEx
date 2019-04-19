export default class RespondEx {
  /**
   * @description Send a success response for a created resource.
   * @param  {string} message The message of the response
   * @param  {object} data The data to be sent
   * @param  {string} location The URL of the new resource
   * @param  {object} res The express response object
   * @param  {object} options Object containing options.
   */
  static createdResource(message, data, location, res, options = {}) {
    res.set({
      'content-type': options.contentType || 'application/json',
      url: location,
    });
    res.status(200).json({
      success: true,
      message,
      data,
    });
  }
}
