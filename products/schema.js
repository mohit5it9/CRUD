'use strict';

var productSchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
  quantity: { type: Number, required: true },
  expiry: {type: Date, required: true}
});

productSchema.set('toJSON', {
  getters: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = productSchema;

