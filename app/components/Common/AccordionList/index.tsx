import React, {FC, memo, useState} from 'react';
import {StyleSheet} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';

import {COLORS} from '@/theme';
import {widthPixel} from '@/utils';

import {AccordionListProps, SectionProps} from './app-accordion-list';
import Block from '../Block';
import Text from '../Text';

const AccordionList: FC<AccordionListProps> = props => {
  const {sections: SECTIONS, titleStyles, headerStyles} = props;
  const [activeSections, setActiveSections] = useState<Array<number>>([]);

  const _renderSectionTitle = (section: SectionProps) => {
    return (
      <Block>
        <Text style={titleStyles}>{section.title}</Text>
      </Block>
    );
  };

  const _renderHeader = (section: SectionProps) => {
    return (
      <Block style={[styles.header, headerStyles]}>
        <Text>{section.title}</Text>
      </Block>
    );
  };

  const _renderContent = (section: SectionProps) => {
    return (
      <Block>
        <Text>{section.content}</Text>
      </Block>
    );
  };

  const _updateSections = (activeSectionIds: Array<number>) => {
    setActiveSections(activeSectionIds);
  };

  return (
    <Accordion sections={SECTIONS} activeSections={activeSections} renderSectionTitle={_renderSectionTitle} renderHeader={_renderHeader} renderContent={_renderContent} onChange={_updateSections} />
  );
};

export default memo(AccordionList);

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    padding: widthPixel(5),
  },
});
