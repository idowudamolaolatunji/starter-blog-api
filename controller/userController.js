
const sharp = require('sharp');
const User = require('../model/userModel.js');

exports.updateProfile = async function (req, res) {
	try {
		const user = await User.findByIdAndUpdate(req.user.id , {
            fullname: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        }, { 
            runValidators: true, 
            new: true 
        });

		res.status(200).json({
			status: "success",
			message: "Profile Updated!!",
			data: {
				user,
			},
		});

	} catch(err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.uploadImage = async function (req, res){
    try{

        console.log(req.file)
        if(!req.file){
            return res.json({message:'No image was uploaded'})
        }

        const user = await User.findById(req.user._id);
        const usersName = user.fullname.split('').join('-').toLowerCase();
        const imageName = `${usersName}-image-${Date.now()}.jpeg`

        await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({qualify:80}).toFile(`public/assets/${imageName}`);

        //const updateUser = await User.findByIdAndUpdate(user._id)
        user.image = imageName;
        await user.save({validateBeforeSave: false});

        res.status(200).json({
            status:'success',
            message:'Image uploaded successfully',
            data:{
                user
            }
        })

    }catch(err){
        res.status(400).json({
            status:'fail',
            message: err.message
        })
    }
}