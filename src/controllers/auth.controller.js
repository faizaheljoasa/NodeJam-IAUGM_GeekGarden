const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  signup: async (req, res) => {
    const { name, username, password } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        username,
        password: hashedPassword
      });

      return res.status(201).send({
        message: 'User registered successfully',
        data: user
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.send({
        message: 'Login successful',
        token: token
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};
