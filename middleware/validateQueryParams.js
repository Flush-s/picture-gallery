const { ERROR_TYPES, sendError } = require('../utils/errors')
// Middleware для валидации числовых параметров запроса
const validateQueryParams = (req, res, next) => {
  const { page, limit, minYear, maxYear, minPrice, maxPrice } = req.query

  // Проверка page
  if (page && isNaN(parseInt(page))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Параметр '${page}' должен быть числом`)
  }

  // Проверка limit
  if (limit && isNaN(parseInt(limit))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Параметр '${limit}' должен быть числом`)
  }

  // Проверка minYear
  if (minYear && isNaN(parseInt(minYear))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Параметр '${minYear}' должен быть числом`)
  }

  // Проверка maxYear
  if (maxYear && isNaN(parseInt(maxYear))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Параметр '${maxYear}' должен быть числом`)
  }

  // Проверка minPrice
  if (minPrice && isNaN(parseInt(minPrice))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Параметр '${minPrice}' должен быть числом`)
  }

  // Проверка maxPrice
  if (maxPrice && isNaN(parseInt(maxPrice))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Параметр '${maxPrice}' должен быть числом`)
  }

  // Валидация диапазонов
  if (minYear && maxYear && parseInt(minYear) > parseInt(maxYear)) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `'${minYear}'не может быть больше '${maxYear}'`)
  }

  if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `'${minPrice}'не может быть больше '${maxPrice}'`)
  }

  next()
}

module.exports = validateQueryParams
