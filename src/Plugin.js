import React, { Fragment } from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'
import is from 'styled-is'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Flex, { FlexItem } from 'styled-flex-component'
import { Margin } from 'styled-components-spacing'
import NPM from './assets/npm.svg'
import Github from './assets/github.svg'
import Copy from './assets/copy.svg'
import Down from './assets/Down.svg'

const StyledPlugin = styled.article`
  display: block;
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.06);
  padding: 0 17px;
`

const Name = styled.h4`
  font-weight: 600;
  line-height: normal;
  font-size: 20px;
  letter-spacing: -0.01em;
  color: #876900;
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`

const Subtitle = styled.span`
  font-size: 13px;
  letter-spacing: -0.01em;
  font-weight: normal;
  color: #e0e0e0;
  text-decoration: none;
`

const By = styled.span`
  font-size: 15px;
  letter-spacing: -0.01em;

  color: rgba(79, 79, 79, 0.43);
`

const Paragraph = styled.p`
  font-size: 14px;
  color: #828282;
`

const Version = Paragraph.extend`
  background: #f2f2f2;
  color: #bdbdbd;
  border-radius: 3px;
  padding: 4px 3px;
`

const Downloads = Version.extend`
  background: #83ff78;
`

const Content = styled.div`
  padding: 17px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
`

const Input = styled.input`
  background: #fdfdfd;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  font-weight: 500;
  line-height: normal;
  font-size: 13px;
  padding: 8px;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.3);
  width: 100%;
  padding-right: 25px;
`

const Button = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  margin-left: -27px;
  top: 50%;
  display: inline-flex;
  align-items: center;
  transform: translateY(-50%);
  margin-top: 2px;
`

const Arrow = styled.img`
  height: 25px;
  transition: transform 200ms ease-out;
  opacity: 0.7;
  transform-origin: 50% 40%;
  cursor: pointer;

  ${is('reverse')`
      transform: rotate(180deg)
  `};
`

const Plugin = ({ hit, open, handleOpen }) => (
  <StyledPlugin>
    <Flex alignCenter justifyBetween>
      <Name>
        {hit.name
          .split('babel-plugin-')
          .join('')
          .split('@babel/plugin-')
          .join('')}
        <Subtitle>{hit.name}</Subtitle>
      </Name>
      <Version>{hit.version}</Version>
      <a href={hit.owner.link} target="_blank" rel="noopener noreferrer">
        <By>by @{hit.owner.name}</By>
      </a>
      <a
        href={`https://www.npmjs.com/package/${hit.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={NPM} height="12" alt="Npm logo" />
      </a>

      <a
        href={(hit.repository || {}).url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Github} height="13" alt="Github logo" />
      </a>
      <Arrow reverse={open} onClick={() => handleOpen(!open)} src={Down} />
    </Flex>
    {open ? (
      <Content>
        <Margin bottom={2}>
          <Paragraph>Install</Paragraph>
        </Margin>
        <Flex justifyBetween alignCenter>
          <FlexItem
            grow
            noShrink
            style={{ flexGrow: 1, marginRight: 20, position: 'relative' }}
          >
            <Input value={`yarn add ${hit.name} --dev`} disabled />
            <CopyToClipboard
              text={`yarn add ${hit.name} --dev`}
              // onCopy={() => this.setState({ copied: true })}
            >
              <Button>
                <img src={Copy} height="16" />
              </Button>
            </CopyToClipboard>
          </FlexItem>
          <FlexItem grow noShrink style={{ flexGrow: 1, position: 'relative' }}>
            <Input value={`npm i ${hit.name} --save-dev`} disabled />
            <CopyToClipboard
              text={`npm i ${hit.name} --save-dev`}
              // onCopy={() => this.setState({ copied: true })}
            >
              <Button>
                <img src={Copy} height="16" />
              </Button>
            </CopyToClipboard>
          </FlexItem>
        </Flex>
        <Margin top={3}>
          <Paragraph>{hit.description}</Paragraph>
        </Margin>
      </Content>
    ) : null}
  </StyledPlugin>
)

const enhance = withState('open', 'handleOpen', false)
export default enhance(Plugin)
