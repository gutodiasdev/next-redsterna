import * as S from "./style";

import Modal from "react-modal";

const DeleteItinerary = (props: any) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "550px",
      height: "420px",
      borderRadius: "15px",
    },
  };

  // async function setDeleteAccount(id: string) {
  //   try {
  //     await api.delete(`/itineraries?id=${id}`);

  //     toast.success("Roteiro excluído com sucesso!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });

  //     setTimeout(() => window.location.reload(), 3500);
  //   } catch {
  //     toast.error("Não foi possível remover esse roteiro", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  // }

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <S.Wrapper>
          <S.Container>
            <S.TitleContainer>
              <S.Title>Excluir roteiro</S.Title>
              <S.Description>
                Tem certeza que quer excluir seu roteiro? Essa alteração nao
                poderá ser desfeita.
              </S.Description>
            </S.TitleContainer>
            <S.ColumnContainer>
              {/* <S.RowContainer>
                <S.RowLabel>Título da viagem</S.RowLabel>
                {`${props.itinerary?.title || ""}`}
              </S.RowContainer>
              <S.RowContainer>
                <S.RowLabel>Dias de viagem</S.RowLabel>
                {`${props.itinerary?.days || "0"} `}
              </S.RowContainer>
              <S.RowContainer>
                <S.RowLabel>Custo total por pessoa</S.RowLabel>
                {`${props.itinerary?.spent || "0.00"}`}
              </S.RowContainer>
              <S.SummaryContainer>
                <S.RowLabel>Resumo da viagem</S.RowLabel>
                {`${props.itinerary.simpĺe?.summary ||
                  "Poxa! Nenhum roteiro adicionado :c"
                  }`}
              </S.SummaryContainer> */}
            </S.ColumnContainer>

            <S.RowContainer>
              <S.CancelButton onClick={props.closeModal}>
                Cancelar
              </S.CancelButton>
              <S.DeleteButton
                onClick={() => {
                  // setDeleteAccount(props.itinerary._id);
                }}
              >
                Excluir
              </S.DeleteButton>
            </S.RowContainer>
          </S.Container>
        </S.Wrapper>
      </Modal>
    </div>
  );
};

export default DeleteItinerary;
