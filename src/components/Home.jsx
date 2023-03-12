import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Home() {

    const [food, setFood] = useState([])

    const fetchFood = async () => {
            const res = await fetch('https://my-json-server.typicode.com/Kehinde13/demo.json/NinjaFoods')
            const data = await res.json()
            setFood(data);
    }

    useEffect(() => {
        fetchFood()
    }, []);



    const cards = food.map(item => {
        return (
            <Card sx={{ maxWidth: 345 }}
                key={item.id}
                className='card'
            >
                <CardMedia
                    component="img"
                    alt={item.name}
                    height="140"
                    src={item.img}

                />
                <div className=''>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.desc}
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