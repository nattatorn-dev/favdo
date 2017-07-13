import styled from 'styled-components'

const url = fileName => `url(/static/${fileName}.svg)`

const LibraryCircle = styled.div`
  background-image: ${({ fileName }) => url(fileName)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  vertical-align: middle;
  height: ${({ size = '30px' }) => size};
  width: ${({ size = '30px' }) => size};
  margin: 0 12px 0 0;
`

export default LibraryCircle
