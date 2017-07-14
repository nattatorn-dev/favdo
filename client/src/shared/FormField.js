import React from 'react'
import { Input } from 're-bulma'

const FormField = ({
  input,
  input: { name },
  type,
  placeholder,
  meta: { touched, error }
}) => {
  const config =
    touched && error
      ? {
          color: 'isDanger',
          text: `This ${name} is invalid`,
          image: 'fa fa-warning'
        }
      : {
          image: 'fa fa-check'
        }

  return (
    <Input
      color={config.color}
      type={type}
      placeholder={placeholder}
      icon={config.image}
      hasIconRight
      help={{ color: config.color, text: config.text }}
      {...input}
    />
  )
}

export default FormField
