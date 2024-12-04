import { conmysql } from '../db.js'

export const getClientes =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('select * from cliente')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar clienetes" })
        }
    }




export const getclientesxid=
async (req, res)=>{
    try {
        const [result]=await conmysql.query(
            'select * from cliente where cli_cedula=?',[req.params.cedula])
        if(result.length<=0)return res.status(404).json({
            cli_cedula:0,
            message:"Cliente no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json(
            {message:'error del lado del servidor'})
    }
}

export const postCliente=
async(req, res)=>{
try {
      // console.log(req.body)
  const {cli_cedula, cli_nombres, cli_apellidos, cli_estado}=req.body
  //console.log(cli_nombre)
  const [rows]=await conmysql.query('insert into cliente (cli_cedula, cli_nombres, cli_apellidos, cli_estado) values(?,?,?,?)',
    [cli_cedula, cli_nombres, cli_apellidos, cli_estado])
  res.send({
    id:rows.insertId
  })

} catch (error) {
    return res.status(500).json({message:'error del lado del servidor'})
}
}

export const putCliente=
async(req, res)=>{
    try {
        const {cedula}=req.params
          // console.log(req.body)
      const {cli_cedula, cli_nombres, cli_apellidos, cli_estado}=req.body
      console.log(cli_nombre)
       const [result]=await conmysql.query('update clientes set cli_cedula=?, cli_nombres=?, cli_apellidos=?, cli_estado=? where cli_cedula=?',
        [cli_cedula, cli_nombres, cli_apellidos, cli_estado,cedula])
  
       if(result.affectedRows<=0)return res.status(404).json({
        message:"Cliente no encontrado"
       })
       const [rows]=await conmysql.query('select * from cliente where cli_cedula=?',[cedula])
       res.json(rows[0])
       
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchCliente=
async(req, res)=>{
    try {
        const {cedula}=req.params
          // console.log(req.body)
      const {cli_cedula, cli_nombres, cli_apellidos, cli_estado}=req.body
      console.log(cli_nombre)
       const [result]=await conmysql.query('update cliente set  cli_nombres=IFNULL(?,cli_nombres), cli_apellidos=IFNULL(?,cli_apellidos), cli_estado=IFNULL(?,cli_estado),  where cli_cedula=?',
        [ cli_nombres, cli_apellidos,cli_estado ,cedula])
  
       if(result.affectedRows<=0)return res.status(404).json({
        message:"Cliente no encontrado"
       })
       const [rows]=await conmysql.query('select * from cliente where cli_cedula=?',[cedula])
       res.json(rows[0])
       
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteCliente=
async(req, res)=>{
    try {
      
        const [rows]=
        await conmysql.query(' delete from cliente where cli_cedula=?',[req.params.cedula])
        if(rows.affectedRows<=0)return res.status(404).json({
            cedula:0,
            message:"NO pudo eliminar al cliente"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}