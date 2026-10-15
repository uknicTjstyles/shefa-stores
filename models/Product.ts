import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

export const CATEGORY_SLUGS = [
  "electronics",
  "fashion",
  "home-living",
  "beauty",
  "groceries",
  "sports",
  "toys",
] as const;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // selling price in naira
    compareAtPrice: { type: Number, min: 0 }, // old price, shown struck through
    category: {
      type: String,
      enum: CATEGORY_SLUGS,
      required: true,
      index: true,
    },
    brand: { type: String, trim: true, index: true },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, min: 0, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    badge: {
      type: String,
      enum: ["best-seller", "new", "hot", null],
      default: null,
    },
    featured: { type: Boolean, default: false },
    soldCount: { type: Number, default: 0 }, // drives the "Popularity" sort
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Computed on read, never stored: keeps it correct if prices change.
productSchema
  .virtual("discountPercent")
  .get(function (this: { price: number; compareAtPrice?: number | null }) {
    if (!this.compareAtPrice || this.compareAtPrice <= this.price) return 0;
    return Math.round(
      ((this.compareAtPrice - this.price) / this.compareAtPrice) * 100,
    );
  });

// Powers the search box.
productSchema.index({ name: "text", description: "text", brand: "text" });

export type ProductDoc = InferSchemaType<typeof productSchema>;

export const Product: Model<ProductDoc> =
  (models.Product as Model<ProductDoc> | undefined) ??
  model<ProductDoc>("Product", productSchema);
