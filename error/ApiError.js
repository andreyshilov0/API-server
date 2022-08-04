class ApiError extends Error {
  // Соответсвенно класс ошибки
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static badRequest(message) {
    return new ApiError(404, message);
  }
  static internal(message) {
    return new ApiError(500, message);
  }
  static forbiden(message) {
    return new ApiError(403, message);
  }
}

// Получение статусов об ошибках соответственно!

module.exports = ApiError;
