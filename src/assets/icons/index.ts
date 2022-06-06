import React, {FC} from 'react';
import Car from './svg/car.svg';
import Help from './svg/help.svg';
import Search from './svg/search.svg';
import Ticket from './svg/ticket.svg';
import User from './svg/user.svg';
import ArrowRight from './svg/arrow-right.svg';
import ArrowLeft from './svg/arrow-back.svg';
import Logo from './svg/logo.svg';
import Passengers from './svg/passengers.svg';
import Train from './svg/train.svg';
import To from './svg/to.svg';
import Calendar from './svg/calendar.svg';
import BackButton from './svg/back-button.svg';
import Heart from './svg/heart.svg';

const icons = {
  Car,
  Help,
  Search,
  Ticket,
  User,
  ArrowRight,
  ArrowLeft,
  Logo,
  Passengers,
  Train,
  To,
  Calendar,
  BackButton,
  Heart,
} as any;

type Props = {
  name: string;
  style?: any;
  color?: string;
  stroke?: any;
  width?: number | string;
  height?: number | string;
};

export const Icon: FC<Props> = ({
  name,
  style,
  color = '#000',
  stroke,
  width = 16,
  height = 16,
}) =>
  React.createElement(icons[name], {
    style,
    height,
    width,
    fill: color,
    stroke,
  });
