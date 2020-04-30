const Sequelize = require('sequelize');
const product = require('../models/product');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');

const uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.name.split('.')[1];
    doc.image = `${doc.id}.${fileExtention}`;
    var newpath = path.resolve('public/uploaded/' + doc.image);
    // console.log(newpath);
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    //update database
    let result = product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    );
    return result;
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await product.findOne({ where: { id: id } });
    res.json({
      message: 'ok',
      data: result,
    });
  } catch (err) {
    res.json({
      message: 'error',
      data: err,
    });
  }
};

exports.getProductByKeyword = async (req, res) => {
  const { keyword } = req.params;
  try {
    let result = await product.findAll({
      where: { name: { [Sequelize.Op.like]: `%${keyword}%` } },
    });
    res.json({
      message: 'ok',
      data: result,
    });
  } catch (err) {
    res.json({
      message: 'error',
      data: err,
    });
  }
};

exports.getProducts = async (req, res) => {
  let result = await product.findAll({ order: Sequelize.literal('id DESC') });
  res.json({ message: 'ok', products: result });
};

exports.addProduct = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      try {
        let result = await product.create(fields);
        result = await uploadImage(files, result);

        res.json({ message: 'ok' });
      } catch (err) {
        res.json({
          message: 'error',
          data: err,
        });
      }
    });
  } catch (err) {
    res.json({
      message: 'error',
      data: err,
    });
  }
};
//

exports.updateProduct = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      try {
        let result = await product.update(fields, { where: { id: fields.id } });
        result = await uploadImage(files, fields);

        res.json({ message: 'ok' });
      } catch (err) {
        res.json({
          message: 'error',
          data: err,
        });
      }
    });
  } catch (err) {
    res.json({
      message: 'error',
      data: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await product.findOne({ where: { id: id } });
    if (result) {
      await fs.remove(path.resolve('public/uploaded/' + result.image));
      result = await product.destroy({ where: { id: id } });
      res.json({
        message: 'ok',
        id,
      });
    } else {
      res.json({
        message: 'error',
        data: 'no data',
      });
    }
  } catch (err) {
    res.json({
      message: 'error',
      data: err,
    });
  }
};
