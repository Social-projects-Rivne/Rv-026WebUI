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
        this.props.onListCreator(this.state.items);
    }

    removeField(index) {
        const newItems = this.state.items.filter(obj => obj.id !== index);
        this.setState({ items: newItems });
        this.props.onListCreator(this.state.items);
    }

    addField() {
        const itemsArray = this.state.items;
        itemsArray.push({ id: uuidv4(), value: '' });
        this.setState({ items: itemsArray });
        this.props.onListCreator(this.state.items);
    }

    render() {
        const { nameLable } = this.props;

        const fields = this.state.items;

        const fieldArray = fields.map((item, index) => (
            <div key={item.id}>
                <label htmlFor={`${nameLable}--${+item.id + 1}`}>
                    {`${nameLable} #${index + 1}`}
                </label>
                <FormControl
                    type="text"
                    name={nameLable}
                    id={`${nameLable}--${index + 1}`}
                    placeholder={`${nameLable} ${index + 1}`}
                    value={this.state.items.value}
                    onChange={e => this.onInputChange(item.id, e)}
                />
                <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => this.removeField(item.id)}
                >Remove {nameLable}
                </button>
            </div>
        ));

        return (
            <div>
                {fieldArray}
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.addField()}>
                    Add {nameLable}
                </button>
            </div>
        );
    }
}

export default ListCreator;
