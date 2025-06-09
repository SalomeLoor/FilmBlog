import { useIonAlert, useIonLoading, useIonToast } from "@ionic/react";


// Custom hook to show loading spinner
export function useShowLoading() {
  const [present, dismiss] = useIonLoading();
  const showLoading = async () => {
    await present({
      message: "Continuing, please wait...",
      spinner: "crescent",
      duration: 0, // 👈 importante para que no se cierre solo
      backdropDismiss: false, // 👈 para que el usuario no lo cierre
    });
  };
  return { showLoading, dismiss: async () => await dismiss() };
}


//custom hook to show alert
export function useShowAlert(){
  const [presentAlert] = useIonAlert();
  const showAlert = async(message:string,title:string)=>{
    await presentAlert ({
      header:title,
      message:message,
      buttons:["OK"],
    })
  };
  return showAlert;
}  

//costom hook to show toast
export function useSowToast(){
  const [presentToast] = useIonToast();
  const showToast = async()=>{
    await presentToast (
      {
        message:"Bienvedido a Film Blog ✨",
        duration:1500,
        position:"bottom"
      }
    )
  };
  return showToast
}