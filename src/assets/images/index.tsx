import React from 'react';
import { SVGInline } from './SVGInline';

// USWDS imports
import arrowDown from 'uswds/dist/img/arrow-down.svg';
import error from 'uswds/dist/img/alerts/error.svg';
import info from 'uswds/dist/img/alerts/info.svg';
import success from 'uswds/dist/img/alerts/success.svg';

// Local imports
import angleArrowDown from './angleArrowDown.svg';
import arrowRight from './arrowRight.svg';
import calendar from './calendar.svg';
import downArrowCircle from './downArrowCircle.svg';
import fileDownload from './fileDownload.svg';
import hero from './hero.svg';
import logo from './logo.svg';
import logoWithCheck from './logoWithCheck.svg';
import pencil from './pencil.svg';
import plusCircle from './plusCircle.svg';
import teacherWithChalkboard from './teacherWithChalkboard.svg';
import downloadArrow from './download.svg';
import trashCan from './trashCan.svg';
import x from './x.svg';

export type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

export const ArrowDown: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={arrowDown} />
);
export const DownloadArrow: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={downloadArrow} />
);
export const Error: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={error} />
);
export const Info: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={info} />
);
export const Success: SVGIcon= (props) => (
  <SVGInline svgProps={props} url={success} />
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
export const DownArrowCircle: SVGIcon = (props) => (
  <SVGInline svgProps={props} url={downArrowCircle} />
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
