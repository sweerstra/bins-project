import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Label, Link } from '../../ui';
import { boxShadow, flexBetween } from '../../ui/mixins';
import { themeHoverSwitch } from '../../ui/theme';

const Wrapper = styled.div`
  form {
    position: relative;
  }
`;

const Suggestions = styled.ul`
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: ${p => p.show ? 'block' : 'none'};
  background-color: ${p => p.theme.color.white};
  border-radius: 0 0 .4rem .4rem;
  ${boxShadow};
`;

const Suggestion = styled.li`
  padding: 1rem;
  font-size: 1.2rem;

  &:hover {
    background-color: ${props => props.theme.color.tertiary};
    cursor: pointer;
  }
`;

export const LabelHeader = styled.span`
  ${flexBetween};
`;

const Presets = styled.span`
  color: ${p => p.theme.color.primary};
  font-weight: ${p => p.bold ? 'bold' : 'normal'};
  user-select: none;
  
  &:hover {
    color: ${p => themeHoverSwitch(p)};
    cursor: pointer;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  width: 100%;
  height: 4rem;
  ${flexBetween};
`;

const RemoveLinkSign = styled.span`
  font-size: 2.2rem;
  cursor: pointer;
  
  &:hover {
    color: ${p => p.theme.color.primary};
  }
`;

const Divider = styled.hr`
  border: 0;
	border-top: .1rem solid ${p => p.theme.color.tertiary};
	margin: 2rem 0 0 0;
`;

class Libraries extends Component {
  state = {
    url: '',
    suggestionsAreVisible: false,
    error: false
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  toggleSuggestions = (e) => {
    e.preventDefault();
    this.setState(state => ({ suggestionsAreVisible: !state.suggestionsAreVisible }));
  };

  addLibrary = (e) => {
    e.preventDefault();

    const { url } = this.state;
    const name = url.split('/').pop();

    if (url && name) {
      this.setState({ url: '', error: false });
      this.props.onAdd({ name, url });
    } else {
      this.setState({ error: true });
    }
  };

  addPresetLibrary = (library) => {
    this.setState({ suggestionsAreVisible: false });
    this.props.onAdd(library);
  };

  render() {
    const { url, suggestionsAreVisible, error } = this.state;
    const { libraries, presets, onRemove } = this.props;

    return (
      <Wrapper>
        <form onSubmit={this.addLibrary} autoComplete="off" spellCheck="false">
          <Label error={error}>
            <LabelHeader>
              {error ? 'This seems to be an invalid library 😞' : 'Add library URL'}
              <Presets onClick={this.toggleSuggestions}
                       color="primary"
                       bold={suggestionsAreVisible}>Presets</Presets>
            </LabelHeader>
            <Input name="url" value={url} onChange={this.onChange}/>
          </Label>

          <Suggestions show={suggestionsAreVisible}>
            {presets.map(library =>
              <Suggestion onClick={() => this.addPresetLibrary(library)} key={library.name}>
                {library.name}
              </Suggestion>
            )}
          </Suggestions>

          <Divider/>

          <List>
            {libraries.length > 0
              ? libraries.map(library =>
                <ListItem key={library.name}>
                  <Link href={library.url}>{library.name}</Link>
                  <RemoveLinkSign onClick={() => onRemove(library)}>&times;</RemoveLinkSign>
                </ListItem>)
              : <ListItem>
                No libraries were found. 📚
              </ListItem>}
          </List>
        </form>
      </Wrapper>
    );
  }
}

Libraries.propTypes = {
  libraries: PropTypes.arrayOf(PropTypes.object),
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
};

export default Libraries;
