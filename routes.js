const express = require('express')
const router = express.Router()

const controlProductos = require('./controlProductos')

router.get('/', controlProductos.MostrarFormulario)

router.get('/productos', controlProductos.listarProducto)

router.post('/productos', controlProductos.nuevoProducto)

router.get('/productos/:id', controlProductos.mostrarProducto)

router.put('/productos/:id', controlProductos.actualizarProducto)

router.delete('/productos/:id', controlProductos.eliminarProducto)

module.exports = router