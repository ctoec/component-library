import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { InlineIcon } from '..';
import * as Icons from '../../assets/images';

const _storiesOf = storiesOf('InlineIcon', module);
Object.entries(Icons)
	.filter(([name]) => !['hero', 'logo', 'logowithcheck'].includes(name.toLowerCase()))
	.forEach(([name, Icon]) => {
		_storiesOf.add((`${name}`), () => {
			const colorOpts = {
				Red : 'text-red',
				Yellow: 'text-yellow',
				Green: 'text-green',
				Blue: 'text-blue',
				Black: 'text-ink',
			}
			const colorClassName = select('Icon color', colorOpts, 'text-ink');
			return <InlineIcon className={colorClassName} Icon={Icon} />
		}).addDecorator(withKnobs)
	});
