import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import home from './home.png';
import clock from './time.png';
import call from './phone.png';
import message from './messenger.png';
import briefcase from './briefcase.png';
import circle from './circle.png';
import location from './placeholder.png';
import clock2 from './clock.png';
import star from './star.png';

const M_Profile = () => {
  const navigate = useNavigate()

  const [mentor, setMentor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getMentor = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/book/${id}`);
        setMentor(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMentor();
  }, [id]);

  if (!mentor) return <div>Loading...</div>;

  return (
    <div>
      <div className='bg-blue-500 w-full h-[200px] text-white relative'>
        <div className='flex gap-4 items-center mx-8 py-8'>
          <a href='/'> <img className='h-[25px] w-[25px] ' src={home} alt="" /></a>
          <span> `&gt` </span>
          <span><a href="/mentors">Find a Mentor</a></span>
        </div>

        <div className='w-[400px] h-[450px] fixed top-20 bottom-0 left-[700px] bg-white rounded-lg text-black border-[2px] border-gray-300'>
          <div className='grid grid-cols-2 mt-4'>
            <div className='grid'>
              <button>Mentorship Plans</button>
              <div className='border mt-2 border-green-500'></div>
            </div>
            <div className='grid'>
              <button>Session</button>
              <div className='border mt-2 border-gray-500'></div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-center'>
            <div className='border border-green-200 w-[350px] h-[40px] flex justify-center items-center space-x-16 rounded-lg'>
              <span className='text-center'>Lite</span>
              <span className='bg-green-300 p-2'>Standard</span>
              <span className=''>Pro</span>
            </div>
          </div>

          <div className='mx-6 mt-6'>
            <div>
              <span className='text-4xl font-semibold'>{mentor.price}</span>
              <span>/month</span>
            </div>
            <p className='mt-2 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse non provident nisi ex eius!</p>

            <div className='mt-4 space-y-2'>
              <span className='flex gap-2'> <img className='w-[20px] h-[20px]' src={call} alt="" /> 2 calls per month (30min/call)</span>
              <span className='flex gap-2'> <img className='w-[20px] h-[20px]' src={message} alt="" /> Unlimited Q&A via chat</span>
              <span className='flex gap-2'><img className='w-[20px] h-[20px]' src={clock} alt="" /> Expect responses in 2 days</span>
              <span className='flex gap-2'><img className='w-[20px] h-[20px]' src={briefcase} alt="" /> Hands-on support</span>
            </div>


            <button onClick={() => navigate("/calendar")} className='w-full h-[40px] bg-green-600 rounded-lg text-white mt-4'>Apply now</button>


          </div>
        </div>

        <div className='w-[200px] h-[200px] rounded-full border border-white border-[2px] absolute top-24 left-16 overflow-hidden'>
          <img src={mentor.image} alt="" />
        </div>
      </div>

      <div className='w-full h-[500px] bg-white py-24 flex gap-2'>
        <div className='mx-10 py-4 w-[270px] h-[300px] text-black flex flex-col gap-2'>
          <span className='font-semibold text-2xl'>{mentor.name}</span>
          <span>Senior UX Designer @ Cerved Group SPA</span>
          <span className='text-green-600'>6+ years of experience in UX Design | Mentoring students and young professionals since 2019</span>

          <div className='mt-4 space-y-2'>
            <span className='flex gap-2'><img className='w-[20px] h-[20px]' src={location} alt="" />Italy</span>
            <span className='flex gap-2'><img className='w-[20px] h-[20px]' src={star} alt="" />5.0 (18reviews)</span>
            <span className='flex gap-2'><img src={clock2} className='w-[20px] h-[20px]' alt="" />Active today</span>
            <span className='flex gap-2'><img src={circle} alt="" className='w-[20px] h-[20px]' />Usually responds in a few hours</span>
          </div>
        </div>

        <div className='w-[300px] h-[250px] text-black mt-4'>
          <span className='mx-2 '>Skills</span>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            <span className='bg-gray-200 rounded-full px-4 py-2'>UX Research</span>
            <span className='bg-gray-200 rounded-full px-4 py-2'>UX Design</span>
            <span className='bg-gray-200 rounded-full px-4 py-2'>UX Strategy</span>
            <span className='bg-gray-200 rounded-full px-4 py-2'>UX & Design</span>
            <span className='bg-gray-200 rounded-full px-4 py-2'>Figma</span>
            <span className='underline mt-3 ml-4'>+23 more</span>
          </div>
        </div>
      </div>

      <hr />

      <div id="about" className='w-full h-[400px] bg-white px-10 py-10 text-black'>
        <span className='text-2xl'>About</span>
        <div className='w-[600px] mt-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit numquam, alias adipisci doloremque vel dolor culpa quaerat, ad perferendis fugit asperiores dolorum aut error! Minus explicabo repellendus placeat soluta repellat tenetur unde in nam. Atque rem esse inventore possimus tenetur est, nemo quae? Eum delectus vero nobis, ullam saepe dicta. Eum cum nulla molestiae provident magni dolorum nam inventore dolor omnis vel. Iure dolorem eum quidem delectus inventore esse consequuntur ipsam deserunt dicta ea atque iste voluptatum ratione tempora quisquam ut architecto eligendi veritatis repellendus, dolor rerum, autem nam. Ratione aliquam delectus, expedita explicabo obcaecati quae? Laborum in ullam quidem.
        </div>
      </div>
    </div>
  );
};

export default M_Profile;
