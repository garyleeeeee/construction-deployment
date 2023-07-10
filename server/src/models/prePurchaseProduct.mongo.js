const PrePurchaseProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unitName: {
      type: String,
      required: true
    },
  });
  
  const PrePurchaseProduct = mongoose.model('PrePurchaseProduct', PrePurchaseProductSchema);

  module.exports = PrePurchaseProduct;