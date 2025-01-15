import joi from 'joi'

const create = {
  body: joi.object().keys({
    accno: joi.string().required(),
    amount: joi.number().required(),
    currency: joi.string().required().min(3).valid('USD','INR','GBP','AUD'),
    withdrawFrom: joi.string().required().valid('office'),
    notes: joi.object().optional()
  }),
}
export default { create }
