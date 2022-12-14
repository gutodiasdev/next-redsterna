import * as S from "./style";

import { Formik, Field } from "formik";

import Modal from "react-modal";

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const LoginModal = (props: any) => {
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "580px",
      height: "580px",
      borderRadius: "15px",
    },
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
    if (values.password && values.password.length < 6) {
      errors.password = "Insira no mínimo 6 caracteres";
    }
    return errors;
  };

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <S.Wrapper>
          <S.Container>
            <S.RowContainer>
              <S.CloseButton onClick={props.closeModal}>
                <Image
                  src="/images/close_icon.png"
                  alt="close_icon"
                  height={20}
                  width={20}
                />
              </S.CloseButton>
            </S.RowContainer>

            <S.TitleContainer>
              <S.Title>Entrar</S.Title>
              <S.Description>
                Entre com seu e- mail e senha cadastrados
              </S.Description>
            </S.TitleContainer>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={validate}
              onSubmit={async (values) => {
                // signIn(values).then(() => {
                //   router.push('/minha-conta');
                // });
              }
              }
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <S.FormContainer>
                    <S.Label>E-mail</S.Label>
                    <Field
                      name="email"
                      as={S.Input}
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && <span>{errors.email}</span>}
                    <S.Label>Senha</S.Label>
                    <Field
                      name="password"
                      as={S.Input}
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && <span>{errors.password}</span>}
                    <S.Button type="submit">Entrar</S.Button>
                    {/* <FacebookButton type="submit">
                  Entrar com Facebook
                </FacebookButton> */}
                    <S.AncorWrapper>
                      {" "}
                      <Link href="/recuperar-conta">
                        <S.Ancor >
                          Esqueceu sua senha?
                        </S.Ancor>
                      </Link>
                      <Link href="/cadastre-se">
                        <S.Ancor>Cadastre-se!</S.Ancor>
                      </Link>
                    </S.AncorWrapper>
                  </S.FormContainer>
                </form>
              )}
            </Formik>
          </S.Container>
        </S.Wrapper>
      </Modal>
    </div>
  );
};

export default LoginModal;
