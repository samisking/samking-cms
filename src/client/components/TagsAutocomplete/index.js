import React, { Component, PropTypes } from 'react';
import { KEY } from './keys';
import Input from './Input';
import List from './List';
import styles from './TagsAutocomplete.css';

const normaliseString = (str) => str.toLowerCase().replace(/\W+/g, '');

class TagsAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemList: this.props.data,
      filteredItemList: [],
      inputValue: this.props.value,
      selected: 0,
      focused: false
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        itemList: nextProps.data,
        inputValue: ''
      });
    }
  }

  onSelect(value) {
    // Clear the input when you select a value
    this.setState({
      filteredItemList: [],
      inputValue: '',
      selected: 0
    });

    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  }

  onAddNew(value) {
    // Clear the input when you select a value
    this.setState({
      filteredItemList: [],
      inputValue: '',
      selected: 0
    });

    if (this.props.onAddNew) {
      if (this.props.unique) {
        const normalisedValue = normaliseString(value);
        const hasItem = this.props.data.find(d => d.slug === normalisedValue);

        // If the list should be unique, then don't add it
        if (hasItem) {
          return;
        }
      }

      this.props.onAddNew(value);
    }
  }

  onBlur() {
    this.setState({
      filteredItemList: [],
      focused: false
    });

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onFocus() {
    this.setState({
      focused: true
    });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.onChange(value);
    let updatedList = [];

    this.setState({
      inputValue: value,
      selected: 0
    });

    if (value.length > 0 && this.state.itemList.length > 0) {
      updatedList = this.state.itemList.filter(item => {
        const test = normaliseString(value);
        const slug = normaliseString(item.slug);
        const name = normaliseString(item.name);

        if (!slug.includes(test) || !name.includes(test)) return null;
        return item;
      });
    }

    this.setState({
      filteredItemList: updatedList
    });
  }

  handleKeyEvent(event) {
    const { keyCode } = event;
    const { filteredItemList, inputValue } = this.state;
    const { onChange } = this.props;
    let { selected } = this.state;

    if (filteredItemList.length && (keyCode === KEY.UP || keyCode === KEY.DOWN)) {
      if (keyCode === KEY.DOWN) {
        selected++;
        if (selected <= filteredItemList.length) {
          this.setState({
            selected,
            inputValue: filteredItemList[selected - 1].name
          }, onChange(filteredItemList[selected - 1].name));
        }
      }

      if (keyCode === KEY.UP) {
        if (selected === 1) {
          this.setState({
            selected: 0,
            inputValue: '',
            filteredItemList: []
          }, onChange(filteredItemList[selected - 1].name));
        }

        if (selected > 1) {
          selected--;
          this.setState({
            selected,
            inputValue: filteredItemList[selected - 1].name
          }, onChange(filteredItemList[selected - 1].name));
        }
      }
    }

    if (keyCode === KEY.ENTER && inputValue !== '' && this.props.onSelect) {
      event.preventDefault();
      // if there is a result, then select the result
      if (filteredItemList.length && selected > 0) {
        this.onSelect(filteredItemList[selected - 1]);
      } else if (this.props.onAddNew) {
        this.onAddNew(inputValue);
      }
    }
  }

  render() {
    const { filteredItemList, inputValue, selected } = this.state;
    const hasItems = filteredItemList.length > 0;

    return (
      <div
        className={`${this.props.className} ${styles.autocomplete}`}
        onKeyDown={this.handleKeyEvent}
      >
        <Input
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        {hasItems &&
          <List
            data={filteredItemList}
            onSelect={this.onSelect}
            selected={selected - 1}
          />
        }
      </div>
    );
  }
}

TagsAutocomplete.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onAddNew: PropTypes.func,
  unique: PropTypes.bool
};

TagsAutocomplete.defaultProps = {
  value: ''
};

export default TagsAutocomplete;
