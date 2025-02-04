import * as yup from 'yup'

const create = yup
  .object()
  .shape({
    name: yup.string().required('Nama wajib diisi'),
  })
  .required()

const countrySchema = {
  create,
}

export default countrySchema
