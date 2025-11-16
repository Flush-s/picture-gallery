const express = require('express')
const router = express.Router()

const paintings = require('../data/paintingsData')
const { ERROR_TYPES, sendError } = require('../utils/errors')

// GET /api/gallery — вернуть ВСЕ картины (как галерею)
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: paintings.length,
    data: paintings,
  })
})

// GET /api/gallery/featured — только featured картины
router.get('/featured', (req, res) => {
  const featuredPaintings = paintings.filter(p => p.isFeatured)

  if (featuredPaintings.length === 0) {
    return sendError(res, ERROR_TYPES.NOT_FOUND, 'Featured картины не найдены')
  }

  res.json({
    success: true,
    count: featuredPaintings.length,
    data: featuredPaintings,
  })
})

// GET /api/gallery/:id — картина как элемент галереи
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const painting = paintings.find(p => p.id === id)

  if (!painting) {
    return sendError(res, ERROR_TYPES.NOT_FOUND, `Картина с ID ${id} не найдена`)
  }

  res.json({
    success: true,
    data: painting,
  })
})

module.exports = router
