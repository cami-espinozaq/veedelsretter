import React, { useState } from 'react';

import Container from '@material-ui/core/Container';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Select.css';

const RetailerSelect = params => {

    const [name, setName] = useState('');

    const handleNameChange = (e) => {
      setName(e.target.value);
    }

    return (
        <FormControl variant="filled" className="retailer-select__form">
            <InputLabel id="retailer-select-label">Select Retailer</InputLabel>
            <Select
                labelId="retailer-select-label"
                id="retailer-select"
                value={name}
                onChange={handleNameChange}
            >
                <MenuItem value={1}>Retailer 1</MenuItem>
                <MenuItem value={2}>Retailer 2</MenuItem>
            </Select>
        </FormControl>
    );
};

export default RetailerSelect;