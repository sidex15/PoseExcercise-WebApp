import '@/styles/globals.css'
import Cookies from 'js-cookie';
import { useRouter,usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ExerciseContext from "../pages/api/exercise-context";
import UserInfoContext from '@/pages/api/user_info-conntext';
import SessionContext from '@/pages/api/session_result';
import fetchuserinfo from "@/pages/api/userinfo";
import Head from 'next/head';

export default function App({ Component, pageProps }) {

  const [exerName, setExerName] = useState("PUSH-UPS");
  const [postValue, setPostValue] = useState([]);
  const [exerciseReps, setExerciseReps] = useState();
  const [avgRepsSpeed, setAvgRepsSpeed] = useState([]);
  const [exerciseDuration, setExerciseDuration] = useState();
  const [borgQnA, setBorgQnA] = useState([]);
  const [info, setinfo] = useState({})
  const [updatedb, setupdatedb] = useState(0)
  
  const userid = Cookies.get('userinfoid');
  
  const router = useRouter();
  const token = Cookies.get('token');
  const pathname = usePathname();
  useEffect(() => {
    const verifyToken = async () => {
      if (pathname === '/signup') {
        return <Component {...pageProps} />;
      }
        try {
            const res = await fetch('/api/verify-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }
            
            if (pathname === '/personal_details' 
            || pathname === '/biometrics' 
            || pathname === '/invite-code' 
            || pathname === '/reg-success') {
              router.push('/signup');
            }
            else if (pathname === '/login'){
              router.push('/dashboard');
            }   
        } catch (error) {
          if (pathname === '/personal_details' 
          || pathname === '/biometrics' 
          || pathname === '/invite-code' 
          || pathname === '/reg-success') {
            router.push('/signup');
          }
            //router.push('/login');
        }
    }
    const fetchinfo = async (e) => {
      const userinfo = await fetchuserinfo(userid);
      setinfo(userinfo);
    }
    verifyToken();
    fetchinfo();
    console.log('user updated...');
  }, [userid,token, updatedb]);
  return(
    // USER DATA/INFORMATIONS FOR THE UserInfo CONTEXT
    //  value={{userID, setUserID, fname, setFname, mname, setMname, weight, setWeight, age, setAge}}
    <UserInfoContext.Provider value={{info, setinfo, updatedb, setupdatedb}}>
      <ExerciseContext.Provider value={{ exerName, setExerName, postValue, setPostValue }}>
        <SessionContext.Provider value={{exerciseReps, setExerciseReps, avgRepsSpeed, setAvgRepsSpeed, exerciseDuration, setExerciseDuration, borgQnA, setBorgQnA}}>
          <Head>
            <link rel="icon" href="/favicon/ai.jpg" />
          </Head>
          <Component {...pageProps} />
        </SessionContext.Provider>
      </ExerciseContext.Provider>
    </UserInfoContext.Provider>
  )
}
