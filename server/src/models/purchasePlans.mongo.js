const mongoose = require('mongoose');

const PurchasePlanSchema = new mongoose.Schema({
    planCreatedBy: {
      type: String,
      required: true,
    },
    estimatedPurchaseTime: {
      type: Date,
      required: true
    },
    estimatedArrivalTime: {
      type: Date,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    purchaseMethod: {
      type: String,
      enum: ['网购', '线下'],
      required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['审批中', '拒绝', '采购中', '完成']
    }
  }, { timestamps: true });

  const PurchasePlan = mongoose.model('PurchasePlan', PurchasePlanSchema);

  module.exports = PurchasePlan;