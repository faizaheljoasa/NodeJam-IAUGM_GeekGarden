const { User } = require('./../models/index');

module.exports = {
  get: async (req, res) => { 
    try {
      const user = await User.findAll();
      return res.send({
        message: "user resource get",
        data: user
      });
    } catch (error) {
      return res.send({
        errorCode: 500,
        message: error.message
      });
    }
  },

  post: async (req, res) => { 
    const body = req.body; 
    try {
        const user = await User.create(body); 
        return res.status(201).send({
          message: "Create User Resource",
          data: user
        });
    } catch (error) {
        return res.status(500).send({
          message: "Error creating user",
          error: error.message
        });
    }
  },

  put: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send({
          message: "User not found"
        });
      }
  
      await user.update(body);
  
      return res.send({
        message: "User updated successfully",
        data: user
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error updating user",
        error: error.message
      });
    }
  },
  
  delete: async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send({
          message: "User not found"
        });
      }
  
      await user.destroy();
  
      return res.send({
        message: "User deleted successfully"
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error deleting user",
        error: error.message
      });
    }
  },  
}