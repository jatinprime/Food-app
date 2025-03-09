//CREATE FOOD
const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Food API Create",
            error,
        });
    }
};

module.exports = { createFoodController };
