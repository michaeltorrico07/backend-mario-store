import multer from 'multer'

// Configurar Multer para almacenar las imágenes en memoria
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // Limitar el tamaño del archivo a 50MB
})

export default upload
