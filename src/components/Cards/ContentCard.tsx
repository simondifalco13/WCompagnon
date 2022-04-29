import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardHeader, Grid, IconButton, Typography } from '@mui/material';
import '../../css/presentationCards.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ContentProps{
    imageSrc:string,
    title:string,
    content :string,
    link:string 
}


export default function ContentCard(props: ContentProps) {
    return(
        <>
             <Grid item xs={12} md={12} lg={3}>
                <Card sx={{ maxWidth: 345, height:470}}>
                    <CardHeader
                        title={props.title}
                    />
                    <CardMedia
                        component="img"
                        height="260px"
                        image={props.imageSrc}
                        alt={props.title}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                         {props.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="share">
                            <a href={props.link} target="_blank" className='share'>
                                <OpenInNewIcon/>
                            </a>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
}