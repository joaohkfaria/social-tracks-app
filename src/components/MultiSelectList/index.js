import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import MultiSelectListItem from './MultiSelectListItem';

const MultiSelectList = ({ items, selectedItemsIds, onChangeSelected }) => {
  function handleSelectItem(itemId) {
    const itemIndex = selectedItemsIds.indexOf(itemId);
    // If contains the item, remove it
    if (itemIndex !== -1) {
      onChangeSelected([
        ...selectedItemsIds.slice(0, itemIndex),
        ...selectedItemsIds.slice(itemIndex + 1),
      ]);
      return;
    }
    // Add the item on list
    onChangeSelected([
      ...selectedItemsIds,
      itemId,
    ]);
  }

  function renderItem(listItem) {
    const { item } = listItem;

    return (
      <MultiSelectListItem
        id={item._id}
        name={item.name}
        onSelect={id => handleSelectItem(id)}
        selected={selectedItemsIds.indexOf(item._id) !== -1}
        avatar={item.avatar_url}
      />
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      style={{ width: '100%', marginTop: 20, flex: 1 }}
    />
  );
};

MultiSelectList.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItemsIds: PropTypes.array,
  onChangeSelected: PropTypes.func.isRequired,
};

MultiSelectList.defaultProps = {
  selectedItemsIds: [],
};

export default MultiSelectList;
