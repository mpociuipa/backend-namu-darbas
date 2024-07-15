const Service = require("../models/serviceModel");

//Routes function
exports.getAllServices = async (req, res) => {
  try {
    //filtering
    const queryObj = { ...req.query };
    const excludeFields = ["sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    //advanced filtering
    let queryStr = JSON.stringify(queryObj); //convert ti string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //add $ signt to operator
    console.log(JSON.parse(queryStr)); //console and parse string from query obj

    let query = Service.find(JSON.parse(queryStr));
    //sorting
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt'); //jei nebus nurodytas parametras bus pagal data
    }

    //Field limiting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' '); //jei nori matyti tik viesbucio varda ir adresa
        query = query.select(fields);
    }


    //execute query
    const services = await query; //filtering using mongo compare operators
    res.status(200).json({
      status: "success",
      results: services.length,
      data: {
        services,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        service: newService,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
};
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    status: "success",
    data: {
      service: null,
    },
  });
};
