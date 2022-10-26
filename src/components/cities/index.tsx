import React, { useEffect, useState } from "react";
import axios from "axios";
import { FieldArray } from "formik";

import { useItineraries } from "../../contexts/itinerary.context";

import * as S from "./style";
import StarRating from "../starRating";
import Image from 'next/image';

const CityForm = (props: any) => {
  const { index, handleChange, handleBlur, values, setFieldValue }: any = props;
  const { uploadFile } = useItineraries();

  const [cityName, setCityName] = useState<any>(
    values.simple.cities[index].name || ""
  );
  const [listOptions, setListOptions] = useState<any>([]);

  useEffect(() => {
    async function changeOptions () {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?language=pt&access_token=pk.eyJ1IjoidGhhaXNhcmVtIiwiYSI6ImNrNWU3cTZwcjI0Y3IzbnFodjY5aWJsdnYifQ.SPYT3Yxdc-H3F0U_XRwzJw`
      );

      if (
        cityName !== values.simple.cities[index].name &&
        response.data.features.length > 0
      ) {
        setListOptions(response.data.features);
      }
      if (
        cityName === "" ||
        (cityName !== values.simple.cities[index].name &&
          response.data.features.length <= 0)
      ) {
        setListOptions([]);
        setFieldValue(`simple.cities.${index}.name`, "");
        setFieldValue(`simple.cities.${index}.coordinates.latitude`, 0);
        setFieldValue(`simple.cities.${index}.coordinates.longitude`, 0);
      }
    }
    changeOptions();
  }, [cityName, setFieldValue, index, values.simple.cities]);

  const uploadFileCallback = async (file: any) => {
    const response = await uploadFile(file);

    const image = response.replace(" ", "%20");

    setFieldValue(`simple.cities.${index}.images`, [
      ...values.simple.cities[index].images,
      image,
    ]);
  };

  return (
    <S.Container>
      <S.FormContainer>
        <S.Label>Cidade</S.Label>
        <S.Input
          name={`simple.cities.${index}.name`}
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Orlando"
        />
        {listOptions.filter((item: any) =>
          item.place_name_pt.toLowerCase().includes(cityName.toLowerCase())
        ).length > 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "auto",
              }}
            >
              {listOptions
                .filter((item: any) =>
                  item.place_name_pt
                    .toLowerCase()
                    .includes(cityName.toLowerCase())
                )
                .map((item: any, optionIndex: any) => (
                  <button
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      height: 40,
                      border: "0.1px solid black",
                      width: "100%",
                    }}
                    key={optionIndex}
                    onClick={() => {
                      setCityName(item.place_name_pt);
                      setFieldValue(
                        `simple.cities.${index}.name`,
                        item.place_name_pt
                      );
                      setFieldValue(
                        `simple.cities.${index}.coordinates.latitude`,
                        item.geometry.coordinates[1]
                      );
                      setFieldValue(
                        `simple.cities.${index}.coordinates.longitude`,
                        item.geometry.coordinates[0]
                      );
                      setListOptions([]);
                    }}
                  >
                    <p>{item.place_name_pt}</p>
                  </button>
                ))}
            </div>
          )}
        <S.Label>
          Avaliação
          <StarRating
            value={Number(values.simple.cities[index].rate)}
            onClick={(value: number) => {
              setFieldValue(`simple.cities.${index}.rate`, Number(value));
            }}
            name={`simple.cities.${index}.rate`}
          />
        </S.Label>
        {values.simple.cities[index].accommodations && (
          <FieldArray
            name={`simple.cities.${index}.accommodations`}
            render={(arrayHelpers) => {
              return values.simple.cities[index].accommodations.length > 0 ? (
                values.simple.cities[index].accommodations.map(
                  (accommodation: { name: string; rate: 1; }, indexAcc: any) => (
                    <React.Fragment key={indexAcc}>
                      <button
                        style={{ width: 250, marginTop: 10 }}
                        type="button"
                        onClick={() => arrayHelpers.remove(indexAcc)}
                      >
                        Remover hospedagem:
                      </button>
                      <S.Label>Hospedagem</S.Label>
                      <div
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <S.Input
                          name={`simple.cities.${index}.accommodations.${indexAcc}.name`}
                          value={
                            values.simple.cities[index].accommodations[indexAcc]
                              .name
                          }
                          onChange={handleChange}
                          placeholder="Orlando Hotel"
                        />
                        <S.Label>Avaliação</S.Label>
                        <StarRating
                          value={Number(
                            values.simple.cities[index].accommodations[indexAcc]
                              .rate
                          )}
                          onClick={(value: number) => {
                            setFieldValue(
                              `simple.cities.${index}.accommodations.${indexAcc}.rate`,
                              value
                            );
                          }}
                          name={`simple.cities.${index}.accommodations.${indexAcc}.rate`}
                        />
                      </div>
                      {values.simple.cities[index].accommodations.length ===
                        indexAcc + 1 && (
                          <button
                            style={{ width: 250 }}
                            type="button"
                            onClick={() =>
                              arrayHelpers.insert(indexAcc + 1, {
                                name: "",
                                rate: 0,
                              })
                            }
                          >
                            Adicionar hospedagem
                          </button>
                        )}
                    </React.Fragment>
                  )
                )
              ) : (
                <button
                  style={{ width: 250, height: 20 }}
                  type="button"
                  onClick={() => arrayHelpers.push({ name: "", rate: 0 })}
                >
                  Adicionar uma hospedagem
                </button>
              );
            }}
          />
        )}
        <S.Label>Descrever destino</S.Label>
        <S.Description>
          Caso queira descrever como foi sua estada nessa cidade, preencha o
          campo abaixo.
        </S.Description>
        <S.TextArea
          onChange={handleChange}
          onBlur={handleBlur}
          name={`simple.cities.${index}.description`}
          value={values.simple.cities[index].description}
          placeholder="Orlando é uma cidade muito turística e cheia de opções de lazer, compras e entretenimento. Nos 3 primeiros dias de minha viagem, pude..."
        />
        {values.simple.cities[index].images && (
          <FieldArray
            name={`simple.cities.${index}.images`}
            render={(arrayHelpers) => (
              <>
                <S.FileInput
                  accept="image/*"
                  type="file"
                  onChange={(e: any) => uploadFileCallback(e.target.files[0])}
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  {values.simple.cities[index].images.length > 0 &&
                    values.simple.cities[index].images.map(
                      (img: any, indexImg: any) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginTop: 10,
                          }}
                          key={img}
                        >
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(indexImg)}
                          >
                            X
                          </button>
                          <Image src={img} width={200} height={200} alt="cover" />
                        </div>
                      )
                    )}
                </div>
              </>
            )}
          />
        )}
      </S.FormContainer>
    </S.Container>
  );
};

export default CityForm;
