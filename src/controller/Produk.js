import Produk from "../models/Produk.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getProduk = async(req, res)=> {
    try {
        const produk = await Produk.findAll({
            attributes: ['id','nama_produk','stok']
        });
        res.json(produk);
    } catch (error) {
        console.log(error);
    }
}

export const getprodukbyid = async(req, res)=> {
    try {
        const produkId = req.params.id; // Mengambil ID dari parameter URL
        const produk = await Produk.findOne({
            where: { id: produkId },
            attributes: ['id', 'nama_produk', 'stok'] // Hanya mengambil atribut tertentu
        });

        if (produk) {
            res.json(produk);
        } else {
            res.status(404).json({ message: 'produk not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addProduk = async(req, res)=>{
    const {nama_produk,stok} = req.body;
   

    try {
        await Produk.create({
            nama_produk: nama_produk,
            stok: stok,
        })
        res.status(201).json({message: "Tambah Produk Berhasil", data: req.body})
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }

}

export const updateProduk = async(req, res) =>{
    try {
        await Produk.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Produk Updated"});
    } catch (error) {
        console.log(error.message);
    }
}
