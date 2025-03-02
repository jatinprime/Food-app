//GET USER INFO

const getUserController = async (req , res) => {
    res.status(200).send({
        success : true,
        message : "User data file"
    })
}

module.exports = {getUserController} ;