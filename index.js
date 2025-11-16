const express = require('express')
const cors = require('cors')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler') // Импортируем простой обработчик ошибок
const notFoundHandler = require('./middleware/notFoundHandler') // Импортируем обработчик 404 ошибок

const paintingRoutes = require('./routes/paintingRoutes')
const galleryRoutes = require('./routes/galleryRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Логирование только в development
if (process.env.NODE_ENV === 'development') {
  app.use(logger)
}

app.use('/api/paintings', paintingRoutes)
app.use('/api/gallery', galleryRoutes)

// Базовая проверка работоспособности
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Сервер работает нормально',
    timestamp: new Date().toISOString(),
  })
})

// Обработчик 404 ошибок - для несуществующих маршрутов
app.use(notFoundHandler)

// Простой обработчик ошибок - должен быть последним
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Сервер галереи запущен на порту ${PORT}`)
  console.log(`Режим: ${process.env.NODE_ENV || 'development'}`)
  console.log(`Статус: http://localhost:${PORT}/health`)
  console.log(`API картин: http://localhost:${PORT}/api/paintings`)
})
