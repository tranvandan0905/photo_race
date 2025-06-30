const Advertiser = require("../models/advertisers.model");

const handecreateAdvertiser = async (data) => {
  const { name, email, phone, company_name, website } = data;
  return await Advertiser.create({ name, email, phone, company_name, website });
};
const handeDeleteAdvertiser = async (_id) => {
    if (!_id) {
        throw new Error("Thiếu ID!");
    }
    const result = await Advertiser.findByIdAndDelete(_id);
    if (!result) throw new Error("ID không tồn tại!");
    return result;
}
const handeGetAdvertiser = async () => {
    const data = await Advertiser.find({});
    if (!data) {
        throw new Error("Không có chủ đề nào!");
    }
    return data;
};
module.exports = { handecreateAdvertiser, handeDeleteAdvertiser,handeGetAdvertiser};
