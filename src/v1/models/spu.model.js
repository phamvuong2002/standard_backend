"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Spu";
const COLLECTION_NAME = "Spus";

// Declare the Schema of the Mongo model
var spuSchema = new Schema(
  {
    spu_name: {
      type: String,
      required: true,
    },
    spu_thumbnail: { type: String, required: true },
    spu_description: { type: String, required: true },
    spu_slug: { type: String, required: true },
    spu_sort: { type: Number, required: true, default: 0 },
    spu_quantity: { type: Number, required: true },
    spu_type: { type: String, required: true },
    spu_brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    spu_attribute: { type: Schema.Types.Mixed, required: true },
    spu_ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be greater than 1.0"],
      max: [5, "Rating must be less than 5.0"],
    },
    spu_variation: {
      type: Array,
      default: [],
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
module.exports = model(DOCUMENT_NAME, spuSchema);
