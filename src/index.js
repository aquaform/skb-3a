import express from 'express';
import cors from 'cors';
import request from 'request';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

let pc = {};


app.get(/([\w]+)?\/?$/, (req, res) => {  

  let parts = req.url.split('/');
  parts = parts.slice(1);  
  let part = pc;

  parts.forEach((item, i, arr) => { part = part[item] });
  

  
   
  res.json(part);
});






app.listen(3000, () => {
  console.log('Your app listening on port 3000!');  
  const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

  fetch(pcUrl)
  	.then(async (res) => {
  		pc = await res.json();  		
  	})
  	.catch (err => {
  		console.log('Невозможно прочитать урл. Ошибка:', err);
  	});

  	/*
  	request.get(pcUrl, function (error, response, body) {    
    	if(!error) {
        	pc = JSON.parse(body);
        	console.log(pc);
    	}
    });
	*/
});
