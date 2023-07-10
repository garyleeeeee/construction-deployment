const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
    staffCode: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['施工员', '现场主管', '后勤主管', '项目经理', '出纳', '采购员', '员工', '仓管', '财务', '车辆主管', '资料主管', '资料员', '预算员', '预算主管', '人事主管', '程序员'],
    default: '员工',
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  salary: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: [
      '在职',
      '离职'
    ],
    default: '在职'
  }
},{timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
