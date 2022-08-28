/**
 * Class representing a HttpError.
 * @extends Error
 */
class HttpError extends Error {
  /**
   * Create a HttpError.
   * @param {number} code - HTTP status code
   * @param {string} message - Error message
   */
  constructor(code, message) {
    super(message);
    this.name = "HttpError";
    this.status = code;
  }
}

module.exports = HttpError;
