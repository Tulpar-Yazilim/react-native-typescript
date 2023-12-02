import {JSXElementConstructor, ReactElement, ReactNode} from 'react';

export type SegmentProps = {
  label: string;
  id: number;
};

export type SegmentViewProps = {
  children: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  activeTab: number;
  setActiveTab: (index: number) => void;
  segments: Array<SegmentProps>;
};

export type TabPageProps = {
  pages: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  index: number;
};
