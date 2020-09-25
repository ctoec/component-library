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

			const rotateOpts = {
				'none': undefined,
				'90 degrees': '90',
				'180 degrees': '180',
				'270 degrees': '270'
			}
			const rotate = select('Rotation', rotateOpts, undefined);
			return <InlineIcon className={colorClassName} Icon={Icon} rotate={rotate}/>
		}).addDecorator(withKnobs)
	});
