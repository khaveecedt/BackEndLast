const mongoose =require("mongoose");

const klonSchema = new mongoose.Schema({
    username: String,
    klon: [
        {
            type: String,
        }
    ]
});

const klon = mongoose.model("klon", klonSchema);

module.exports= klon;