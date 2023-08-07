const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model")

// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const allDrones = await Drone.find()
    console.log(allDrones)
    res.render("drones/list.hbs", {
      allDrones: allDrones
    })
  } catch (error) {
    next (error)
  }
  
});

router.get('/drones/create', (req, res, next) => {
 
  res.render("drones/create-form")
  
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body
  console.log(req.body)
  
  try {
    await Drone.create({
      name,
      propellers,
      maxSpeed
    })


    res.redirect("/drones")
    console.log(req.body)
    
  } catch (error) {
    next(error)
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  const {id} = req.params
  try {
    const drone = await Drone.findById(id)
    res.render("drones/update-form.hbs", drone)
  } catch (error) {
    next(error)
  }

});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  const {id} = req.params
  const { name, propellers, maxSpeed } = req.body

  try {
    await Drone.findByIdAndUpdate(id, {
      name: name,
      propellers: propellers,
      maxSpeed: maxSpeed
    })

    res.redirect("/drones")

  } catch (error) {
    res.redirect("/drones")
  }
  
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  const {id} = req.params

  try {
   await Drone.findByIdAndDelete(id)
   res.redirect("/drones")

  }
  catch (error) {
    res.redirect("/drones")
  }

});

module.exports = router;
