const express = require('express');
const router = express.Router();
const {
    httpCreatePurchaseRequisition,
    httpUpdateApprovalStatus
} = require('./purchaseRequisitions.controllers')


// Create a purchase requisition
router.post('/request', async (req, res) => {

    return httpCreatePurchaseRequisition(req, res);
});

// Send an approval
router.put('/approval', async (req, res) => {

    return httpUpdateApprovalStatus(req, res);
})




module.exports = router;