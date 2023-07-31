import React, {JSXElementConstructor, ReactElement, ReactNode, useRef} from 'react';
import {FlatList} from 'react-native';

import {COLORS, window} from '@/theme';

import {AppFlatList, Block, SegmentedControl} from '..';
import AppScreen from '../AppScreen';

interface SegmentProps {
  label: string;
  id: number;
}

interface SegmentViewProps {
  children: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  activeTab: number;
  setActiveTab: (index: number) => void;
  segments: Array<SegmentProps>;
}

interface TabPageProps {
  pages: Array<ReactElement<string | JSXElementConstructor<never>> | ReactNode>;
  index: number;
}

const SegmentView = (props: SegmentViewProps) => {
  const {segments, children, activeTab, setActiveTab} = props;
  const flat = useRef<FlatList>(null);

  const TabPage = ({index, pages}: TabPageProps) => {
    return (
      <AppScreen scroll p-0>
        <Block style={{width: window.width}}>{pages?.[index]}</Block>
      </AppScreen>
    );
  };

  return (
    <React.Fragment>
      <Block px-20 bg-dark>
        <SegmentedControl
          currentIndex={activeTab}
          onChange={(index: number) => {
            setActiveTab(index);
            flat.current &&
              flat.current.scrollToIndex({
                animated: true,
                index: index,
              });
          }}
          segments={segments}
          tabColor={COLORS.primaryDark}
          activeColor={COLORS.primary}
          titleColor={COLORS.gray}
          activeTitleColor={COLORS.white}
        />
      </Block>
      <AppScreen p-0>
        <AppFlatList horizontal pagingEnabled scrollEnabled={false} reference={flat} data={segments.map(i => i.id)} renderItem={item => <TabPage index={item.index} pages={children} />} />
      </AppScreen>
    </React.Fragment>
  );
};
export default SegmentView;
