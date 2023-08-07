// Iteration #1

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
  ];
  
  const mongoose = require("mongoose");
  const Drone = require("../models/Drone.model");
  
  const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-drones";
  
  (async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log(`Connected to Mongo! Database name: "${mongoose.connection.name}"`);
  
      await Drone.create(drones);
      console.log("The data has been added to the DB");
  
      mongoose.connection.close();
    } catch (err) {
      console.error("Error connecting to Mongo or seeding the database: ", err);
    }
  })();
  