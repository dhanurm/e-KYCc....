var router = require('express').Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
var User = require('../models/user');
var flash = require('express-flash');
var session = require('express-session');

var user = new User();

router.get('/signup1',function(req,res,next){
	res.render('accounts/signup1', {
	
		errors: req.flash('errors')
	});
});

router.get('/signup2',function(req,res,next){
	res.render('accounts/signup2', {
	
		errors: req.flash('errors')
	});
});

router.get('/confirmpage',function(req,res,next){
	res.render('accounts/confirmpage', {
		
		errors: req.flash('errors')
	});
});

router.get('/login',function(req,res,next){
	res.render('accounts/login', {
	
		errors: req.flash('errors')
	});
});

router.post('/signup1',function(req,res,next){
	
	var dob = req.body.dob;
	var aadhar = req.body.aadhar;
	var pan = req.body.pan;

	// Form Validation
	req.checkBody('aadhar','Aadhar Card number required!').notEmpty().isInt().len(10);
	req.checkBody('pan','Pan Card number required!').notEmpty().len(10);
	req.checkBody('dob','Date of Birth cannot be empty!').notEmpty().isDate({ format: 'YYYY-MM-DD' });

	// Check for Errors

	var errors = req.validationErrors();

	if(errors){
		res.render('accounts/signup1',{
			
			errors: errors
		})
	} else{

		user.aadhar=aadhar,
		user.pan=pan,
		user.dob=dob;

		// Create USer
		User.createUser(user,function(err,user){
			if(err) throw err;
			console.log(user);
		});

		// Success Message
		req.flash('success','You are not registered and may login!!');
		res.location('/signup2');
		res.redirect('/signup2');
	}

});


router.post('/signup2',function(req,res,next){

	
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var mobile = req.body.mobile;
	//var email = req.body.email;
	var place = req.body.place;
	var pincode = req.body.pincode;
//	var password = req.body.password;
//	var password2 = req.body.password2;


	// Validation
	req.checkBody('firstname','First name is required!').notEmpty().isAlpha();
	req.checkBody('lastname','Last name is required!').notEmpty().isAlpha();
	req.checkBody('mobile','Current Mobile number is required!').notEmpty().isInt().len(10);
//	req.checkBody('email','Email not valid!').notEmpty().isEmail();
	req.checkBody('place','Place should not be empty or left numeric').notEmpty().isAlpha();
	req.checkBody('pincode','Pincode should be non-empty, numeric and 6 digits in length!').notEmpty().isInt().len(6);
//	req.checkBody('password','Password is required!').notEmpty().len(8,20);
//	req.checkBody('password2','Passwords do not match').equals(req.body.password);

	// Check for Errors

	var errors = req.validationErrors();

	if(errors){
		res.render('accounts/signup2',{
			title:'ejs',
			errors: errors
		})
	} else{
		user.firstname=firstname,
		user.lastname=lastname,
		user.mobile=mobile,
//		user.email=email,
		user.place=place,
		user.pincode=pincode;
		//user.password=password;


		// Update USer
		User.createUser(user,function(err,user){
			if(err) throw err;
			console.log(user);
		});

		// Success Message
		req.flash('success','You are now registered and may login!!');
		res.location('/webcampass');
		res.redirect('/webcampass');
	}
});


router.get('/webcampass',function(req,res,next){
	res.render('webcam');
})
router.post('/webcampass',function(req,res,next){

})

module.exports = router;