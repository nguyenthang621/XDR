import * as yup from 'yup'

export const schemaRegister = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không đúng định dạng')
      .min(5, 'Độ dài từ 6-130 ký tự')
      .max(160, 'Độ dài từ 6-130 ký tự'),

    fullName: yup
      .string()
      .required('Tên là bắt buộc')
      .min(3, 'Độ dài từ 6-130 ký tự')
      .max(160, 'Độ dài từ 6-130 ký tự'),

    password: yup
      .string()
      .required('Mật khẩu là bắt buộc')
      .min(5, 'Độ dài từ 6-130 ký tự')
      .max(160, 'Độ dài từ 6-130 ký tự'),

    password_confirm: yup
      .string()
      .required('Mật khẩu là bắt buộc')
      .min(5, 'Độ dài từ 6-130 ký tự')
      .max(160, 'Độ dài từ 6-130 ký tự')
      .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
  })
  .required()

export const schemaLogin = schemaRegister.omit(['password_confirm', 'fullName'])
