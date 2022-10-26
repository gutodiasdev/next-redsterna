import { Field, FieldArray, Formik, useFormikContext } from "formik";
import React from "react";
import { toast } from "react-toastify";

import { useItineraries } from "../contexts/itinerary.context";
import { useUser } from "../contexts/user.context";

import CityForm from "../components/cities";

import "react-toastify/dist/ReactToastify.css";
import * as S from "../styles/create-itineraries";
import { useRouter } from 'next/router';

const FormikObserver = () => {
  const { values } = useFormikContext();
  React.useEffect(() => {
    window.localStorage.setItem("itinerary", JSON.stringify(values));
  }, [values]);

  return null;
};

/* eslint-disable */
const Itinerary = () => {
  const { uploadFile } = useItineraries();
  const { user } = useUser();
  const router = useRouter();

  const formEmptyValues = {
    author: user._id,
    made: "true",
    title: "",
    tripDate: "",
    cover: "",
    interests: [],
    days: 1,
    spent: 0.0,
    simple: {
      summary: "",
      cities: [],
    },
  };

  const emptyCityData = {
    name: "",
    description: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    rate: 0,
    accommodations: [
      {
        name: "",
        rate: 0,
      },
    ],
    images: [],
  };

  const cached: any = window.localStorage.getItem("itinerary");
  const initialValues: any =
    cached && cached !== "" ? JSON.parse(cached) : formEmptyValues;

  const uploadFileCallback = async (file: any) => {
    const response = await uploadFile(file);

    return response;
  };

  return (
    <S.Container>
      <S.FormikContainer>
        <S.Cover>
          <S.CoverIcon src="/images/desktop/create_itinerary.png" />
        </S.Cover>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              // window.localStorage.setItem("itinerary", "");
              // await api.post("/itineraries/create", {
              //   ...values,
              //   author: user._id,
              //   type: "simple",
              //   made: Boolean(values.made === "true"),
              // });
              console.log(values);
              toast.success("Roteiro criado com sucesso", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setTimeout(() => {
                // history.push("minha-conta");
              }, 4000);
            } catch {
              toast.error("Não foi possível criar o roteiro", {
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
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }: any) => {
            return (
              <form onSubmit={handleSubmit}>
                <S.FormContainer>
                  <S.Label>Tipo de roteiro</S.Label>
                  <S.RowContainer>
                    <S.RowContainerOne>
                      <Field
                        as={S.Checkbox}
                        name="made"
                        value="true"
                        type="radio"
                      />
                      <S.ColumnContainer>
                        <S.RowLabel>
                          <S.Label>Feito</S.Label>
                          <S.FollowIcon
                            src="/images/desktop/itinerary/check.png"
                            height={15}
                            width={15}
                          />
                        </S.RowLabel>
                        <S.Description>Essa viagem já foi feita</S.Description>
                      </S.ColumnContainer>
                    </S.RowContainerOne>
                    <S.RowContainerOne>
                      <Field
                        as={S.Checkbox}
                        name="made"
                        value="false"
                        type="radio"
                      />
                      <S.ColumnContainer>
                        <S.RowLabel>
                          <S.Label>Planejado</S.Label>
                          <S.FollowIcon
                            src="/images/desktop/itinerary/send.png"
                            height={20}
                            width={20}
                          />
                        </S.RowLabel>
                        <S.Description>Essa viagem não foi feita</S.Description>
                      </S.ColumnContainer>
                    </S.RowContainerOne>
                  </S.RowContainer>
                  <S.RowContainer>
                    <S.SubContainer>
                      <S.Label>Título da viagem</S.Label>
                      <Field
                        as={S.Input}
                        name="title"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ORLANDO/DISNEY - MIAMI - KEY WEST E NOVA YORK"
                        value={values.title}
                      />
                      {errors.title && <span>{errors.title}</span>}
                    </S.SubContainer>
                  </S.RowContainer>
                  <S.SubContainer>
                    <S.Label>Data da Viagem</S.Label>
                    <Field
                      as={S.MonthInput}
                      name="tripDate"
                      type="date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tripDate}
                    />
                  </S.SubContainer>

                  <S.Label>
                    Quais dessas opções melhor descrevem essa viagem?
                  </S.Label>
                  <S.Description>Selecione: </S.Description>
                  <S.CheckboxWrapper>
                    <S.ContainerColumn>
                      <S.CheckboxContainer>
                        <Field
                          as={S.Checkbox}
                          name="interests"
                          value="cidade histórica"
                          type="checkbox"
                        />
                        <S.CheckboxLabel>Cidade Histórica</S.CheckboxLabel>
                      </S.CheckboxContainer>

                      <S.CheckboxContainer>
                        <Field
                          name="interests"
                          value="praia"
                          type="checkbox"
                          as={S.Checkbox}
                        />
                        <S.CheckboxLabel>Praia</S.CheckboxLabel>
                      </S.CheckboxContainer>

                      <S.CheckboxContainer>
                        <Field
                          as={S.Checkbox}
                          name="interests"
                          value="montanha"
                          type="checkbox"
                        />
                        <S.CheckboxLabel>Montanha</S.CheckboxLabel>
                      </S.CheckboxContainer>

                      <S.CheckboxContainer>
                        <Field
                          name="interests"
                          value="camping"
                          type="checkbox"
                          as={S.Checkbox}
                        />
                        <S.CheckboxLabel>Camping</S.CheckboxLabel>
                      </S.CheckboxContainer>
                    </S.ContainerColumn>

                    <S.ContainerColumn>
                      <S.CheckboxContainer>
                        <Field
                          as={S.Checkbox}
                          name="interests"
                          value="cidade moderna"
                          type="checkbox"
                        />
                        <S.CheckboxLabel>Cidade Moderna</S.CheckboxLabel>
                      </S.CheckboxContainer>

                      <S.CheckboxContainer>
                        <Field
                          name="interests"
                          value="campo"
                          type="checkbox"
                          as={S.Checkbox}
                        />
                        <S.CheckboxLabel>Campo</S.CheckboxLabel>
                      </S.CheckboxContainer>

                      <S.CheckboxContainer>
                        <Field
                          as={S.Checkbox}
                          name="interests"
                          value="cachoeira"
                          type="checkbox"
                        />
                        <S.CheckboxLabel>Cachoeira</S.CheckboxLabel>
                      </S.CheckboxContainer>

                      <S.CheckboxContainer>
                        <Field
                          as={S.Checkbox}
                          name="interests"
                          value="trekking"
                          type="checkbox"
                        />
                        <S.CheckboxLabel>Trekking</S.CheckboxLabel>
                      </S.CheckboxContainer>
                    </S.ContainerColumn>
                  </S.CheckboxWrapper>

                  <S.Label>Foto de capa</S.Label>
                  <S.Description>
                    Escolha a foto que melhor ilustra sua viagem, ela será a
                    capa do seu roteiro.
                  </S.Description>
                  <S.FileInput
                    type="file"
                    onChange={async (e: any) =>
                      await uploadFileCallback(e.target.files[0]).then(
                        (response) => setFieldValue("cover", response)
                      )
                    }
                  />
                  {values.cover && values.cover !== "" && (
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
                          src={values.cover}
                          width={200}
                          height={200}
                          alt="cover"
                        />
                      </div>
                    </div>
                  )}
                  <S.RowContainer>
                    <S.ContainerColumn>
                      <S.Label>Dias de viagem</S.Label>
                      <Field
                        as={S.MonthInput}
                        name="days"
                        type="number"
                        min="1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="1"
                      />
                    </S.ContainerColumn>

                    <S.ContainerColumn>
                      <S.Label>Custo total por pessoa em BRL (R$)</S.Label>
                      <Field
                        as={S.MonthInput}
                        name="spent"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        placeholder="R$ 0.0"
                        step="0.01"
                        min="0"
                        value={values.spent}
                      />
                    </S.ContainerColumn>
                  </S.RowContainer>

                  <S.Label>Resumo da viagem</S.Label>
                  <S.TextArea
                    name="simple.summary"
                    value={values.simple.summary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Quais cidades você visitou? O que viu de bacana? Quais os pontos fortes e fracos? Divida suas experiências com a gente!"
                  />

                  <S.Label>Cidades visitadas</S.Label>
                  <S.Description>
                    Insira abaixo as cidades que visitou, onde ficou e qual sua
                    avaliação do local.
                  </S.Description>
                  <FieldArray
                    name="simple.cities"
                    render={(arrayHelpers) => {
                      return values.simple.cities.length > 0 ? (
                        values.simple.cities.map((city: any, index: any) => (
                          <React.Fragment key={index}>
                            <button
                              style={{ width: 200, height: 30, marginTop: 20 }}
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remover cidade abaixo:
                            </button>
                            <CityForm
                              values={values}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              city={city}
                              index={index}
                              arrayHelpers={arrayHelpers}
                              setFieldValue={setFieldValue}
                            />
                            {values.simple.cities.length === index + 1 && (
                              <button
                                style={{ width: 200, height: 30 }}
                                type="button"
                                onClick={() => arrayHelpers.push(emptyCityData)}
                              >
                                Adicionar mais cidades
                              </button>
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <button
                          style={{ width: 200, height: 30 }}
                          type="button"
                          onClick={() => arrayHelpers.push(emptyCityData)}
                        >
                          Adicionar uma cidade
                        </button>
                      );
                    }}
                  />
                  <S.Button type="submit">Salvar Roteiro</S.Button>
                </S.FormContainer>
                <FormikObserver />
              </form>
            );
          }}
        </Formik>
      </S.FormikContainer>
    </S.Container>
  );
};

export default Itinerary;
