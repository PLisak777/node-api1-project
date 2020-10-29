const express = require('express');
const shortid = require('shortid');
const server = express();

let users = [];

const PORT = 5000;

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).send('Hello World');
});

// C - create (POST)
// R - read (GET)
// U - update (PUT, PATCH)
// D - delete (DELETE)

// create
server.post('/api/users', (req, res) => {
	let newUser = req.body;
	if (newUser.name && newUser.bio) {
		try {
			newUser.id = shortid.generate();
			users.push(newUser);
			res.status(201).json(newUser);
		} catch (err) {
			res.status(500).json({
				errorMessage:
					'There was an error while saving the user to the database',
			});
		}
	} else {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	}
});

// read
server.get('/api/users', (req, res) => {
	try {
		res.status(200).json(users)
	}
	catch (err) {
		res.status(500).json({ errorMessage: "The users information could not be retrieved." })
	}
})

// read
server.get('/api/users/:id', (req, res) => {
	try {
		const { id } = req.params;
		const found = users.find(user => user.id === id)

		if (found) {
			res.status(200).json(found)
		}
		else {
			res.status(404).json({ message: "The user with the specified ID does not exist." })
		}
	}
	catch (err) {
		res.status(500).json({ errorMessage: "The user information could not be retrieved." })
	}
})

// delete
server.delete('api/users/:id', (req, res) => {
	try {
		const { id } = req.params
		const found = users.find(user => user.id === id)

		if (found) {
			users = users.filter(user => user.id !== id)
			res.status(204).json(found)
		}
		else {
			res.status(404).json({ message: "The user with the specified ID does not exist." })
		}
	}
	catch (err) {
		res.status(500).json({ errorMessage: "The user could not be removed" })
	}
})

// update
server.put('/api/users/:id', (req, res) => {
	try {
		const { id } = req.params
		const found = users.find(user => user.id === id)
		const userChanges = req.body

		if (found) {
			if (userChanges.name && userChanges.bio) {
				userChanges.id = id
				users = users.map(user => user.id === id ? userChanges : user)
				res.status(200).json(userChanges)
			} else {
				res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
			}
		} else {
			res.status(404).json({ message: "The user with the specified ID does not exist." })
		}
	}
	catch (err) {
		res.status(500).json({ errorMessage: "The user information could not be modified." })
	}
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))