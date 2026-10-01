const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, updateOrderStatus, getMyOrders, getVendorOrders, getOrders } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, addOrderItems)
  .get(protect, authorize('admin'), getOrders);

router.route('/myorders').get(protect, getMyOrders);
router.route('/vendororders').get(protect, authorize('vendor'), getVendorOrders);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, authorize('vendor', 'admin'), updateOrderStatus);

module.exports = router;
