import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/form';
import { Input, Label, Link } from '../../ui';
import { boxShadow, flexBetween } from '../../ui/mixins';

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

export default function Libraries({ libraries, presets, onAdd, onRemove }) {
  const [url, setUrl, onUrlChange] = useInput();
  const [hasError, setHasError] = useState(false);

  const foundPresets = presets.filter(preset => preset.url.includes(url.toLowerCase()));

  function addLibrary(libary) {
    onAdd(libary);
    setUrl('');
    setHasError(false);
  }

  function addLibraryFromUrl(e) {
    e.preventDefault();

    try {
      new URL(url);
    } catch (e) {
      setHasError(true);
      return;
    }

    const name = url.split('/').pop();
    addLibrary({ url, name });
  }

  return (
    <Wrapper>
      <form
        onSubmit={addLibraryFromUrl}
        autoComplete="off"
        spellCheck="false"
        data-testid="libraries-form">
        <Label error={hasError}>
          <LabelHeader data-testid="libraries-label">
            {hasError ? 'This seems to be an invalid library 😞' : 'URL or Search'}
          </LabelHeader>
          <Input
            value={url}
            onChange={onUrlChange}
            placeholder="https://example.com/library.js or 'Library'"
            data-testid="libraries-input"/>
        </Label>

        {(url && foundPresets.length > 0) && (
          <Suggestions>
            {foundPresets.map(preset =>
              <Suggestion
                onClick={() => addLibrary(preset)}
                key={preset.name}
                data-testid="libraries-suggestion"
              >
                {preset.name}
              </Suggestion>
            )}
          </Suggestions>
        )}
        <Divider/>
        <List>
          {libraries.length > 0
            ? libraries.map(library =>
              <ListItem key={library.name}>
                <Link href={library.url}>{library.name}</Link>
                <RemoveLinkSign onClick={() => onRemove(library)}>&times;</RemoveLinkSign>
              </ListItem>
            ) : (
              <ListItem data-testid="libraries-empty-message">
                You're not using any libraries. <span role="img" aria-label="books">📚</span>
              </ListItem>
            )}
        </List>
      </form>
    </Wrapper>
  );
}
