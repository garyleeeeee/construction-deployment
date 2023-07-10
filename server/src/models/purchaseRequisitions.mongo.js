const mongoose = require('mongoose');

const PurchaseRequisitionSchema = new mongoose.Schema({
    purchaseFor: {
      type: String,
      enum: ['施工现场', '项目部'],
      required: true
    },
    productList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PrePurchaseProduct',
      required: true
    }],
    buyingReason: {
      type: String,
      required: true
    },
    expectedTime: {
      type: Date,
      required: true
    },
    additionalNotes: {
      type: String
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    approvedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    nextApproverRole: {
      type: String,
      enum:['施工员', '现场主管', '采购员', '后勤主管', '实习生小李', '项目经理'],
      required: true
    },
    status: {
      type: String,
      enum: ['审批中', '等待采购计划', '拒绝', '同意', '完成'],
      default: '审批中'
    },
    comments: [{
      type: String
    }],
    purchasePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PurchasePlan',
    },
  });

  
const PurchaseRequisition = mongoose.model('PurchaseRequisition', PurchaseRequisitionSchema);


module.exports = PurchaseRequisition;