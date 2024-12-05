const response = (statusCode, status, data, message, res, pagination = {}) => {
  res.status(statusCode).json({
    payload: {
      status_code: statusCode,
      status: status,
      message: message,
      datas: data,
    },
    pagination: {
      totalItems: pagination.totalItems || 0, // jumlah semua data no limit
      currentPage: pagination.currentPage || 1, // page data yang lagi di buka user
      pageSize: pagination.pageSize || 1, // limit / data yg ditampilkan
      totalPages: pagination.totalPages || 1, // seluruh page = seluruh data / limit
    },
  });
};

module.exports = response;
