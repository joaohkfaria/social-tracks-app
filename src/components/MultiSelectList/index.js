import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import MultiSelectListItem from './MultiSelectListItem';

const MultiSelectList = ({ items, selectedItems, onChangeSelected }) => {
  function handleSelectItem(itemId) {
    const itemIndex = selectedItems.indexOf(itemId);
    // If contains the item, remove it
    if (itemIndex !== -1) {
      onChangeSelected([
        ...selectedItems.slice(0, itemIndex),
        ...selectedItems.slice(itemIndex + 1),
      ]);
      return;
    }
    // Add the item on list
    onChangeSelected([
      ...selectedItems,
      itemId,
    ]);
  }

  function renderItem(listItem) {
    const { item } = listItem;

    return (
      <MultiSelectListItem
        id={item.id}
        name={item.name}
        onSelect={id => handleSelectItem(id)}
        selected={selectedItems.indexOf(item.id) !== -1}
        avatar={item.avatar}
      />
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      style={{ width: '100%', marginTop: 20, flex: 1 }}
    />
  );
};

MultiSelectList.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array,
  onChangeSelected: PropTypes.func.isRequired,
};

MultiSelectList.defaultProps = {
  selectedItems: [],
};

export default MultiSelectList;