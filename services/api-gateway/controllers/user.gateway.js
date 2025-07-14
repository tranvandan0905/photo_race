const axios = require('axios');
const FormData = require('form-data');
const getUser = async (req, res,next) => {
  try {

    const { check } = req.query;
    const response = await axios.get('http://user-service:3003/api/user', {
      params: { check },
    });
    return res.status(200).json(response.data);
  } catch (error) {
   next(error)
  }
};

const findUser = async (req, res,next) => {
  try {
    const { email } = req.query;
    const response = await axios.get("http://user-service:3003/api/user/find", {
      params: { email }
    });
    return res.status(200).json(response.data);
  } catch (err) {
     next(err)
  }
};

const findNameUser = async (req, res,next) => {
  try {
    const { name } = req.query;
    const response = await axios.get("http://user-service:3003/api/user/find/name", {
      params: { name }
    });
    return res.status(200).json(response.data);
  } catch (err) {
  next(err);
  }
};
const deleteUser = async (req, res,next) => {
  try {
   const user_id = req.user.id;
   const data= await axios.delete(`http://user-service:3003/api/user/${user_id}`);
    return res.status(200).json(data.data);
  } catch (err) {
   next(err);

  }
};

const updateUser = async (req, res,next) => {
  try {
    const user_id = req.user.id;
    const data = req.body;
    const result = await axios.put(`http://user-service:3003/api/user/${user_id}`, data);
    return res.status(200).json(result.data);
  } catch (err) {
   next(err);
  }
};

const findUserById = async (req, res,next) => {
  try {
    const user_id = req.query.id || req.user.id;
    const result = await axios.get(`http://user-service:3003/api/user/findID/${user_id}`);
    return res.status(200).json(result.data);
  } catch (err) {
    next(err);
  }
};
const updateAvataUser = async (req, res,next) => {
  try {
    const user_id = req.user.id;
    const image = req.file;
    const form = new FormData();
    form.append("file", image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype
    });
    const uploadRes = await axios.post(
      'http://media-service:5000/api/media/upload',
      form,
      { headers: form.getHeaders() }
    );

    const imageUrl = uploadRes.data?.data?.secure_url;

    if (!imageUrl) {
      return res.status(500).json({ message: "Lấy đường dẫn ảnh thất bại!" });
    }
    const updateRes = await axios.put(
      `http://user-service:3003/api/user/${user_id}`,
      { imageUrl }
    );

    return res.status(200).json(updateRes.data
    );

  } catch (error) {
     next(error);
  }
};
const patchVoteXu = async (req, res,next) => {
  try {
    const user_id = req.params.id;
    const result = await axios.patch(`http://user-service:3003/api/user/vote/${user_id}`);
    return res.status(200).json(result.data);
  } catch (err) {
     next(err);
  }
};

const postUser = async (req, res,next) => {
  try {
    const { email, name, password } = req.body;
    const user = await axios.post(`http://user-service:3003/api/user`, { email, name, password });
    return res.status(200).json(user.data);
  } catch (err) {
     next(err);
  }
};
const resetpassword = async (req,res,next) => {
  try {
    const { email} = req.body;
    const user = await axios.post(`http://user-service:3003/api/user/email-password`, { email});
    return res.status(200).json(user.data);
  } catch (err) {
    next(err);
  }
};
const verifyForgotPassword = async (req, res,next) => {
  try {
    const { token,pasword,email } = req.body;
    const user = await axios.post(`http://user-service:3003/api/user/verify-password`, { token,pasword,email});
    return res.status(200).json(user.data);
  } catch (err) {
      next(err);
  }
};
module.exports = {
  getUser,
  findUser,
  deleteUser,
  updateUser,
  findUserById,
  patchVoteXu,
  postUser,
  findNameUser,
  updateAvataUser,
  resetpassword,
  verifyForgotPassword
};
