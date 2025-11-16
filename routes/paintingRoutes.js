const express = require('express')
const router = express.Router()
const {
  getPaintings,
  getPaintingById,
  getPaintingsByGenre,
  getFeaturedPaintings,
} = require('../controllers/paintingController')
const validateQueryParams = require('../middleware/validateQueryParams')

// GET /api/paintings — все картины с фильтром ?featured=true, ?genre=... и поиском ?search=...
router.get('/', validateQueryParams, getPaintings)

// GET /api/paintings/featured — только featured
router.get('/featured', getFeaturedPaintings)

// GET /api/paintings/genre/:genre — фильтрация по жанру
router.get('/genre/:genre', getPaintingsByGenre)

// GET /api/paintings/:id — получение по ID
router.get('/:id', getPaintingById)

module.exports = router
