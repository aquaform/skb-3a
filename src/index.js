import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

var pc = {};

app.get('/volumes', (req, res) => {
	let volumes = {};
	pc.hdd.forEach(hdd => {
		const currSize = volumes[hdd.volume] || 0;
		volumes[hdd.volume] = currSize + hdd.size;
	});
	for(let key in volumes){
		volumes[key] = `${volumes[key]}B`;
	};

	res.json(volumes);
});

app.get(/([\w]+)?\/?$/, (req, res) => {
	let parts = req.url.replace(/\/$/,'').split('/');
	parts = parts.slice(1);

	let part = pc;
	let validUrl = true;

	parts.forEach((item, i, arr) => {
		if (!!part[item] || part[item]===0 || part[item] === null) {
			part = part[item];
		} else {
			validUrl = false;
		}
	});

	if (validUrl) {
		res.json(part);
	} else {
		res.send (404, 'Not Found')
	}
});


app.listen(3000, () => {
	console.log('Your app listening on port 3000!');
	const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
	fetch(pcUrl).then(async (res) => {
  		pc = await res.json();  		
  	})
  	.catch (err => {
  		console.log('Невозможно прочитать урл. Ошибка:', err);
  	});
});
