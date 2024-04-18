import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	name: { type: String, require: true },
	id: { type: String, require: true },
	subCategories: { type: Array },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
