import joi from 'joi'

const register = {
  body: joi.object().keys({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    newPassword: joi.string().required().min(8),
    confirmNewPassword: joi.string().min(8).required(),
  }),
}
const login = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
}
const setPassword = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
    verificationCode: joi.string().required(),
  }),
}
const forgetPassword = {
  body: joi.object().keys({
    email: joi.string().email().required(),
  }),
}
const changePassword = {
  body: joi.object().keys({
    newPassword: joi.string().required(),
    confirmNewPassword: joi.string().required(),
    token: joi.string().required(),
  }),
}
export default { register, login, setPassword, forgetPassword, changePassword }
