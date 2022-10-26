import { Field, Formik } from "formik";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../contexts/auth.context";
import { useUser } from "../contexts/user.context";
import {
  Button,
  Checkbox,
  CheckboxContainer,
  CheckboxWrapper,
  Container,
  ContainerColumn,
  Description,
  Divider,
  FileInput,
  FormContainer,
  InformationText,
  Input,
  Label,
  Link,
  Select,
  Text,
  TextArea,
  Title,
  TitleContainer
} from "../styles/register";

/* eslint-disable */
const Register = () => {
  const { signUp } = useAuth();
  const { uploadFile } = useUser();
  const router = useRouter();

  const uploadFileCallback = async (file: any) => {
    const response = await uploadFile(file);

    return response;
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Campo obrigatório";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "E-mail inválido";
    }
    if (!values.password) {
      errors.password = "Insira sua senha";
    }
    if (!values.firstname) {
      errors.firstname = "Este campo é obrigatório";
    }
    if (!values.lastname) {
      errors.lastname = "Este campo é obrigatório";
    }
    if (!values.birthdate) {
      errors.birthdate = "Este campo é obrigatório";
    }
    if (values.password && values.password.length < 6) {
      errors.password = "Insira no mínimo 6 caracteres";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Senhas não conferem";
    }
    if (!values.confirmPolicy) {
      errors.confirmPolicy = "Campo obrigatório";
    }
    if (!values.gender || values.gender === "") {
      errors.gender = "Campo obrigatório";
    }
    return errors;
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Cadastre-se</Title>
        <Description>Novo usuário Redsterna</Description>
      </TitleContainer>
      <Divider />
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          country: "",
          birthdate: "",
          email: "",
          password: "",
          confirmPassword: "",
          interests: [],
          social: {
            facebook: "",
            instagram: "",
          },
          pictures: {
            profile: "",
            cover: "",
          },
          gender: "M",
          about: "",
          confirmPolicy: [],
        }}
        // validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          await signUp(values).then(() => {
            try {
              toast.success("Conta criada com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setTimeout(() => router.push("/"), 3500);
            } catch (e) {
              toast.error("Não foi possível editar os dados, tente novamente", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <Label>Nome</Label>
              <Field
                as={Input}
                name="firstname"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
              />
              {errors.firstname && <span>{errors.firstname}</span>}

              <Label>Sobrenome</Label>
              <Field
                as={Input}
                name="lastname"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
              />
              {errors.lastname && <span>{errors.lastname}</span>}

              <Label>País</Label>
              <Field
                as={Input}
                name="country"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              />

              <Label>Data de Nascimento</Label>
              <Field
                as={Input}
                name="birthdate"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.birthdate}
              />
              {errors.birthdate && <span>{errors.birthdate}</span>}

              <Label>E-mail</Label>
              <Field
                as={Input}
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && <span>{errors.email}</span>}

              <Label>Sobre você</Label>
              <Field
                name="about"
                as={TextArea}
                onBlur={handleBlur}
                value={values.about}
                onChange={handleChange}
                placeholder="Queremos saber mais! Qual seu perfil de viajante? Qual foi sua melhor viagem? Do que você mais gosta?"
              />

              <Label>Instagram</Label>
              <Field
                as={Input}
                type="text"
                name="social.instagram"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.social.instagram}
                placeholder="redsterna_ig"
              />

              <Label>Facebook</Label>
              <Field
                as={Input}
                type="text"
                name="social.facebook"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.social.facebook}
                placeholder="redsterna_fb"
              />

              <Label>Gênero</Label>
              <Field
                value={values.gender}
                name="gender"
                as={Select}
                onChange={handleChange}
                placeholder="Selecione uma opção"
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="NB">Não binário</option>
                <option value="AN">Outro</option>
              </Field>
              {errors.gender && <span>{errors.gender}</span>}

              <CheckboxWrapper>
                <ContainerColumn>
                  <CheckboxContainer>
                    <Field
                      name="interests"
                      value="cidade histórica"
                      type="checkbox"
                    />
                    <Label>Cidade Histórica</Label>
                  </CheckboxContainer>

                  <CheckboxContainer>
                    <Field name="interests" value="praia" type="checkbox" />
                    <Label>Praia</Label>
                  </CheckboxContainer>

                  <CheckboxContainer>
                    <Field name="interests" value="montanha" type="checkbox" />
                    <Label>Montanha</Label>
                  </CheckboxContainer>

                  <CheckboxContainer>
                    <Field name="interests" value="camping" type="checkbox" />
                    <Label>Camping</Label>
                  </CheckboxContainer>
                </ContainerColumn>

                <ContainerColumn>
                  <CheckboxContainer>
                    <Field
                      name="interests"
                      value="cidade moderna"
                      type="checkbox"
                    />
                    <Label>Cidade Moderna</Label>
                  </CheckboxContainer>

                  <CheckboxContainer>
                    <Field name="interests" value="campo" type="checkbox" />
                    <Label>Campo</Label>
                  </CheckboxContainer>

                  <CheckboxContainer>
                    <Field name="interests" value="cachoeira" type="checkbox" />
                    <Label>Cachoeira</Label>
                  </CheckboxContainer>

                  <CheckboxContainer>
                    <Field name="interests" value="trekking" type="checkbox" />
                    <Label>Trekking</Label>
                  </CheckboxContainer>
                </ContainerColumn>
              </CheckboxWrapper>

              <Label>Foto de Pefil</Label>
              <FileInput
                type="file"
                onChange={async (e: any) =>
                  await uploadFileCallback(e.target.files[0]).then((response) =>
                    setFieldValue("pictures.profile", response)
                  )
                }
              />
              {values.pictures.profile && values.pictures.profile !== "" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      marginTop: 10,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setFieldValue("cover", "")}
                    >
                      X
                    </button>
                    <img
                      src={values.pictures.profile}
                      width={200}
                      height={200}
                      alt="cover"
                    />
                  </div>
                </div>
              )}
              <Label>Foto de Capa</Label>
              <FileInput
                type="file"
                onChange={async (e: any) =>
                  await uploadFileCallback(e.target.files[0]).then((response) =>
                    setFieldValue("pictures.cover", response)
                  )
                }
              />
              {values.pictures.cover && values.pictures.cover !== "" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      marginTop: 10,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setFieldValue("cover", "")}
                    >
                      X
                    </button>
                    <img
                      src={values.pictures.cover}
                      width={200}
                      height={200}
                      alt="cover"
                    />
                  </div>
                </div>
              )}

              <Label>Senha</Label>
              <Field
                as={Input}
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && <span>{errors.password}</span>}

              <Label> Repetir Senha</Label>
              <InformationText>
                Sua senha deve conter, pelo menos, uma letra maiúscula, um
                número e um caractere especial (por exemplo: ! # $ % &).
              </InformationText>
              <Field
                as={Input}
                type="password"
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
              <Text>
                Ao cadastrar-se, você concorda com a{" "}
                <Link>Política de Privacidade </Link>e os
                <Link> Termos de Uso</Link> da plataforma.
              </Text>
              <CheckboxContainer>
                <Label>Selecione as suas opções de interesse:</Label>
                <Label>Concordo</Label>
                <Checkbox
                  type="checkbox"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPolicy"
                  value="confirmed"
                />
              </CheckboxContainer>
              {errors.confirmPolicy && <span>{errors.confirmPolicy}</span>}
              <Button type="submit">Cadastrar</Button>
            </FormContainer>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
