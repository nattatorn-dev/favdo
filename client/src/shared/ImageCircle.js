import styled from 'styled-components'

const ImageCircle = styled.img`
  width: ${({ size = '16px' }) => size};
  height: : ${({ size = '16px' }) => size};
  border-radius: ${({ radius = '50%' }) => radius};
  src: ${({ url }) => url};
`

export default ImageCircle
