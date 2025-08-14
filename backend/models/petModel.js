const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "Other"],
      required: true,
    },
    vaccinated: { type: Boolean, default: false },
    baseFee: { type: Number, min: 0, required: true },
    discountPercent: { type: Number, min: 0, max: 100, default: 0 },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

PetSchema.virtual("adoptionFeeFinal").get(function () {
  return Number(
    (this.baseFee - (this.baseFee * this.discountPercent) / 100).toFixed(2)
  );
});

const Pets = mongoose.model("Pets", PetSchema);
module.exports = Pets;
