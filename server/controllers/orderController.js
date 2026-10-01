const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
      });

      const createdOrder = await order.save();

      // Reduce stock for each product
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock -= item.qty;
          await product.save();
        }
      }

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // Check if user is admin, the customer who placed the order, or a vendor involved in the order
      let isAuthorized = false;
      if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
        isAuthorized = true;
      } else if (req.user.role === 'vendor') {
        const vendorIsIncluded = order.orderItems.some(item => item.vendor.toString() === req.user._id.toString());
        if (vendorIsIncluded) isAuthorized = true;
      }

      if (isAuthorized) {
        res.json(order);
      } else {
        res.status(403).json({ message: 'Not authorized to view this order' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Vendor/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      let isAuthorized = false;
      if (req.user.role === 'admin') {
        isAuthorized = true;
      } else if (req.user.role === 'vendor') {
        const vendorIsIncluded = order.orderItems.some(item => item.vendor.toString() === req.user._id.toString());
        if (vendorIsIncluded) isAuthorized = true;
      }

      if (isAuthorized) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(403).json({ message: 'Not authorized to update this order' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor's orders
// @route   GET /api/orders/vendororders
// @access  Private/Vendor
const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'orderItems.vendor': req.user._id }).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getVendorOrders,
  getOrders
};
