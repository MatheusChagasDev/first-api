const app = require("./app");
const mongoose = require("mongoose");
const PORT = 3020;

const MONGO_URI = "mongodb://mongo/pokemon";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("Error: ", err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});