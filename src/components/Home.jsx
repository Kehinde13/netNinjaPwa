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

   /*  const food = [

            {
                id: "1",
                name: "Curry",
                img: "./images/curry.jpg",
                desc: "Best curry from india" 
             },
         
             {
                 id: "2",
                 name: "Noodles",
                 img: "./images/noodles.jpg",
                 desc: "ishiraku ramen from the leaf, japan"
             },
         
             {
                 id: "3",
                 name: "Stew",
                 img: "./images/stew.jpg",
                 desc: "Everywhere stew from nigeria"
             }
    ] */



    

    const cards = food.map(item => {
        return (
            <Card sx={{ maxWidth: 345 }}
                  key={item.id}
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
                    </CardContent>
                </div>

            {console.log(item.id)}
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