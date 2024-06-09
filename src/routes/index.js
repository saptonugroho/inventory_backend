import express from "express";
import {refreshToken} from "../controller/refreshToken.js";
import {getUsers, Login, Register, Logout} from "../controller/Users.js";
import {getProduk, addProduk, updateProduk} from "../controller/Produk.js";
import {getPelanggan, addPelanggan, updatePelanggan} from "../controller/Pelanggan.js";
import {getPemasok, addPemasok, updatePemasok} from "../controller/Pemasok.js";
import {getToko, addToko, updateToko} from "../controller/Toko.js";
import {getTransaksi} from "../controller/Transaksi.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();
router.get('/token', refreshToken);
/* user */
router.get('/users',verifyToken, getUsers);
router.post('/users', Login);
router.delete('/users', Logout);
router.post('/Register', Register);

/* Produk */
router.get('/produk', getProduk);
router.post('/produk', addProduk);
router.patch('/produk/:id', updateProduk);

/*Pelanggan */
router.get('/pelanggan', getPelanggan);
router.post('/pelanggan', addPelanggan);
router.patch('/pelanggan/:id', updatePelanggan);

/*Pemasok */
router.get('/Pemasok', getPemasok);
router.post('/Pemasok', addPemasok);
router.patch('/Pemasok/:id', updatePemasok);

/*Toko */
router.get('/Toko', getToko);
router.post('/Toko', addToko);
router.patch('/Toko/:id', updateToko);

/* Transaksi */
router.get('/transaksi', getTransaksi);

export default router;