import React, { useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';

import './Select.css';
import { TextField } from '@material-ui/core';

const RetailerSelect = params => {

    const [retailer, setRetailer] = useState('');

    const handleNameChange = (e, newValue) => {
        setRetailer(newValue);
        params.onChangeCallback(newValue ? newValue.id : null);
    }

    return (
        <Autocomplete
            id="retailer-select"
            options={params.list}
            getOptionLabel={(option) => option.name}
            onChange={handleNameChange}
            renderInput={(params) => 
                <TextField {...params} label="Select Retailer" variant="outlined" className="retailer-select__form" />
            } 
        />
    );
};

export default RetailerSelect;