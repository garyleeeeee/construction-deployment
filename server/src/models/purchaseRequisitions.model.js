const PurchaseRequisition = require('./purchaseRequisitions.mongo');
const mongoose = require('mongoose');


// Get all purchaseRequisitions
async function getAllPurchaseRequisitions () {
    return await PurchaseRequisition.find();
};

// Identify the next approver role
async function identifyNextApproverRole(prID) {
    try {
        const currentRequisition = await PurchaseRequisition.findById(prID);

        if (!currentRequisition) {
            return
        };

        let nextRole;
        switch(currentRequisition.nextApproverRole) {
            case '施工员':
                nextRole = '现场主管';
                break
            case '现场主管':
                nextRole = '采购员';
                break
            case '后勤主管':
                nextRole = '采购员';
                break
            case '采购员':
                nextRole = '实习生小李';
                break
            case '实习生小李':
                nextRole = '项目经理';
                break
            case '项目经理':
                nextRole = '无';
                break
            default:
                nextRole = '无';
        }
        return nextRole;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

// Add a new purchase requisition
async function addNewPurchaseRequisition (purchaseFor,
    productList,
    buyingReason,
    expectedTime,
    additionalNotes,
    requestedBy) {
    try {
        let nextApproverRole;
        switch (purchaseFor) {
            case '施工现场':
                nextApproverRole = '施工员';
                break;
            default: 
                nextApproverRole = '后勤主管';
        }

        const newPurchaseRequisition = new PurchaseRequisition({
            purchaseFor,
            productList,
            buyingReason,
            expectedTime,
            additionalNotes,
            requestedBy,
            nextApproverRole,
            status: '审批中',
            comments: [],
        });

        const savedPurchaseRequisition = await newPurchaseRequisition.save();
        return savedPurchaseRequisition;

    } catch (error) {
        console.error(error); // log the error
        throw error; // throw the error so it can be caught by the caller
    }
};



module.exports = {
    getAllPurchaseRequisitions,
    identifyNextApproverRole,
    addNewPurchaseRequisition
}