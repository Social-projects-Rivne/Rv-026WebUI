import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { FormControl } from 'react-bootstrap';

class ListCreator extends Component {
    constructor(props) {
        super(props);

        this.state = { items: [] };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(findId, e) {
        const items = this.state.items;
        items.find((o, i) => {
            if (o.id === findId) {
                items[i] = { id: findId, value: e.target.value };
                return true;
            }
            return false;
        });
        this.setState({ items });
        this.props.onListCreator(this.state.items, this.props.nameLable);
    }

    removeField(index) {
        const newItems = this.state.items.filter(obj => obj.id !== index);
        this.setState({ items: newItems });
        this.props.onListCreator(this.state.items, this.props.nameLable);
    }

    addField() {
        const itemsArray = this.state.items;
        itemsArray.push({ id: uuidv4(), value: '' });
        this.setState({ items: itemsArray });
        this.props.onListCreator(this.state.items, this.props.nameLable);
    }

    render() {
        const { nameLable } = this.props;

        const fields = this.state.items;

        const fieldArray = fields.map((item, index) => (
            <div key={item.id} className="list-creator-item item-child">
                <label htmlFor={`${nameLable}--${index + 1}`}>
                    {`${nameLable} #${index + 1}`}
                </label>
                <FormControl
                    type="text"
                    name={nameLable}
                    className="list-creator-input"
                    id={`${nameLable}--${index + 1}`}
                    placeholder={`${nameLable} ${index + 1}`}
                    value={this.state.items.value}
                    onChange={e => this.onInputChange(item.id, e)}
                />
                <button
                    type="button"
                    className="list-creator-delete"
                    onClick={() => this.removeField(item.id)}
                >&#10008;
                </button>
            </div>
        ));

        return (
            <div className="list-creator">
                {fieldArray}
                <button type="button" className={`list-creator-add item-child ${nameLable}`} onClick={() => this.addField()} />
            </div>
        );
    }
}

export default ListCreator;
