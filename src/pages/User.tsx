import { IonButton, IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import React from 'react'
import { useAuth } from '../Functions/auth'
import '../Css/User.css'
import { mail, person } from 'ionicons/icons'


const User:React.FC = () => {
   const router = useIonRouter();
 
  const logout = useAuth();

  const dataUserString = localStorage.getItem("user");
  const dataUser = dataUserString ? JSON.parse(dataUserString) : null;

  return (
    <IonPage>
        <IonContent fullscreen >
        
        {
          dataUser? (
        <div className='Container-user ion-padding'>
          <h2 className='H2 oswald'>Profile</h2>
          <div className='oswald'>
            <p><IonIcon icon={person}/>  {dataUser?.user}</p>
            <p><IonIcon icon={mail} /> {dataUser?.email}</p>
          </div>
          <IonButton className='btnSumit ' onClick={logout}>Log Out</IonButton>
        </div>
          ) 
          : (
            <p> No estas Loguedao <br />
            <span onClick={() => router.push("/register")}>Register</span>
              <span onClick={() => router.push("/login")}>Login</span>
            </p>
                        
          )
        }

        </IonContent>
    </IonPage>
  )
}

export default User
