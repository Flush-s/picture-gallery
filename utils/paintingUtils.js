// Функция для поиска
const applySearch = (paintings, search) => {
  if (!search) return paintings

  return paintings.filter(
    painting =>
      painting.title.toLowerCase().includes(search) ||
      painting.artist.toLowerCase().includes(search) ||
      painting.description.toLowerCase().includes(search),
  )
}

// Функция для фильтрации
const applyFilters = (paintings, filters) => {
  let result = [...paintings]

  // Фильтр по жанру
  if (filters.genre) {
    const genre = filters.genre.toLowerCase()
    result = result.filter(p => p.genre.some(g => g.toLowerCase() === genre))
  }

  // Фильтр по художнику
  if (filters.artist) {
    const artist = filters.artist.toLowerCase()
    result = result.filter(p => p.artist.toLowerCase().includes(artist))
  }

  // Год: minYear / maxYear
  if (filters.minYear) {
    result = result.filter(p => p.year >= parseInt(filters.minYear))
  }
  if (filters.maxYear) {
    result = result.filter(p => p.year <= parseInt(filters.maxYear))
  }

  // Цена: minPrice / maxPrice
  if (filters.minPrice) {
    result = result.filter(p => p.price >= parseInt(filters.minPrice))
  }
  if (filters.maxPrice) {
    result = result.filter(p => p.price <= parseInt(filters.maxPrice))
  }

  // featured=true / false
  if (filters.featured) {
    if (filters.featured === 'true') {
      result = result.filter(p => p.isFeatured)
    }
    if (filters.featured === 'false') {
      result = result.filter(p => !p.isFeatured)
    }
  }

  return result
}

// Функция для сортировки
const applySorting = (paintings, sortBy, sortOrder) => {
  const sorted = [...paintings]

  sorted.sort((a, b) => {
    const A = a[sortBy]
    const B = b[sortBy]

    if (A < B) return sortOrder === 'asc' ? -1 : 1
    if (A > B) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return sorted
}

// Функция для пагинации
const applyPagination = (paintings, page, limit) => {
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const data = paintings.slice(startIndex, endIndex)

  const pagination = {
    currentPage: parseInt(page),
    totalPages: Math.ceil(paintings.length / limit),
    totalItems: paintings.length,
  }

  return { data, pagination }
}

module.exports = {
  applySearch,
  applyFilters,
  applySorting,
  applyPagination,
}
