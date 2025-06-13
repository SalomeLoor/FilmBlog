import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { connectionBackend } from "../Connection/connectionBackend";
import { useShowAlert, useShowLoading, useSowToast } from "../Functions/Hooks";
import "../Css/Register.css";
import { logoGoogle } from "ionicons/icons";
import { IDataUser } from "../Interface/IUser";

const Register: React.FC = () => {
  const [dataUser, setDataUser] = useState({
    user: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); //estado de carga

  // Obtener showLoading y dismiss del hook useShowLoading personalizado
  const { showLoading, dismiss } = useShowLoading();

  // Obtener el Alert del hook useShowAlert personalizado
  const showAlert = useShowAlert();

  //mostrar un mensaje de bienvenida con toast
  const showToast = useSowToast();

  const router = useIonRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((datosAnteriores) => ({ ...datosAnteriores, [name]: value }));
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault(); //evita que la pagina se recargue
    await showLoading(); // mostrar loading
    setLoading(true);

    try {
      const { data } = await connectionBackend.post<IDataUser>("/register", dataUser);
      console.log("Datos enviados:", data);
      //aqui se usa el alert
      if (data.message) {
        await showAlert(
          `You have successfully registered ✨\n${data.message}`,
          "Registration Successful"
        );

        router.push("/tab/home", "root");

        localStorage.setItem("token", data.token); // para guardar el token en el local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.users.id,
            user: data.users.user,
            email: data.users.email,
          })
        );
        await dismiss(); // 👈 aseguramos que se cierre antes de navegar
        //aqui usar la funcion del toast
        await showToast();
      }
    } catch (error: any) {
      //usar aqui el alert
      console.log(error);
      const message =
        error?.response?.data?.message ||
        "Unexpected error. Please try again later.";
      await showAlert(message, "Registration Failed");
      await dismiss(); // 👈 cerrar loading aunque haya error
    } finally {
      setLoading(false);
    }
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ContainerForm">
          <form onSubmit={handleSubmitRegister}>
            <h2 className="H2 oswald">Get Started</h2>

            <IonInput
              className="ion-input oswald"
              label="Name"
              labelPlacement="floating"
              fill="outline"
              type="text"
              value={dataUser.user}
              name="user"
              onChange={handleChange}
              required
            />

            <IonInput
              className="ion-input oswald"
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              name="email"
              value={dataUser.email}
              onChange={handleChange}
              required
            />

            <IonInput
              className="ion-input oswald"
              label="Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              name="password"
              value={dataUser.password}
              onChange={handleChange}
              required
            />

            <IonButton className="btnSumit oswald" type="submit">
              {loading ? "Registering..." : "Registrer"}
            </IonButton>

            <div className="linea">
              <span>or</span>
            </div>

            <IonButton className="btnGoogle oswald">
              <IonIcon className="icon" icon={logoGoogle} /> Continue By Google
            </IonButton>

            <div className="acount oswald">
              <span>Do you have an acount?</span>
              <span onClick={() => router.push("/login")}>
                {" "}
                <strong>Login</strong>
              </span>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
