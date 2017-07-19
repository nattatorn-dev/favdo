import React from 'react'
import { Textarea } from 're-bulma'

const FormFieldTextArea = ({ input, type, placeholder }) =>
  <Textarea type={type} placeholder={placeholder} {...input} />

export default FormFieldTextArea
