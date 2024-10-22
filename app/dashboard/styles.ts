import { colors, fonts, sizes } from '@src/presentation/theme'
import styled from 'styled-components'

export const LoaderContainer = styled.div`
  width: 200px;
  height: 300px;
  background-color: ${colors.gray[300]};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
`
export const LoaderText = styled.span`
  font-family: ${fonts.body};
  color: ${colors.primary};
  font-size: ${sizes.text}
`