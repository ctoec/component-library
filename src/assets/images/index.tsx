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
import cancel from './cancel.svg';

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
export const AngleArrowDown = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={angleArrowDown} />
);
export const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <SVGInline svgProps={props} url={arrowRight} />
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
export const Cancel = (props: React.SVGProps<SVGSVGElement>) => (
	<SVGInline svgProps={props} url={cancel} />
);
