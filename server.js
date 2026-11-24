try { require('dotenv').config() } catch {} // BARU: load .env sebelum yang lain
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser') // BARU
const apiRoutes = require('./app/api/route')
const authRoutes = require('./routes/auth') // BARU
const tokenRoutes = require('./routes/tokens') // BARU
const { connectDB } = require('./lib/db') // BARU

const app = express()

app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) // BARU

app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (/\.(html|css|js)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate')
    }
  }
}))

// BARU: harus sebelum /api supaya tidak tertimpa route lama
app.use('/auth', authRoutes)
app.use('/api/tokens', tokenRoutes)

app.use('/api', apiRoutes)

// BARU: sambungkan database saat server dimuat
connectDB().catch((err) => console.error('Gagal konek MongoDB:', err))

module.exports = app