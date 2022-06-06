import React,{useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ];

export const AccordionList = () => {
  const [activeSections, setActiveSections] = useState([]);

  const _renderSectionTitle = (section: any) => {
    return <View style={styles.content}></View>;
  };

  const _renderHeader = (section: any) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const _renderContent = (section: any) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderSectionTitle={_renderSectionTitle}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={_updateSections}
    />
  );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f1f1f1',
        borderWidth:1,
        padding:6
    },
    headerText: {},
    content: {},
  });
  