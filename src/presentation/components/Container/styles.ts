import { colors } from '@src/presentation/theme/colors'
import styled from 'styled-components'

export const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${colors.background}
`