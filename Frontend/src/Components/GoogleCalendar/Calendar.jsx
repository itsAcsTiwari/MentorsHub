import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';

const Calendar = () => {
    const clientId = "678513733746-8btk6fia35flkquiuuoa8qes9lim2eef.apps.googleusercontent.com";

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        mentorName: '',
        menteeName: '',
        location: '',
        description: '',
        meetingType: 'oneOnOne'
    });

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const initClient = async () => {
            await gapi.client.init({
                clientId: clientId,
                scope: 'openid email profile https://www.googleapis.com/auth/calendar'
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const responseGoogle = async (response) => {
        console.log('Google Sign-In Success:', response);
        if (response.code) {
            try {
                const res = await axios.post('http://localhost:5001/event/create-tokens', { code: response.code });
                console.log('Backend response:', res.data);
                setSignedIn(true);
                // Handle successful authentication here (e.g., store token, update UI)
            } catch (error) {
                console.error('Error sending code to backend:', error);
            }
        }
    };

    const responseError = (error) => {
        console.error('Google Sign-In Error:', error);
        if (error.error === 'popup_closed_by_user') {
            alert('Sign-in popup was closed by the user. Please try again.');
        } else {
            alert('Error signing in with Google. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Combine date and time for start and end
            const startDateTime = new Date(`${formData.date}T${formData.startTime}`).toISOString();
            const endDateTime = new Date(`${formData.date}T${formData.endTime}`).toISOString();

            // Prepare the event data
            const eventData = {
                summary: formData.title,
                description: formData.description,
                start: {
                    dateTime: startDateTime,
                    timeZone: 'Asia/Kolkata', // Replace with the appropriate timezone
                },
                end: {
                    dateTime: endDateTime,
                    timeZone: 'Asia/Kolkata', // Replace with the appropriate timezone
                },
                location: formData.location,
                attendees: [
                    { 'email': formData.mentorName }, // Assuming mentor name is an email
                    { 'email': formData.menteeName }, // Assuming mentee name is an email
                ],
                reminders: {
                    useDefault: false,
                    overrides: [
                        { 'method': 'email', 'minutes': 24 * 60 },
                        { 'method': 'popup', 'minutes': 10 },
                    ],
                },
            };

            console.log('Sending event data:', eventData);

            // Send the event data to your backend
            const response = await axios.post('http://localhost:5001/event/create-event', eventData);

            console.log('Event created:', response.data);

            // Reset form or show success message
            setFormData({
                title: '',
                date: '',
                startTime: '',
                endTime: '',
                mentorName: '',
                menteeName: '',
                location: '',
                description: '',
                meetingType: 'oneOnOne'
            });
            alert('Meeting created successfully!');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create meeting. Please try again.');
        }
    };
    return (
        <div className='h-screen w-screen bg-white text-black flex flex-col items-center justify-center gap-4'>

            {
                !signedIn ? (

                    <div>
                        <div className="">
                            <h1>Book Your Appointment Here</h1>
                        </div>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText='Sign in & Book Appointment'
                            onSuccess={responseGoogle}
                            onFailure={responseError}
                            cookiePolicy={'single_host_origin'}
                            responseType='code'
                            accessType='offline'
                            scope='openid email profile https://www.googleapis.com/auth/calendar'
                            prompt='consent'
                        />
                    </div>
                ) : (
                    <div className='w-full h-[120vh] bg-blue-300 flex justify-center'>
                        <form onSubmit={handleSubmit} className='flex flex-col w-[600px]  h-[95vh] gap-2 bg-white mt-3 rounded-lg'>

                            <div className='flex flex-col space-y-3 mt-2 ml-4 mt-4'>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="title">Meeting Title:</label>
                                    <input type="text" id="title" name="title" required className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md' value={formData.title} onChange={handleChange} placeholder='Title'  />
                                </div>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="date">Date:</label>
                                    <input type="date" id="date" name="date" required className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md' value={formData.date} onChange={handleChange} />
                                </div>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="startTime">Start Time:</label>
                                    <input type="time" id="startTime" name="startTime" required className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md' value={formData.startTime} onChange={handleChange} />
                                </div>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="endTime">End Time:</label>
                                    <input type="time" id="endTime" name="endTime" required className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md' value={formData.endTime} onChange={handleChange} />
                                </div>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="mentorName">Mentor Name:</label>
                                    <input type="text" id="mentorName" name="mentorName" required className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md' value={formData.mentorName} onChange={handleChange} placeholder="Enter Mentor's Name"/>
                                </div>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="menteeName">Mentee Name:</label>
                                    <input type="text" id="menteeName" name="menteeName" required className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md' value={formData.menteeName} onChange={handleChange} placeholder="Enter Mentee's Name"/>

                                </div>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="location">Location:</label>
                                    <input type="text" id="location" name="location" placeholder="e.g., Zoom link, Room number, etc." className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md w-[300px]' value={formData.location} onChange={handleChange} />

                                </div>

                                <div className='flex flex-row items-center'>
                                    <label htmlFor="meetingType">Meeting Type:</label>
                                    <select className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md' id="meetingType" name="meetingType" value={formData.meetingType} onChange={handleChange}>
                                        <option value="oneOnOne">One-on-One</option>
                                        <option value="groupSession">Group Session</option>
                                        <option value="workshop">Workshop</option>
                                    </select>
                                </div>

                                <div className='flex flex-row' >
                                    <label htmlFor="description">Meeting Description:</label>
                                    <textarea id="description" name="description" rows="3" cols="0" className='bg-gray-200 ml-2 border-none outline-none px-2 py-1 rounded-md w-[300px] ' value={formData.description} onChange={handleChange} placeholder='Your Description'></textarea>
                                </div>



                            </div>
                            <button className='bg-blue-500 text-white rounded-lg w-[250px] h-10 self-center mt-6' type="submit">Create Meeting</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default Calendar;
