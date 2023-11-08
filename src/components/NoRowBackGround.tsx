import {Stack, Typography} from '@mui/material';
import noRowBg from '../assets/nodata-found.png';

export default function NoRowBackGround(){

    return(
    <>
        <Stack height="100px" alignItems="center" justifyContent="center">
            <img src ={noRowBg} className = "h-3/4" />
            <Typography variant ="h5">No results found</Typography>
        </Stack>
    </>
    )

}