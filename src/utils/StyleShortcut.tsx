interface IStyleShortcuts {
  w: 'width';
  h: 'height';
  mx: 'marginHorizontal';
  my: 'marginVertical';
  mr: 'marginRight';
  ml: 'marginLeft';
  mt: 'marginTop';
  mb: 'marginBottom';
  px: 'paddingHorizontal';
  py: 'paddingVertical';
  p: 'padding';
  pl: 'paddingLeft';
  pb: 'paddingBottom';
  pt: 'paddingTop';
  pr: 'paddingRight';
  bg: 'backgroundColor';
  fs: 'fontSize';
  bw: 'borderWidth';
  align: 'alignItems';
  justify: 'justifyContent';
  direction: 'flexDirection';
  backgoundColor: 'bg';
  flex: 'flex';
  radius: 'borderRadius';
  color: 'color';
}

const shortcutStyles: IStyleShortcuts | any = {
  w: 'width',
  h: 'height',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  mr: 'marginRight',
  ml: 'marginLeft',
  mt: 'marginTop',
  mb: 'marginBottom',
  px: 'paddingHorizontal',
  p: 'padding',
  py: 'paddingVertical',
  pl: 'paddingLeft',
  pb: 'paddingBottom',
  pt: 'paddingTop',
  pr: 'paddingRight',
  bg: 'backgroundColor',
  fs: 'fontSize',
  bw: 'borderWidth',
  align: 'alignItems',
  justify: 'justifyContent',
  fd: 'flexDirection',
  backgoundColor: 'bg',
  flex: 'flex',
  radius: 'borderRadius',
  color: 'color',
  top: 'top',
} as any;

export const getStyleShortcuts = (props: IStyleShortcuts | any) => {
  const _props = Object.keys(props).filter(prop => Object.keys(shortcutStyles).includes(prop)); // prettier-ignore
  const styles = {} as any;

  _props.forEach((prop: any) => {
    if (shortcutStyles[prop]) {
      styles[shortcutStyles[prop]] = props[prop];
    }
  });

  return styles;
};
