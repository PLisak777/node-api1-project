const express = require('express');
const shortid = require('shortid');

let users = [{
	id: shortid.generate(),
	name: 'Dopey',
	bio: '7th Dwarf, if that dwarf weilds an axe'
}];

const server = express();

server.use(express.json());


// C - create (POST)
// R - read (GET)
// U - update (PUT, PATCH)
// D - delete (DELETE)

// create
server.post('/api/users', (req, res) => {
	const { name, bio } = req.params;

	const newUser = req.body;
	users.push(newUser);

	res.status(201).json(newUser);
});

