"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Sku";
const COLLECTION_NAME = "Skus";

// Declare the Schema of the Mongo model
var skuSchema = new Schema(
  {
    sku_id: {
      type: String,
      required: true,
      unique: true,
    }, // string "spu + {brand's characters} + brand id"
    sku_tier_idx: { type: Array, default: [0], required: true },
    sku_default: { type: Boolean, required: true, default: false },
    sku_slug: { type: String, required: true },
    sku_sort: { Type: Number, required: true, default: 0 },
    sku_stock_id: { type: String, required: true },
    sku_spu_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Spu",
    },
    isDraft: {
      type: Boolean,
      default: false,
      index: true,
      selected: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      selected: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, skuSchema);
