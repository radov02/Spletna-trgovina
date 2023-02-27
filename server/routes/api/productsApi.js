import express from 'express';
const router = express.Router();
import pool from '../../dbConnection.js';

router.get('/', async (req, res) => {
	let fetchNumber = parseInt(req.query.number);
	let noDuplicates = req.query.noDups;

	if (noDuplicates !== null && noDuplicates !== undefined) {
		try {
			let newProducts = await pool.query(
				`select * from Izdelki where ID_izdelka not in ? order by rand() limit ?`,
				[[noDuplicates], fetchNumber]
			);
			res.status(200).send(newProducts[0]);
		} catch (onRejectedError) {
			console.log(onRejectedError);
			res.status(400).send(`error`);
		}
	} else {
		try {
			let newProducts = await pool.query(`select * from Izdelki order by rand() limit ?`, [fetchNumber]);
			res.status(200).send(newProducts[0]);
		} catch (onRejectedError) {
			console.log(onRejectedError);
			res.status(400).send(`error`);
		}
	}
});

router.get('/availability', async (req, res) => {
	let id = req.query.ID_izdelka;
	console.log('checking');
	try {
		let availNumber = await pool.query(`select (kosov_na_voljo) from Izdelki where ID_izdelka = ?`, [id]);
		res.status(200).send(availNumber);
	} catch (onRejectedError) {
		console.log(onRejectedError);
		res.status(400).send(`error`);
	}
});

router.get('/kategorije', async (req, res) => {
	try {
		let result = await pool.query(`select distinct kategorija from Izdelki`);
		console.log(result[0]);
		res.status(200).send(result[0]);
	} catch (onRejectedError) {
		console.log(onRejectedError);
		res.status(400).send(`error`);
	}
});

// spremeni pri filtrih:
router.get('/stVsehProduktov', async (req, res) => {
	try {
		let number = await pool.query(`select count(*) from Izdelki`);
		res.status(200).send(number[0][0]['count(*)'].toString());
	} catch (onRejectedError) {
		console.log(onRejectedError);
		res.status(400).send(`error`);
	}
});

export default router;
