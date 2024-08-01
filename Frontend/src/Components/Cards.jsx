
import { Link } from 'react-router-dom';


const Cards = ({ item }) => {
    return (

        <div className='mt-4 my-3 p-1'>
            <div className="card w-72  mr-4 bg-white shadow-md hover:scale-105 duration-200 h-[500px]">
                <figure className="h-2/3  ">
                    <img
                        className='object-cover w-full h-full'
                        src={item.image}
                        alt="img"
                    />
                </figure>
                <div className="card-body text-black p-4">
                    {/* <hr className='border-b border-gray-400' /> */}
                    <h2 className="card-title">
                        {item.name}
                        <div className="badge badge-secondary">{item.category}</div>
                    </h2>
                    <p>{item.title}</p>
                    <div className="card-actions justify-between">
                        <div className="badge badge-outline bg-orange-500 text-white">${item.price}</div>
                        <div className="cursor-pointer px-2 rounded-full border-[1px] hover:bg-pink-500 hover:text-white duration-200 hover:border-none"> <Link to={`/mentor/${item._id}`}>Book now</Link></div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Cards;
