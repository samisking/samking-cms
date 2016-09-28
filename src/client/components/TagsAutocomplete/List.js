import React, { PropTypes } from 'react';
import styles from './TagsAutocomplete.css';

const ListItem = ({ name, index, selected, onSelect }) => {
  const className = selected === index ? styles.listItem_active : styles.listItem;

  return (
    <li className={className} onSelect={onSelect}>
      {name}
    </li>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

const List = ({ data, selected, onSelect }) =>
  <ul className={styles.autocompleteList}>
    {data.map((item, index) =>
      <ListItem
        key={item.id}
        name={item.name}
        index={index}
        selected={selected}
        onSelect={onSelect}
      />
    )}
  </ul>;

List.propTypes = {
  data: React.PropTypes.array,
  selected: React.PropTypes.number.isRequired,
  onSelect: React.PropTypes.func
};

export default List;
