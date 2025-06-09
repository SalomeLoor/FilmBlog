import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { IUserLogin } from "../Interface/IUser";
import { connectionBackend } from "../Connection/connectionBackend";
import { useShowAlert, useShowLoading, useSowToast } from "../Functions/Hooks";
import { logoGoogle } from "ionicons/icons";

const Login: React.FC = () => {
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); //estado de carga

  const { showLoading, dismiss } = useShowLoading();

  const showAlert = useShowAlert();

  const showToast = useSowToast();

  const router = useIonRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((datosAnteriores) => ({ ...datosAnteriores, [name]: value }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await showLoading();
    setLoading(true); //cambiar a true
    try {
      const { data } = await connectionBackend.post<IUserLogin>(
        "/login",
        dataUser
      );
      console.log("User Logueado", data);
      if (data.message) {
        await showAlert(
          `You have successfully logged in ✨\n${data.message}`,
          "Successful login"
        );

        router.push("/tab/home", "root");

        localStorage.setItem("token", data.token); // para guardar el token en el local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.dataUser.id,
            user: data.dataUser.user,
            email: data.dataUser.email,
          })
        );

        await dismiss();
        await showToast();
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unexpected error. Please try again later.";
      await showAlert(message, "Alert");
      await dismiss();
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ContainerForm">
        <form onSubmit={handleSubmitLogin}>
          <h2 className="H2 oswald">Welcome Back</h2>
          
          <IonInput
            className="ion-input oswald"
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            value={dataUser.email}
            name="email"
            onChange={handleChange}
            required
          />

          <IonInput
            className="ion-input oswald"
            label="Password"
            labelPlacement="floating"
            fill="outline"
            type="password"
            value={dataUser.password}
            name="password"
            onChange={handleChange}
            required
          />

          <IonButton className="btnSumit oswald" type="submit">{loading ? "Logged..." : "Login"}</IonButton>

          <div className="linea">
            <span>or</span>
          </div>

          <IonButton className="btnGoogle oswald">
            <IonIcon className="icon" icon={logoGoogle} /> Continue By Google
          </IonButton>

          <div className="acount oswald">
            <span>Don´t you have an acount?</span>
            <span onClick={() => router.push("/register")}>
              {" "}
              <strong>Register</strong>
            </span>
          </div>
        </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
