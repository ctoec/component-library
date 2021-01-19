import React from 'react';
import { storiesOf } from '@storybook/react';
import { TooltipWrapper } from './TooltipWrapper';
import { InlineIcon } from '../InlineIcon/InlineIcon';

storiesOf('TooltipWrapper', module).add('Default', () => {
  return (
    <div className="margin-left-10">
      <TooltipWrapper tooltipText="Alert!!!!! More info about this icon!!!!">
        <InlineIcon icon="attentionNeeded" />
      </TooltipWrapper>
    </div>
  );
});
