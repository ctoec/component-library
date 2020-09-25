import React from 'react';
import { SVGInline } from './SVGInline';

// Local imports
import angleArrowDown from './angleArrowDown.svg';
import arrowRight from './arrowRight.svg';
import calendar from './calendar.svg';
import checkCircle from './checkCircle.svg';
import arrowDownCircle from './arrowDownCircle.svg';
import arrowDownLine from './arrowDownLine.svg';
import exclamationCircle from './exclamationCircle.svg';
import fileDownload from './fileDownload.svg';
import hero from './hero.svg';
import logo from './logo.svg';
import logoWithCheck from './logoWithCheck.svg';
import pencil from './pencil.svg';
import plusCircle from './plusCircle.svg';
import teacherWithChalkboard from './teacherWithChalkboard.svg';
import trashCan from './trashCan.svg';
import x from './x.svg';

export type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

export const ArrowDownLine: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={arrowDownLine} />
);
export const ExclamationCircle: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={exclamationCircle} />
);
export const CheckCircle: SVGIcon= (props) => (
  <SVGInline svgProps={props} url={checkCircle} />
);	
export const AngleArrowDown: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={angleArrowDown} />
);
export const ArrowRight: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={arrowRight} />
);
export const Calendar: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={calendar} />
);
export const ArrowDownCircle: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={arrowDownCircle} />
);
export const FileDownload: SVGIcon= (props) => (
  <SVGInline svgProps={props} url={fileDownload} />
);
export const Hero: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={hero} />
);
export const Logo: SVGIcon= (props) => (
  <SVGInline svgProps={props} url={logo} />
);
export const LogoWithCheck: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={logoWithCheck} />
);
export const Pencil: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={pencil} />
);
export const PlusCircle: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={plusCircle} />
);
export const TeacherWithChalkboard: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={teacherWithChalkboard} />
);
export const TrashCan: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={trashCan} />
);
export const X: SVGIcon = (props) => (
	<SVGInline svgProps={props} url={x} />
);
