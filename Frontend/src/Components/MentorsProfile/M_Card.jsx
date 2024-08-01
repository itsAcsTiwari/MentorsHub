import axios from 'axios';
import { useEffect, useState } from 'react'
import M_Profile from './M_Profile';

const M_Card = () => {
    const [book, setBook] = useState([])
    useEffect(() => {

        const getBook = async () => {
            try {
                const res = await axios.get("http://localhost:5001/book");
                console.log(res.data);
                setBook(res.data);


            } catch (error) {
                console.log(error);

            }
        }
        getBook();
    }, [])
    return (
        <div>
            {
                book.map((item) => (
                    <M_Profile key={item.id} name={item.name} price={item.price} image={item.image} />

                ))
            }

        </div>
    )
}

export default M_Card
