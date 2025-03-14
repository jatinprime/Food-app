const mongoose = require("mongoose");

//schema
const ordersSchema = new mongoose.Schema(
    {
        //MAKING ARRAY FOR FOODS , AS MULTIPLE ITEMS CAN BE THERE 
        foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            //ONLY SOME VALUES ARE POSSIBLE
            enum: ["preparing", "prepare", "on the way", "deliverd"],
            default: "preparing",
        },
    },
    { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", ordersSchema);
