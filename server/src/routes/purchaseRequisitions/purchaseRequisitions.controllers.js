const {
    addNewPurchaseRequisition
} = require('../../models/purchaseRequisitions.model');


// Create a new purchase requisition
async function httpCreatePurchaseRequisition(req, res) {
    try {
        const {
            purchaseFor,
            productList,
            buyingReason,
            expectedTime,
            additionalNotes,
            requestedBy,
        } = req.body;

        const savedPurchaseRequisition = await addNewPurchaseRequisition(   purchaseFor,
            productList,
            buyingReason,
            expectedTime,
            additionalNotes,
            requestedBy
            );
        // If the purchase requisition could not be saved, return an error
        if (!savedPurchaseRequisition) {
            return res.status(400).json({ error: 'Failed to save new purchase requisition' });
        }
        // If everything went well, return the saved user
        return res.status(200).json(savedPurchaseRequisition);
    } catch(error){
        // If there's an error, return a message with the error
        return res.status(400).json({ error: error.message });
    }
};


// Update purchase requisition status
async function httpUpdateApprovalStatus(req, res) {
    try {

    } catch (error) {
        // If there's an error, return a message with the error
        return res.status(400).json({ error: error.message });
    }
};


module.exports = {
    httpCreatePurchaseRequisition,
    httpUpdateApprovalStatus
}