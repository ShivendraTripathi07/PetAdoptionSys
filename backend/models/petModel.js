const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "cow", "Other"],
      required: true,
    },
    images: [],
    vaccinated: { type: Boolean, default: false },
    baseFee: { type: Number, min: 0, required: true },
    discountPercent: { type: Number, min: 0, max: 100, default: 0 },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

PetSchema.virtual("adoptionFeeFinal").get(function () {
  return Number(
    (this.baseFee - (this.baseFee * this.discountPercent) / 100).toFixed(2)
  );
});

PetSchema.set("toJSON", { virtuals: true });
PetSchema.set("toObject", { virtuals: true });

const Pets = mongoose.model("Pets", PetSchema);
module.exports = Pets;
