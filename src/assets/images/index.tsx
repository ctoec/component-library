import React from 'react';
import { SVGInline } from './SVGInline';

// USWDS imports
import arrowDown from 'uswds/dist/img/arrow-down.svg';
import error from 'uswds/dist/img/alerts/error.svg';
import info from 'uswds/dist/img/alerts/info.svg';
import success from 'uswds/dist/img/alerts/success.svg';

// Local imports
// import angleArrowDown from './angleArrowDown.svg';
// import arrowRight from './arrowRight.svg';
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
import cx from 'classnames';

export const ArrowDown = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={arrowDown} />
);
export const DownloadArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={downloadArrow} />
);
export const Error = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={error} />
);
export const Info = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={info} />
);
export const Success = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={success} />
);

export const AngleArrowDown = (props: { className?: string, title?: string}) => (
	<svg className={cx(props.className)} fill="currentColor" stroke="currentColor" viewBox="0 0 64 39">
		<title>{props.title || 'arrow-right'}</title>
		<path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
	</svg>
);

export const ArrowRight = (props: { className?: string }) => (
	<svg className={props.className}>
		<use href='#arrow-right' />
	</svg>
);
export const Calendar = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={calendar} />
);
export const DownArrowCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={downArrowCircle} />
);
export const FileDownload = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={fileDownload} />
);
export const Hero = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={hero} />
);
export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={logo} />
);
export const LogoWithCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={logoWithCheck} />
);
export const Pencil = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={pencil} />
);
export const PlusCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={plusCircle} />
);
export const TeacherWithChalkboard = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={teacherWithChalkboard} />
);
export const TrashCan = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={trashCan} />
);
export const X = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={x} />
);
