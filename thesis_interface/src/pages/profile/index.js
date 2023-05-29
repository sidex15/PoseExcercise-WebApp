import Layout from "@/components/Layout";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { RiEditLine, RiSave3Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { VscEdit } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { useState, useEffect, useContext } from "react";
import UserInfoContext from '@/pages/api/user_info-conntext';
import male_avatar from '@/img/male_avatar.png';
import female_avatar from '@/img/female_avatar.png';
import Image from "next/image";
import Userinfo from "../personal_details";
import Head from "next/head";
import { Modal } from "flowbite-react";
import { Button } from "flowbite-react";
import { GiConfirmed } from "react-icons/gi";
import { Card } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRowState } from "react-table";

const Profile = () => {
    const { info, updatedb, setupdatedb } = useContext(UserInfoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState({});
    const [bday, setBday] = useState();
    const [sex, setSex] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [Invcode,setInvcode] = useState();
    const [Coach, setCoach] = useState({});
    const [saveBtnToggled, setSaveBtnToggled] = useState(false);
    const [userHaveCoach, setUserHaveCoach] = useState(false);
    const userid = Cookies.get('userinfoid');
    let counter = updatedb
    let curcoach = info.coach

    useEffect(() => {
        setName({
            firstName: info.firstName,
            middleName: info.middleName,
            lastName: info.lastName,
        })
        setBday(info.birthDate)
        setSex(info.sex)
        setHeight(info.height)
        setWeight(info.weight)
        //console.log(weight)
        const currentcoach = async(e) =>{
            try {
                const res = await fetch('/api/fetchcoach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({curcoach}),
                });
        
            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }
        
            // store the token in a cookie
            const { coachinfo } = await res.json();
            //console.log(coachinfo);
            const fcoachinfo = coachinfo;
            setCoach(fcoachinfo);
            setUserHaveCoach(true);
        
            } catch (error) {
                console.log(error);
                setUserHaveCoach(false)

            }
        }
        currentcoach();
    },[info])

    const invcode = (e) => {
        setInvcode(e.target.value);
    };
    
    const updateuser = async (e) => {
        const updatedprofile = {
            ...name, sex: sex, userid, birthDate: bday, weight:weight, height:height
        }
        console.log(updatedprofile);
        try {
          const response = await fetch('/api/updateuser', {
            method: 'POST',
            body: JSON.stringify(updatedprofile),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const data = await response.json();
            //console.log(data.message);
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // close after 3 seconds
                hideProgressBar: true, // hide the progress bar
                closeOnClick: true, // close on click
                pauseOnHover: true, // pause on hover
                draggable: true, // allow dragging
              });
          } else {
            console.error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
        setupdatedb(counter += 1);
      };

    const setcoach = async (e) => {
        const coach = {invcode:Invcode, userid: userid}
        //console.log(coach);
        if(Invcode==info.invcode){
            toast.error("Do not use your own Invite code", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // close after 3 seconds
                hideProgressBar: true, // hide the progress bar
                closeOnClick: true, // close on click
                pauseOnHover: true, // pause on hover
                draggable: true,}) // allow dragging
            return;
        }
        try {
          const response = await fetch('/api/setcoach', {
            method: 'POST',
            body: JSON.stringify(coach),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const data = await response.json();
            //console.log(data.message);
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // close after 3 seconds
                hideProgressBar: true, // hide the progress bar
                closeOnClick: true, // close on click
                pauseOnHover: true, // pause on hover
                draggable: true, // allow dragging
              });
          } else {
            toast.error("Coach Not Found!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // close after 3 seconds
                hideProgressBar: true, // hide the progress bar
                closeOnClick: true, // close on click
                pauseOnHover: true, // pause on hover
                draggable: true,}) // allow dragging
            console.error(error);
            console.error(`HTTP error! status: ${response.status}`);
          }
        } catch {}
        setupdatedb(counter += 1);
      };
    
    const deletecoach = async (e) => {
        const coach = {coachid:Coach._id, userid: userid}
        //console.log(coach);
        try {
          const response = await fetch('/api/deletecoach', {
            method: 'POST',
            body: JSON.stringify(coach),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const data = await response.json();
            //console.log(data.message);
            toast.info(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // close after 3 seconds
                hideProgressBar: true, // hide the progress bar
                closeOnClick: true, // close on click
                pauseOnHover: true, // pause on hover
                draggable: true, // allow dragging
              });
          } else {
            console.error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
        setupdatedb(counter += 1);
      };
    const handleAvatarSelected = () => {
        
        if(info.sex=="Male" || setSex=="Male" || Coach.sex=="Male"){
            return male_avatar;
        }else if(info.sex=="Female" || setSex=="Female" || Coach.sex=="Female"){
            return female_avatar;
        }
    }

    const handleCoachAvatarSelected = () => {
        
        if(Coach.sex=="Male"){
            return male_avatar;
        }else if(Coach.sex=="Female"){
            return female_avatar;
        }
    }

    const discardEditing = () => {
        setName({
            firstName: info.firstName,
            middleName: info.middleName,
            lastName: info.lastName,
        })
        setIsEditing(false);
        setBday(info.birthDate);
        setSex(info.sex);
        setHeight(info.height);
        setWeight(info.weight);
        setIsEditing(false);
    }

    const handleSex = (e) => {
        setSex(e.target.value);
    }

    const handlename = (e) => {
        setName({...name, [e.target.name]: e.target.value});
    }

    const handleDateChange = (event) => {
        setBday(event.target.value);
    }

    const handleweight = (e) => {
        setWeight(e.target.value);
    }

    const handleheight = (e) => {
        setHeight(e.target.value);
    }

    return (
        <Layout>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="absolute h-full w-full bg-white overflow-scroll">
                <form className="h-auto w-full flex flex-col items-center pt-12 2xl:pt-20">
                    <fieldset className="flex flex-col items-center w-3/4 p-7 rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
                        <div className="w-full flex justify-end items-center">
                            {isEditing ? (
                                <button type="button" onClick={discardEditing}><RxCross1 className="text-2xl" color="#023E8A"/></button>

                            ):
                                <button type="button" onClick={()=>{setIsEditing(true)}}><FiEdit className="text-2xl" color="#023E8A"/></button>
                            }
                            </div>
                        <div className="pb-10 text-center">
                            <h1 className="font-medium text-5xl text-cyan-blue">Your Profile</h1>
                        </div>
                        <div className="w-full items-center p-3">
                            <div className="grid sm:grid-cols-1 sm:items-center sm:justify-center xl:grid-cols-5 gap-5 2xl:gap-20 w-full">
                                <div className="grid col-span-3 xl:col-span-2">
                                    <div className="flex items-center justify-center">
                                        <Image src={handleAvatarSelected()} className="w-3/4 rounded-full shadow-lg"></Image>
                                    </div>
                                </div>
                                <div className="grid xl:gap-4 2xl:gap-7 col-span-3">
                                    {!isEditing?(
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="name" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Name: </label> 
                                            <input type='text' name='name' placeholder={name.firstName + ' ' + name.middleName + ' ' + name.lastName} disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500 text-blue-500"/>
                                        </div>
                                    ):
                                        <>
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="fname" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">First Name: </label> 
                                            <input type='text' name='firstName' value={name.firstName} onChange={handlename} placeholder={info.firstName}
                                                disabled={isEditing==true?false:true} 
                                                className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500 text-blue-500"/>
                                        </div>
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="mname" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Middle Name: </label> 
                                            <input type='text' name='middleName' value={name.middleName} onChange={handlename} placeholder={info.middleName}
                                                disabled={isEditing==true?false:true} 
                                                className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500 text-blue-500"/>
                                        </div>
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="lname" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Last Name: </label> 
                                            <input type='text' name='lastName' value={name.lastName} onChange={handlename} placeholder={info.lastName}
                                                disabled={isEditing==true?false:true} 
                                                className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500 text-blue-500"/>
                                        </div>
                                        </>
                                    }
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="birthdate" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Birthdate: </label>
                                        <input type='date' name='birthDate' value={bday} onChange={handleDateChange} disabled={isEditing==true?false:true} className="px-4 py-1 lg:text-xl 2xl:text-2xl border-2 col-span-3 text-blue-500"/>
                                    </div>
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="Gender" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Sex: </label>                                 
                                        <select name="sex" disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 text-blue-500" value={sex} onChange={handleSex}>
                                            <option selected={sex=='Male' ? true : false} value='Male'>Male</option>
                                            <option selected={sex=='Female' ? true : false}value='Female'>Female</option>
                                        </select>
                                    </div>
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="height" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Height: </label>
                                        <input type='number' name='height' value={height} onChange={handleheight} placeholder={`${info.height} ${!isEditing==true?'cm' : ''}`} disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500 text-blue-500"/>
                                    </div>
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="weight" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Weight: </label>
                                        <input type='number' name='weight' value={weight} onChange={handleweight} placeholder={`${info.weight} ${!isEditing==true?'kg' : ''}`} disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500 text-blue-500"/>
                                    </div>
                                    <div className="flex justify-end">
                                        {isEditing?(
                                            <>
                                                <Button onClick={()=>setSaveBtnToggled(true)}>Save</Button>
                                                <Button color="gray" className="ml-4" onClick={discardEditing}>Close</Button>
                                            </>
                                        ):
                                            ''
                                        }
                                    </div>
                                    <Modal show={saveBtnToggled} size="md" popup={true} onClose={()=>setSaveBtnToggled(false)}>
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className="text-center">
                                                <GiConfirmed className="mx-auto mb-4 h-14 w-14 text-sky-400 dark:text-gray-200" />
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                Do you want to save changes in your profile?
                                                </h3>
                                                <div className="flex justify-center gap-4">
                                                    
                                                {/* Insert onclick property and trigger update query to db */}
                                                <Button onClick={()=>{updateuser(); setSaveBtnToggled(false); discardEditing();}}>
                                                    Confirm
                                                </Button>

                                                <Button color="gray" onClick={()=>setSaveBtnToggled(false)}>
                                                    Cancel
                                                </Button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className="h-auto w-full flex flex-col items-center mt-20">
                    <div className="flex flex-col items-center w-3/4 p-7 rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
                        <div className="pb-10 text-center">
                            <h1 className="font-medium text-5xl text-cyan-blue">Your Coach</h1>
                        </div>
                        <Card>
                            <div className="flex justify-end px-4 pt-2">
                                {userHaveCoach?(
                                    <Dropdown inline={true} label="">
                                        <Dropdown.Item>
                                        <a href="#" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={deletecoach}>
                                            Remove
                                        </a>
                                        </Dropdown.Item>
                                    </Dropdown>
                                ):
                                    ''
                                }
                            </div>
                            <div className="flex flex-col items-center pb-4 px-10">
                                {userHaveCoach?(
                                    // Make it dynamic by getting coach's sex or gender
                                    <Image src={handleCoachAvatarSelected()} className="mb-3 h-24 w-24 rounded-full shadow-lg"></Image>
                                ):
                                    // Default Avatar
                                    <AiOutlineQuestionCircle className="mb-3 h-24 w-24 rounded-full shadow-lg text-lg text-gray-400"/>
                                }
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {userHaveCoach?(
                                        <>
                                            {/* SET Coach's Name here */}
                                            {Coach.firstName+' '+Coach.middleName+' '+Coach.lastName}
                                        </>
                                    ):
                                        <>
                                            None
                                        </>
                                    }
                                    
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Your current Coach
                                </span>
                            </div>
                        </Card>

                        {!userHaveCoach?(
                            <div className="max-w-sm mt-10">
                                <Card>
                                    <h2 class="text-3xl font-bold text-cyan-blue">Connect with your Coach now!</h2>
                                    <p class="text-lg mb-4">You can give him access to your Exercise session Records.</p>
                                    <form className="grid grid-cols-5 px-4">
                                        <div className="mb-2 col-span-5">
                                            <Label htmlFor="coachCode" value="Enter Coach code:"/>
                                        </div>
                                        <div className="col-span-3 flex justify-center items-center">
                                            <TextInput value={Invcode} onChange={invcode} type="text" placeholder="Code" required={true}/>
                                        </div>
                                        <div className="col-span-2 flex justify-end items-center">
                                            <Button type="button" onClick={setcoach}>Continue</Button>
                                        </div>
                                    </form>
                                </Card>
                            </div>
                        ):
                        ''
                        }

                        <div class="py-10 px-10 mt-10 bg-gray-100 text-gray-800">
                            <h2 class="text-3xl font-bold mb-4">Introducing our Coach feature</h2>
                            <p class="text-lg mb-4">Welcome to our fitness web app! Our platform is designed to help you achieve your fitness goals by providing you with the tools and resources you need to stay on track. One of the key features of our app is the ability to work with a professional coach.</p>
                            <div class="container mx-auto mt-10">
                                <h1 class="text-2xl font-bold mb-5">Our Fitness Web App</h1>
                                <ul class="list-disc list-inside">
                                    <li class="mb-3">Our fitness web app helps you achieve your fitness goals with tools and resources.</li>
                                    <li class="mb-3">The app includes a feature to connect with a professional coach.</li>
                                    <li class="mb-3">The coach can view your exercise records to provide personalized feedback and support.</li>
                                    <li class="mb-3">Only one coach can be connected at a time to ensure focused attention and support.</li>
                                    <li class="mb-3">The coach feature can help you stay motivated and on track towards achieving your goals.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> 
                <ToastContainer/>               
            </div>
        </Layout>
    );
}

export default Profile;