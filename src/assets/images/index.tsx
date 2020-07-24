import React from 'react';
import SVGInline from './SVGInline';
// USWDS imports
import arrowDown from 'uswds/dist/img/arrow-down.svg';
import error from 'uswds/dist/img/alerts/error.svg';
import info from 'uswds/dist/img/alerts/info.svg';
import success from 'uswds/dist/img/alerts/success.svg';
// Local imports
import angleArrowDown from './angleArrowDown.svg'
import arrowRight from './arrowRight.svg'
import calendar from './calendar.svg'
import downArrowCircle from './downArrowCircle.svg'
import hero from './hero.svg'
import logo from './logo.svg'
import pencil from './pencil.svg'
import plusCircle from './plusCircle.svg'
import teacherWithChalkboard from './teacherWithChalkboard.svg'

export const ArrowDown = () => <SVGInline url={arrowDown} />
export const Error = () => <SVGInline url={error} />
export const Info = () => <SVGInline url={info} />
export const Success = () => <SVGInline url={success} />
export const AngleArrowDown = () => <SVGInline url={angleArrowDown} />
export const ArrowRight = () => <SVGInline url={arrowRight} />
export const Calendar = () => <SVGInline url={calendar} />
export const DownArrowCircle = () => <SVGInline url={downArrowCircle} />
export const Hero = () => <SVGInline url={hero} />
export const Logo = () => <SVGInline url={logo} />
export const Pencil = () => <SVGInline url={pencil} />
export const PlusCircle = () => <SVGInline url={plusCircle} />
export const TeacherWithChalkboard = () => <SVGInline url={teacherWithChalkboard} />