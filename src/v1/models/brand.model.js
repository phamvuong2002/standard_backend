"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Brand";
const COLLECTION_NAME = "Brands";

// Declare the Schema of the Mongo model
var brandSchema = new Schema(
  {
    brand_name: {
      type: String,
      required: true,
      unique: true,
    },
    brand_images: { type: Array, required: true },
    brand_description: { type: String, required: true },
    brand_slug: { type: String, required: true },
    brand_type: { type: Array, required: true },
    brand_country: { type: String, required: true },
    brand_language_code: { type: String, required: true, default: "en" },
    brand_characters: {
      type: String,
      minLength: 4,
      maxLength: 24,
      default: "sku-group",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, brandSchema);
