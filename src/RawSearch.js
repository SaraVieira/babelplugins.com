import React, { Component } from 'react'
import styled from 'styled-components'
import search from './assets/search.svg'
import border from './assets/border.svg'

const Input = styled.input`
  width: 100%;
  height: 60px;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  font-weight: 500;
  line-height: normal;
  font-size: 18px;
  padding: 20px;
  padding-left: 55px;
  padding-right: 100px;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.7);

  ::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  ::-moz-placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  :-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`

const Wrapper = styled.div`
  position: relative;
  padding: 28px 21px;
  background-size: 100%;
  background-repeat: no-repeat;
  max-width: 100%;
  margin: auto;
  background-image: url(${border});
  margin-bottom: 20px;
`

const Search = styled.span`
  width: 22px;
  height: 22px;
  background-image: url(${search});
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 37px;
  opacity: 0.15;
`

class RawSearchBox extends Component {
  state = { value: '' }

  _onChange(value) {
    this.props.refine(value)
    this.setState({ value })
  }

  render() {
    return (
      <Wrapper>
        <Search />
        <Input
          placeholder="Type the plugin name"
          value={this.state.value}
          onChange={e => this._onChange(e.target.value)}
          type="text"
        />
        {this.props.children}
      </Wrapper>
    )
  }
}

export default RawSearchBox
