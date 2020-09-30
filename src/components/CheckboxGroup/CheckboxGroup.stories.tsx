import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormStatusProps } from '..';
import { CheckboxOptionProps, CheckboxGroup } from './CheckboxGroup';

const onChange = action('onChange');

const optionProps: CheckboxOptionProps[] = [
	{
		value: 'one',
		id: 'one-checkbox',
		text: 'Option 1',
	},
	{
		value: 'two',
		id: 'two-checkbox',
		text: 'Option 2',
	}
]
const warning: FormStatusProps = {
  type: 'warning',
  message: 'These fields need your attention',
  id: 'checklist-warning',
};
const error: FormStatusProps = {
  type: 'error',
  message: 'These fields will block your progress',
  id: 'checklis-error',
};
const success: FormStatusProps = {
  type: 'success',
  message: 'These fields were validated woo',
  id: 'checklist-success',
};

storiesOf('CheckboxGroup', module)
  .add('CheckboxGroup', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        onChange={onChange}
        options={optionProps}
        id="storybook-CheckboxGroup"
      />
    );
	})
	.add('CheckboxGroup with visible legend', () => {
    return (
      <CheckboxGroup
				legend="CheckboxGroup"
				showLegend
        onChange={onChange}
        options={optionProps}
        id="storybook-CheckboxGroup"
      />
    );
  })
  .add('CheckboxGroup with success', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        onChange={onChange}
        options={optionProps}
        id="storybook-CheckboxGroup"
        status={success}
      />
    );
  })
  .add('CheckboxGroup with warning', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        onChange={onChange}
        options={optionProps}
        id="storybook-CheckboxGroup"
        status={warning}
      />
    );
  })
  .add('CheckboxGroup with error', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        onChange={onChange}
        options={optionProps}
        id="storybook-CheckboxGroup"
        status={error}
      />
    );
  })
  .add('Disabled CheckboxGroup', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        onChange={onChange}
        options={optionProps}
        id="storybook-CheckboxGroup"
        disabled={true}
      />
    );
  })
  .add('CheckboxGroup with element expansions', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        onChange={onChange}
        options={optionProps.map((props) => ({...props, expansion: <div>This is an expansion yay!</div>}))}
        id="storybook-CheckboxGroup"
      />
    );
	})
	.add('CheckboxGroup with custom select logic', () => 
		React.createElement(() => {
			const [selectedItems, setSelectedItems] = useState<string[]>([]);

			return <CheckboxGroup
				id="storybook-CheckboxGroup"
				legend="CheckboxGroup"
				options={[
					{
						value: 'all',
						id: 'all-checkbox',
						text: 'All (If this one is selected, nothing else can be selected)',
						selected: selectedItems.length === 0,
						onChange: (e) => {
							if (e.target.checked) {
								setSelectedItems([])
							}
							e.persist();
						}
					},
					{
						value: 'one',
						id: 'one-checkbox',
						text: 'Option 1',
						selected: selectedItems.includes('one'),
						onChange: (e) => {
							if (e.target.checked) {
                  setSelectedItems((items) => [...items, 'one']);
							} else {
								setSelectedItems((items) =>
									items.filter((item) => item !== 'one')
								);
							}
							e.persist();
						}
					},
					{
						value: 'two',
						id: 'two-checkbox',
						text: 'Option 2',
						selected: selectedItems.includes('two'),
						onChange: (e) => {
							if (e.target.checked) {
									setSelectedItems((items) => [...items, 'two']);
							} else {
								setSelectedItems((items) =>
									items.filter((item) => item !== 'two')
								);
							}
							e.persist();
						}
					}
				]}
			/>
		})
	)
