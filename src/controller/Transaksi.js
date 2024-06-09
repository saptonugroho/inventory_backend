import Transaksi from "../models/Transaksi.js";

export const getTransaksi = async(req, res)=> {
    try {
        const transaksi = await Transaksi.findAll({
            attributes: ['id_barang','nama_barang','jumlah','type','user_update']
        });
        res.json(transaksi);
    } catch (error) {
        console.log(error);
    }
}


export const addTransaksi = async(req, res)=>{
    const {nama, alamat, nohp} = req.body;
   

    try {
        await Transaksi.create({
            id_barang : id_barang,
            nama_barang : nama_barang,
            jumlah : jumlah,
            type : type,
            user_update : user_update
        })
        res.status(201).json({message: "Tambah Transaksi Berhasil", data: req.body})
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }

}
