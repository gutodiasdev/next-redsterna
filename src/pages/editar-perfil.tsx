import { useState } from "react";
import {
  BackButton,
  Button,
  ButtonFooter,
  CheckboxContainer,
  CheckboxWrapper,
  Container,
  ContainerColumn,
  Description,
  Divider,
  EditForm,
  FileInput,
  Form,
  Input,
  Label,
  SaveButton,
  Select,
  Text,
  TextArea,
  Title,
  TitleContainer
} from "../styles/edit-profile";

import { Field, Formik } from "formik";
import DeleteAccountModal from "../components/deleteItineraryModal";
import { useUser } from "../contexts/user.context";
import Link from 'next/link';

/* eslint-disable */
const Update = () => {
  const { updateUser, user, uploadFile } = useUser();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const icons = {
    editIcon: "/images/desktop/profile/edit_icon.png",
    deleteIcon: "/images/desktop/profile/delete_icon.png",
  };

  const uploadFileCallback = async (file: any) => {
    const response = await uploadFile(file);

    return response;
  };

  const Collapse = (props: any) => {
    const visible = true;

    function isOpen () {
      return;
    }

    return (
      <>
        <Button type="button" onClick={isOpen} style={{ marginTop: 25 }}>
          <Text>{props.title}</Text>
          <img
            src={props.icon}
            height={15}
            width={15}
            alt="Ícone de caneta no papel"
          />
        </Button>
        {visible && props.hiddenContent}
      </>
    );
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
    return errors;
  };

  return (
    <Container>
      <DeleteAccountModal
        isOpen={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
      />
      <TitleContainer>
        <Title>Editar</Title>
        <Description>- Perfil de usuário -</Description>
      </TitleContainer>
      <Divider />
      {user && (
        <Formik
          initialValues={{
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            facebook: user?.social?.facebook,
            instagram: user?.social?.instagram,
            birthdate: user.birthdate,
            about: user.about,
            interests: user.interests,
            gender: user.gender,
            pictures: {
              profile: user.pictures?.profile,
              cover: user.pictures?.cover,
            },
          }}
          // validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            await updateUser(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Collapse
                title="Dados Pessoais"
                hiddenContent={
                  <EditForm>
                    <label>Nome</label>
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

                    <Label>Gênero</Label>
                    <Field
                      name="gender"
                      as={Select}
                      placeholder="Selecione uma opção"
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                      <option value="NB">Não binário</option>
                      <option value="AN">Outro</option>
                    </Field>
                    {errors.gender && <span>{errors.gender}</span>}
                  </EditForm>
                }
                icon={icons.editIcon}
              />

              <Collapse
                title="Informações sobre o usuário"
                hiddenContent={
                  <EditForm>
                    <Label>Sobre você</Label>
                    <Field
                      name="about"
                      as={TextArea}
                      onBlur={handleBlur}
                      value={values.about}
                      onChange={handleChange}
                      placeholder="Queremos saber mais! Qual seu perfil de viajante? Qual foi sua melhor viagem? Do que você mais gosta?"
                    />
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
                          <Field
                            name="interests"
                            value="praia"
                            type="checkbox"
                          />
                          <Label>Praia</Label>
                        </CheckboxContainer>

                        <CheckboxContainer>
                          <Field
                            name="interests"
                            value="montanha"
                            type="checkbox"
                          />
                          <Label>Montanha</Label>
                        </CheckboxContainer>

                        <CheckboxContainer>
                          <Field
                            name="interests"
                            value="camping"
                            type="checkbox"
                          />
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
                          <Field
                            name="interests"
                            value="campo"
                            type="checkbox"
                          />
                          <Label>Campo</Label>
                        </CheckboxContainer>

                        <CheckboxContainer>
                          <Field
                            name="interests"
                            value="cachoeira"
                            type="checkbox"
                          />
                          <Label>Cachoeira</Label>
                        </CheckboxContainer>

                        <CheckboxContainer>
                          <Field
                            name="interests"
                            value="trekking"
                            type="checkbox"
                          />
                          <Label>Trekking</Label>
                        </CheckboxContainer>
                      </ContainerColumn>
                    </CheckboxWrapper>
                  </EditForm>
                }
                icon={icons.editIcon}
              />

              <Collapse
                title="Dados de Acesso"
                hiddenContent={
                  <EditForm>
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
                  </EditForm>
                }
                icon={icons.editIcon}
              />

              <Collapse
                title="Redes sociais"
                hiddenContent={
                  <EditForm>
                    <Label>Instagram</Label>
                    <Field
                      as={Input}
                      type="text"
                      name="instagram"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.instagram}
                      placeholder="redsterna_ig"
                    />
                    <Description>
                      Complete somente com seu nome de usuário (sem @)
                    </Description>
                    <Label>Facebook</Label>
                    <Description>
                      Complete somente com seu nome de usuário
                      (https://www.facebook.com/o nome que aparece aqui)
                    </Description>
                    <Field
                      as={Input}
                      type="text"
                      name="facebook"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.facebook}
                      placeholder="redsterna_fb"
                    />
                  </EditForm>
                }
                icon={icons.editIcon}
              />

              <Collapse
                title="Fotos"
                hiddenContent={
                  <EditForm>
                    <Label>Foto de Pefil</Label>
                    <FileInput
                      type="file"
                      onChange={async (e: any) =>
                        await uploadFileCallback(e.target.files[0]).then(
                          (response) =>
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
                            onClick={() =>
                              setFieldValue("pictures.profile", "")
                            }
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
                    <Label> Foto de Capa</Label>
                    <FileInput
                      type="file"
                      onChange={async (e: any) =>
                        await uploadFileCallback(e.target.files[0]).then(
                          (response) =>
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
                            onClick={() => setFieldValue("pictures.cover", "")}
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
                  </EditForm>
                }
                icon={icons.editIcon}
              />

              <Button
                onClick={() => setIsModalVisible(true)}
                type="button"
                style={{ marginTop: 50 }}
              >
                <Text>Excluir conta</Text>
                <img
                  src={icons.deleteIcon}
                  height={15}
                  width={15}
                  alt="Ícone de caneta no papel"
                />
              </Button>
              <ButtonFooter>
                <Link href="/minha-conta">
                  <BackButton>Voltar</BackButton>
                </Link>
                <SaveButton type="submit">Salvar</SaveButton>
              </ButtonFooter>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default Update;
