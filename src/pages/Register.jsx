import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Ime mora imati bar 2 karaktera")
      .required("Ime je obavezno"),
    email: Yup.string()
      .email("Neispravan email format")
      .required("Email je obavezan"),
    password: Yup.string()
      .min(6, "Lozinka mora imati najmanje 6 karaktera")
      .required("Lozinka je obavezna"),
  });

  const onSubmit = async (values) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "user",
    };

    await api.createUser(newUser);
    navigate("/login");
  };

  return (
    <div>
      <h2>Registracija</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <Field name="name" placeholder="Ime" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <Field name="password" type="password" placeholder="Lozinka" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit">Registruj se</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
