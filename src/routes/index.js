import express from "express";
import {refreshToken} from "../controller/refreshToken.js";
import {getUsers, getUserbyid , Login, Register, Logout, UpdateUser} from "../controller/Users.js";
import {getProduk, addProduk, updateProduk, getprodukbyid} from "../controller/Produk.js";
import {getPelanggan, addPelanggan, updatePelanggan, getpelangganbyid} from "../controller/Pelanggan.js";
import {getPemasok, addPemasok, updatePemasok, getpemasokbyid} from "../controller/Pemasok.js";
import {getToko, addToko, updateToko, getTokobyid} from "../controller/Toko.js";
import {getTransaksi, gettransaksiin, gettransaksiout, addTransaksi} from "../controller/Transaksi.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();
router.get('/token', refreshToken);
/* user */
router.get('/users', getUsers);
router.patch('/users/:id', UpdateUser);
router.get('/user/:id', getUserbyid);
router.post('/users', Login);
router.delete('/users', Logout);
router.post('/Register', Register);

/* Produk */
router.get('/produk', getProduk);
router.get('/produk/:id', getprodukbyid);
router.post('/produk', addProduk);
router.patch('/produk/:id', updateProduk);

/*Pelanggan */
router.get('/pelanggan', getPelanggan);
router.get('/pelanggan/:id', getpelangganbyid);
router.post('/pelanggan', addPelanggan);
router.patch('/pelanggan/:id', updatePelanggan);

/*Pemasok */
router.get('/pemasok', getPemasok);
router.get('/pemasok/:id', getpemasokbyid);
router.post('/Pemasok', addPemasok);
router.patch('/Pemasok/:id', updatePemasok);

/*Toko */
router.get('/Toko', getToko);
router.get('/Toko/:id', getTokobyid);
router.post('/Toko', addToko);
router.patch('/Toko/:id', updateToko);

/* Transaksi */
router.get('/transaksi', getTransaksi);
router.get('/transaksiin', gettransaksiin);
router.get('/transaksiout', gettransaksiout);
router.post('/transaksi', addTransaksi);

export default router;