import Pelanggan from "../models/Pelanggan.js";

export const getPelanggan = async(req, res)=> {
    try {
        const pelanggan = await Pelanggan.findAll({
            attributes: ['id','nama','alamat','nohp']
        });
        res.json(pelanggan);
    } catch (error) {
        console.log(error);
    }
}

export const getpelangganbyid = async(req, res)=> {
    try {
        const pelangganId = req.params.id; // Mengambil ID dari parameter URL
        const pelanggan = await Pelanggan.findOne({
            where: { id: pelangganId },
            attributes: ['id', 'nama', 'alamat', 'nohp'] // Hanya mengambil atribut tertentu
        });

        if (pelanggan) {
            res.json(pelanggan);
        } else {
            res.status(404).json({ message: 'pelanggan not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addPelanggan = async(req, res)=>{
    const {nama, alamat, nohp} = req.body;
   

    try {
        await Pelanggan.create({
            nama: nama,
            alamat: alamat,
            nohp: nohp,
        })
        res.status(201).json({message: "Tambah Pelanggan Berhasil", data: req.body})
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }

}

export const updatePelanggan = async(req, res) =>{
    try {
        await Pelanggan.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pelanggan Updated"});
    } catch (error) {
        console.log(error.message);
    }
}
