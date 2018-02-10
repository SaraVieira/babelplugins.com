import React, { Component } from 'react'
import logo from './assets/logo.svg'
import gh from './assets/gh.svg'
import start from './assets/start.svg'
import side from './assets/side.svg'
import styled from 'styled-components'
import RawSearchBox from './RawSearch'
import Plugin from './Plugin'
import {
  Hits,
  Configure,
  InstantSearch
} from 'react-instantsearch/dom'
import { connectSearchBox } from 'react-instantsearch/connectors'

const config = {
  apiKey: '1f0cc4b7da241f62651b85531d788fbd',
  appId: 'OFCNCOG2CU',
  indexName: 'npm-search'
}

const Logo = styled.img`
  width: 235px;
`

const Page = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 960px;
  max-width: 80%;
  margin: auto;
`

const Open = styled.span`
  font-size: 14px;
  letter-spacing: -0.01em;

  color: rgba(0, 0, 0, 0.47);
  transform: rotate(-6deg);
  display: flex;
  align-items: center;
`

const Github = styled.img`
  width: 13px;
  height: 13px;
  margin-left: 5px;
`

const Start = styled.img`
  position: absolute;
  margin-left: -20px;
  margin-top: 120px;
  transform: translateX(-100%);
`

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`

const Checkbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + label + span {
    background: #8be20c;
  }

  &:checked + label + span:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`

const Label = styled.span`
  cursor: pointer;
  width: 43px;
  height: 20px;
  background: #e5e5e5;
  display: block;
  border-radius: 10px;
  position: relative;
  margin-top: 4px;

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 23px;
    height: 16px;

    background: linear-gradient(2.86deg, #f5f5f5 -40.85%, #ffffff 76.06%);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.22);
    border-radius: 8px;
    transition: all 0.3s ease-out;
  }
`

const CheckboxWrapper = styled.label`
  position: absolute;
  font-weight: 600;
  line-height: normal;
  font-size: 13px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  right: 35px;
  top: 47px;
  transform: translateY(-50%);
  color: #bdbdbd;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
`

const Main = styled.main`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  width: 100%;
`

const Padding = styled.div`
  padding: 0 24px;
  background-size: 100%;
  background-repeat: repeat-y;
  max-width: 100%;
  background-image: url(${side});
  margin-bottom: 40px;
`

class Home extends Component {
  state = {
    official: false
  }

  _onShowOfficialPluginsChanged = e => {
    this.setState({ official: !this.state.official })
  }

  render() {
    const SearchBox = connectSearchBox(RawSearchBox)
    const { official } = this.state

    return (
      <Page>
        <LogoWrapper>
          <Start src={start} alt="start here" />
          <Logo src={logo} alt="Babel Plugins Logo" />
          <Open>
            It's Open Source{' '}
            <a
              href="https://github.com/saraVieira/babelplugins.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github src={gh} alt="go to github" />
            </a>
          </Open>
        </LogoWrapper>
        <Main>
          <InstantSearch
            apiKey={config.apiKey}
            appId={config.appId}
            indexName={config.indexName}
          >
            <Configure
              hitsPerPage={500}
              // attributesToRetrieve={[
              // 	'name',
              // 	'version',
              // 	'description',
              // 	'repository',
              // ]}
              attributesToHighlight={['name', 'description']}
              filters={`keywords:babel-plugin ${
                official ? 'AND owner.name:babel' : ''
              }`}
            />

            <div>
              <SearchBox>
                <CheckboxWrapper>
                  <Checkbox
                    checked={official}
                    onChange={e => {
                      this._onShowOfficialPluginsChanged(e)
                    }}
                    type="checkbox"
                  />
                  <label>Official ?</label>
                  <Label />
                </CheckboxWrapper>
              </SearchBox>
              <Padding>
                <Hits hitComponent={Plugin} />
              </Padding>
            </div>
            {/* {pluginsLoading ? (
								'Loading'
							) : (
								<div>
									{hasPlugins && !plugins.length
										? 'There are no plugins that match your query'
										: null}
								</div>
							)} */}
          </InstantSearch>
        </Main>
      </Page>
    )
  }
}

export default Home
