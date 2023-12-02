/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useRef} from 'react';
import {FlatList} from 'react-native';

import {COLORS} from '@/theme';

import {SegmentViewProps, TabPageProps} from './segment-view';
import {AppFlatList, Block, SegmentedControl} from '..';
import AppScreen from '../AppScreen';

const SegmentView = (props: SegmentViewProps) => {
  const {segments, children, activeTab, setActiveTab} = props;
  const flat = useRef<FlatList>(null);

  const TabPage = ({index, pages}: TabPageProps) => {
    return (
      <AppScreen scroll p-0>
        <Block flex>{pages?.[index]}</Block>
      </AppScreen>
    );
  };

  const renderItem = useCallback(({index}: {index: number}) => <TabPage index={index} pages={children} />, []);

  return (
    <React.Fragment>
      <Block px-20 bg-dark>
        <SegmentedControl
          currentIndex={activeTab}
          onChange={(index: number) => {
            setActiveTab?.(index);
            flat?.current?.scrollToIndex?.({
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
        <AppFlatList horizontal pagingEnabled scrollEnabled={false} reference={flat} data={segments.map(i => i.id)} renderItem={renderItem} />
      </AppScreen>
    </React.Fragment>
  );
};
export default SegmentView;
