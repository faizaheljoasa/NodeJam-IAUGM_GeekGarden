const { Product, User } = require('./../models/index');

module.exports = {
  get: async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.send({
        message: "Product list",
        data: products
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error fetching products",
        error: error.message
      });
    }
  },

  post: async (req, res) => {
    const body = req.body;
    const userId = req.user.id;

    try {
      const product = await Product.create({ ...body, userId });
      return res.status(201).send({
        message: "Product created",
        data: product
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error creating product",
        error: error.message
      });
    }
  },

  put: async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    try {
      const product = await Product.findByPk(productId);
      if (!product || product.userId !== userId) {
        return res.status(403).send({
          message: "You are not allowed to update this product"
        });
      }

      await product.update(req.body);
      return res.send({
        message: "Product updated",
        data: product
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error updating product",
        error: error.message
      });
    }
  },

  delete: async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    try {
      const product = await Product.findByPk(productId);
      if (!product || product.userId !== userId) {
        return res.status(403).send({
          message: "You are not allowed to delete this product"
        });
      }

      await product.destroy();
      return res.send({
        message: "Product deleted"
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error deleting product",
        error: error.message
      });
    }
  }
};
