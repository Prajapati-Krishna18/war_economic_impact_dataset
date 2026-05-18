class ApiResponse {
  /**
   * Create a standardized API response
   * @param {Number} statusCode HTTP status code
   * @param {Object|Array|null} data Payload to send
   * @param {String} message Status message
   * @param {Object} [meta] Optional metadata (like pagination)
   */
  constructor(statusCode, data = null, message = 'Success', meta = null) {
    this.success = statusCode < 400;
    this.status = statusCode;
    this.message = message;
    
    if (data !== null) {
      this.data = data;
    }
    
    if (meta !== null) {
      this.meta = meta;
    }
  }

  /**
   * Send the response using Express response object
   * @param {Object} res Express response object
   */
  send(res) {
    return res.status(this.status).json(this);
  }
}

module.exports = ApiResponse;
