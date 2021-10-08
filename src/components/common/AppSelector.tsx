import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Block, Text, Icon} from '../../theme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import Separator from './Separator';
import {IconTypes} from '../../theme/Icon';
import IconButton from './IconButton';
import {FlatList} from '..';

const AppSelector = ({
  isVisible,
  hideModal,
  onSelect,
  itemsList,
  selectedItem,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard={true}
      backdropColor={colors.black}
      backdropOpacity={0.8}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={200}
      animationOutTiming={200}
      style={{margin: 0}}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onBackdropPress={() => {
        hideModal();
      }}
      onSwipeComplete={() => {
        hideModal();
      }}>
      <Block padding={16} flex={0} style={styles.block} white>
        <Block row marginBottom={16}>
          <Block center>
            <Block noflex style={styles.stick} />
          </Block>
          <IconButton
            icon={{
              type: IconTypes.materialCommunity,
              name: 'window-close',
              size: 22,
            }}
            style={styles.closeButton}
            onPress={() => {
              hideModal();
            }}
          />
        </Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          data={itemsList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                onSelect(item);
                hideModal();
              }}>
              <Block padding row>
                <Text style={styles.itemTitle} medium size={18}>
                  {item.title}
                </Text>
                {selectedItem && selectedItem.value === item.value && (
                  <Icon type={IconTypes.material} name={'check'} size={22} />
                )}
              </Block>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={Separator}
        />
      </Block>
    </Modal>
  );
};

export default AppSelector;

const styles = StyleSheet.create({
  block: {
    height: '50%',
    marginTop: 'auto',
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
    padding: 16,
  },
  itemTitle: {
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  stick: {
    borderRadius: 8,
    width: 110,
    height: 4,
    backgroundColor: '#F2F3F6',
  },
  contentContainer: {
    paddingBottom: 100,
  },
});
