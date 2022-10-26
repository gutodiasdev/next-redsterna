import * as S from "./style";

const StarRating = (props: any) => {
  const { value, onClick } = props;

  return (
    <div>
      {[...Array(5)].map((star: any, i: number) => {
        return (
          <S.Star
            key={i}
            size={20}
            color={Number(value) >= i + 1 ? "#ffc107" : "#bfbfbf"}
            onClick={() => onClick(i + 1)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
