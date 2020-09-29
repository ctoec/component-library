import React from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion } from './Accordion';
import { Button } from '..';

const items = [
  {
    id: 'first',
    title: 'Firstly',
    content: 'This content is just a string',
  },
  {
    id: 'second',
    title: 'Up next',
    content: (
      <div>
        <p>This content includes JSX Elements</p>
        <Button text="Like a BUTTON" />
      </div>
    ),
  },
];
storiesOf('Accordion', module)
  .add('Default', () => {
    return <Accordion items={items} titleHeadingLevel="h2" />;
  })
  .add('with default expanded', () => {
    return (
      <Accordion
        items={items.map((i, idx) => ({ ...i, isExpanded: idx === 0 }))}
        titleHeadingLevel="h2"
      />
    );
  })
  .add('with multiple default expanded', () => {
    return (
      <Accordion
        items={items.map((i) => ({ ...i, isExpanded: true }))}
        titleHeadingLevel="h2"
      />
    );
  })
  .add('with item expand content', () => {
    return (
      <Accordion
        items={items.map((i, idx) => ({
          ...i,
          expand: <p>Show the {idx}th thing</p>,
        }))}
        titleHeadingLevel="h2"
      />
    );
  })
  .add('with item heading content', () => {
    return (
      <Accordion
        items={items.map((i) => ({
          ...i,
          headerContent: (
            <div> this is some additional context for the header</div>
          ),
        }))}
        titleHeadingLevel="h2"
      />
    );
  });
