import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { SideNav, Button } from '..';
import { action } from '@storybook/addon-actions';
import { SideNavItemProps } from './SideNavItem';

const onClick = action('onChange');
const exampleItems: SideNavItemProps[] = [
  {
    id: 'one',
    title: 'The default active item',
    onClick,
    description: 'This is the first item',
    content: <div>Some content for the first item</div>,
  },
  {
    id: 'two',
    title: 'The other item',
    onClick,
    icon: 'complete',
    description: 'This is the third item',
    content: (
      <div>
        <Button text="A Button" />
      </div>
    ),
  },
];

storiesOf('SideNav', module)
  .add('Default', () => {
    return <SideNav items={exampleItems} />;
  })
  .add('With dynamic context always', () => (
    <SideNav items={exampleItems}>
      <p>
        This is rendered regardless of the content defined along with the items
      </p>
    </SideNav>
  ))
  .add('With dynamic content for no-active-item state', () =>
    React.createElement(() => {
      const [activeId] = useState<string>(undefined);
      return (
        <SideNav items={exampleItems}>
          {activeId === undefined && (
            <p>This is only rendered if no item is active</p>
          )}
        </SideNav>
      );
    })
  );
