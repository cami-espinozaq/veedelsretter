import React from 'react';

import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const kpiBox = params => {

    const classes = `kpiBox ${params.kpiStyle}`

    return (
        <Box display="flex" justifyContent="space-between" marginBottom="20px"
        alignItems="center" padding="20px" borderRadius="6px" className={classes}>
            <Box>
                {params.children}
            </Box>
            <Box textAlign="start">
                <Typography variant="h3" style={{ textAlign: 'right'}}>{params.number}</Typography>
                <Typography variant="h5" style={{ textAlign: 'right'}}>{params.title}</Typography>
            </Box>
        </Box>
    );
};

export default kpiBox;