import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  name: { type: String, required: true },
  photoUrl: String,
  calories: Number,
  nutrients: {
    proteins: Number,
    carbs: Number,
    fats: Number,
  },
  date: { type: Date, default: Date.now },
  score: { type: Number, min: 0, max: 100 },
});

export const Meal = mongoose.models.Meal || mongoose.model('Meal', mealSchema);