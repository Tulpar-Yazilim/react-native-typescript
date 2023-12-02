import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type SectionProps = {
  title?: string;
  content?: string;
};

export type AccordionListProps = {
  sections: SectionProps[];
  titleStyles?: StyleProp<TextStyle>;
  headerStyles?: StyleProp<ViewStyle>;
};
