import React from 'react';
import { storiesOf } from '@storybook/react';
import { TabNav } from './TabNav';
import { TextWithIcon } from '../TextWithIcon/TextWithIcon';
import { Error } from '../../assets/images';

// Thanks to http://www.christinachern.com/hpipsum/
const tabNavItems = [
  {
    id: 'one',
    text: 'Section one',
    content: (
      <p>
        Squashy armchairs dirt on your nose brass scales crush the Sopophorous
        bean with flat side of silver dagger, releases juice better than
        cutting. Full moon Whomping Willow three turns should do it lemon drops.
        Locomotor trunks owl treats that will be 50 points, Mr. Potter. Witch
        Weekly, he will rise again and he will come for us, headmaster Erumpent
        horn. Fenrir Grayback horseless carriages ‘zis is a chance many would
        die for!
      </p>
    ),
  },
  {
    id: 'two',
    text: 'Section two',
    content: (
      <p>
        Prefect’s bathroom Trelawney veela squashy armchairs, SPEW: Gamp’s
        Elemental Law of Transfiguration. Magic Nagini bezoar, Hippogriffs
        Headless Hunt giant squid petrified. Beuxbatons flying half-blood
        revision schedule, Great Hall aurors Minerva McGonagall Polyjuice
        Potion. Restricted section the Burrow Wronski Feint gnomes, quidditch
        robes detention, chocolate frogs. Errol parchment knickerbocker glory
        Avada Kedavra Shell Cottage beaded bag portrait vulture-hat. Twin cores,
        Aragog crimson gargoyles, Room of Requirement counter-clockwise
        Shrieking Shack. Snivellus second floor bathrooms vanishing cabinet
        Wizard Chess, are you a witch or not?
      </p>
    ),
  },
  {
    id: 'two',
    text: <TextWithIcon Icon={Error} text="Section three" iconSide="right" />,
    content: (
      <p>
        Half-giant jinxes peg-leg gillywater broken glasses large black dog
        Great Hall. Nearly-Headless Nick now string them together, and answer me
        this, which creature would you be unwilling to kiss? Poltergeist
        sticking charm, troll umbrella stand flying cars golden locket Lily
        Potter. Pumpkin juice Trevor wave your wand out glass orbs, a Grim
        knitted hats. Stan Shunpike doe patronus, suck his soul Muggle-Born
        large order of drills the trace. Bred in captivity fell through the
        veil, quaffle blue flame ickle diddykins Aragog. Yer a wizard, Harry
        Doxycide the woes of Mrs. Weasley Goblet of Fire.
      </p>
    ),
  },
];

storiesOf('Tab nav', module).add('Default', () => {
  return <TabNav items={tabNavItems}></TabNav>;
});
