import moongoose from 'mongoose';
import User from '../../models/user.js';

const controller = {};

controller.payment = async (request, response) => {
	var userId = request.body.userId;
	var amount = request.body.amount;
	var partnerCode = 'MOMO';
	var accessKey = 'F8BBA842ECF85';
	var secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
	var requestId = partnerCode + new Date().getTime();
	var orderId = requestId;
	var orderInfo = 'pay with MoMo';
	var redirectUrl = 'http://localhost:5000/customer/handlepayment';
	var ipnUrl = 'https://callback.url/notify';
	// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
	var requestType = 'captureWallet';
	var extraData = userId;
	amount = amount.toString();
	console.log(amount);

	var rawSignature =
		'accessKey=' +
		accessKey +
		'&amount=' +
		amount +
		'&extraData=' +
		extraData +
		'&ipnUrl=' +
		ipnUrl +
		'&orderId=' +
		orderId +
		'&orderInfo=' +
		orderInfo +
		'&partnerCode=' +
		partnerCode +
		'&redirectUrl=' +
		redirectUrl +
		'&requestId=' +
		requestId +
		'&requestType=' +
		requestType;
	//puts raw signature
	console.log('--------------------RAW SIGNATURE----------------');
	console.log(rawSignature);
	//signature
	var signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');
	console.log('--------------------SIGNATURE----------------');
	console.log(signature);

	//json object send to MoMo endpoint
	const requestBody = JSON.stringify({
		partnerCode: partnerCode,
		accessKey: accessKey,
		requestId: requestId,
		amount: amount,
		orderId: orderId,
		orderInfo: orderInfo,
		redirectUrl: redirectUrl,
		ipnUrl: ipnUrl,
		extraData: extraData,
		requestType: requestType,
		signature: signature,
		lang: 'en',
	});
	//Create the HTTPS objects
	const options = {
		hostname: 'test-payment.momo.vn',
		port: 443,
		path: '/v2/gateway/api/create',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(requestBody),
		},
	};
	//Send the request and get the response
	const req = https.request(options, (res) => {
		res.setEncoding('utf8');
		let body = '';
		res.on('data', (chunk) => {
			body += chunk;
		});
		res.on('end', () => {
			const paymentResponse = JSON.parse(body);
			console.log(paymentResponse);
			if (paymentResponse && paymentResponse.resultCode == 0) {
				// Payment was successful, send the payment URL
				response.json({ success: true, payUrl: paymentResponse.payUrl });
			} else {
				// Payment failed, respond with an error
				response.json({ error: 'Payment failed' });
			}
		});
	});
	// write data to request body
	console.log('Sending....');
	req.write(requestBody);
	req.end();
};

controller.handlePayment = async (req, res) => {
	console.log(req.query);
	if (req.query.resultCode == 0) {
		let userId = req.query.extraData;
		let user = await User.findById(userId);
		if (user) {
			user.cart.map(async courseId => {
				let course = await Course.findById(courseId);
				if (course) {
					user.courseList.push(courseId);
					await user.save();
					course.totalStudent += 1
					course.totalRevenue += course.price
					await course.save()
				} else {
					console.log('No course found!');
				}
			})
			user.cart = [];
		} else {
			console.log('No user found!');
		}

		res.redirect('http://localhost:3000/');
	} else {
		res.json({ success: false });
	}
};

export default controller;
