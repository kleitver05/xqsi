import {Router} from 'express'
import {getClientes,
    getclientesxid,
    postCliente,
    putCliente,
    patchCliente,
    deleteCliente} from '../controladores/clientesCtrl.js'
const router=Router()
// armar nuestras rutas

router.get('/cliente',getClientes) //select
router.get('/cliente/:cli_cedula',getclientesxid)//select x id
router.post('/cliente',postCliente) //insert
router.put('/cliente/:cli_cedula',putCliente)//update
router.patch('/cliente/:cli_cedula',patchCliente)//update
router.delete('/cliente/:cli_cedula',deleteCliente)//delete

export default router