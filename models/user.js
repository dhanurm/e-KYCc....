var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var db = mongoose.connection;

/* The User schema attributes/characteristics/fields will be created */
var UserSchema = new Schema({
	firstname: {
		type: String 
		},
	lastname: {
		type: String
	},
	mobile:{
		type:Number,
		unique:[true, 'Mobile number is already used!']
	},
	dob: {
		type: Date,
		required: [true, 'Date of Birth is required!']
	},
	aadhar: {
		type: Number,
		required: [true, 'AadharCard is required is required!'],
		unique: [true,'AadharCard is already used!']
	},
	pan : {
		type: String,
		uppercase: true,
		required: [true, 'PAN Card is required!'],
		unique:[true,'PAN Card is already used!']
	},
	place:{
		type: String
	},
	pincode:{
		type:Number
	},
	email: {
		type:String,
	 	unique: [true,'Email address already used!'], 
	 	lowercase:true
	 },
	 image:{
	 	type:String
	 },
	password: {type: String}
});

/* Hash the Password before saving to DB */
UserSchema.pre('save',function(next){
	var user = this;


	
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10,function(err, salt){
		if(err) return next(err);
		
		bcrypt.hash(user.password, salt, null, function(err,hash){
		
			if(err) return next(err);
			user.password = hash;	
			next();

		});
	});
});

/* Compare password in the DB and the One entered by user */

UserSchema.methods.comparePass = function(password){
	return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser,callback){
	newUser.save(callback);
}