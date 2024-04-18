import mongoose from 'mongoose';
import Category from '../models/category.js';
import dotenv from 'dotenv';
dotenv.config();

const categories = [
	'Development',
	'Business',
	'Finance & Accounting',
	'IT & Software',
	'Office Productivity',
	'Personal Development',
	'Design',
	'Marketing',
	'Health & Fitness',
	'Music',
];

const ids = [
	'development',
	'business',
	'finance-and-accounting',
	'it-and-software',
	'office-productivity',
	'personal-development',
	'design',
	'marketing',
	'health-and-fitness',
	'music',
];

const subCategories = [
	[
		'Web Development',
		'Data Science',
		'Mobile Development',
		'Programming Languages',
		'Game Development',
		'Database Design & Development',
		'Software Testing',
		'Software Engineering',
		'Software Development Tools',
		'No-Code Development',
	],
	[
		'Entrepreneurship',
		'Communication',
		'Management',
		'Sales',
		'Business Strategy',
		'Operations',
		'Project Management',
		'Business Law',
		'Business Analytics & Intelligence',
		'Human Resources',
		'Industry',
		'E-Commerce',
		'Media',
		'Real Estate',
		'Other Business',
	],
	[
		'Accounting & Bookkeeping',
		'Compliance',
		'Cryptocurrency & Blockchain',
		'Economics',
		'Finance',
		'Finance Cert & Exam Prep',
		'Financial Modeling & Analysis',
		'Investing & Trading',
		'Money Management Tools',
		'Taxes',
		'Other Finance & Accounting',
	],
	['IT certifications', 'Network & Security', 'Hardware', 'Operating Systems & Servers', 'Other IT & Software'],
	['Microsoft', 'Apple', 'Google', 'SAP', 'Oracle', 'Other Office Productivity'],
	[
		'Personal Transformation',
		'Productivity',
		'Leadership',
		'Personal Finance',
		'Career Development',
		'Parenting & Relationships',
		'Happiness',
		'Religion & Spirituality',
		'Personal Brand Building',
		'Creativity',
		'Influence',
		'Self Esteem',
		'Stress Management',
		'Memory & Study Skills',
		'Motivation',
		'Other Personal Development',
	],
	[
		'Web Design',
		'Graphic Design & Illustration',
		'Design Tools',
		'User Experience',
		'Game Design',
		'Design Thinking',
		'3D & Animation',
		'Fashion',
		'Architectural Design',
		'Interior Design',
		'Other Design',
	],
	[
		'Digital Marketing',
		'Search Engine Optimization',
		'Social Media Marketing',
		'Branding',
		'Marketing Fundamentals',
		'Analytics & Automation',
		'Public Relations',
		'Advertising',
		'Video & Mobile Marketing',
		'Content Marketing',
		'Growth Hacking',
		'Affiliate Marketing',
		'Product Marketing',
		'Other Marketing',
	],
	[
		'Fitness',
		'General Health',
		'Sports',
		'Nutrition',
		'Yoga',
		'Mental Health',
		'Dieting',
		'Self Defense',
		'Safety & First Aid',
		'Dance',
		'Meditation',
		'Other Health & Fitness',
	],
	['Instruments', 'Production', 'Music Fundamentals', 'Vocal', 'Music Techniques', 'Music Software', 'Other Music'],
	[
		'Engineering',
		'Humanities',
		'Math',
		'Science',
		'Online Education',
		'Social Science',
		'Language Learning',
		'Teacher Training',
		'Test Prep',
		'Other Teaching & Academics',
	],
];

const mongoURI = process.env.MONGODB_URI;

try {
	await mongoose.connect(mongoURI);
	console.log('Connected to the database');
} catch (error) {
	console.log('Could not connect to the database', error);
}

// const categoryData = categories.map((category, index) => {
// 	return {
// 		name: category,
// 		id: ids[index],
// 		subCategories: subCategories[index],
// 	};
// });

// await Category.deleteMany({})
//     .then(() => console.log('Data deleted'))
//     .catch((error) => console.log(error));

// Category.insertMany(categoryData)
// 	.then(() => console.log('Data inserted'))
// 	.catch((error) => console.log(error));
