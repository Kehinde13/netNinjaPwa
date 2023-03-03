import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Noodles from '../images/noodles.jpg'
import Curry from '../images/curry.jpg'
import stew from '../images/stew.jpg'

function Home() {

    const cards = data.map(item => {
        return (
            <Card sx={{ maxWidth: 345 }}
                  key={item.id}
            >
                <CardMedia
                    component="img"
                    alt={item.Name}
                    height="140"
                    image={item.img}
                />
                <div className=''>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.Name}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        )
    })

    return (
        <div>
            <div className='cards'>
                {cards}
            </div>

        </div>

    )
}

export default Home