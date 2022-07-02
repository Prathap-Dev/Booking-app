import express from 'express';
import { countByCity, countByType, createHotel, deleteHotel, getFeaturedHotels, getHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
/* router.post('/',verifyAdmin, createHotel); */
router.post('/', createHotel);
//UPDATE
router.put('/:id',verifyAdmin, updateHotel)
//DELETE
/* router.delete('/:id',verifyAdmin, deleteHotel) verify admin error*/
router.delete('/:id',deleteHotel)
//GET
router.get('/find/:id', getHotel)
//GET ALL
router.get('/all/find', getHotels)

router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/', getFeaturedHotels)
router.get('/room/:id', getHotelRooms)

export default router;