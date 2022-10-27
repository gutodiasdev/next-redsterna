import Image from 'next/image';
import * as S from "./style";

const Footer = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.List>
          <S.ContentContainer>
            <S.Logo>
              <Image
                height={170}
                width={170}
                src="/images/desktop/footer/redsterna_logo.png"
                alt="Redsterna logo "
              />
            </S.Logo>
          </S.ContentContainer>
          <S.ContentContainer>
            <S.Link>Termos de Uso</S.Link>
            <S.Link>Política de Privacidade</S.Link>
            <S.Link>Fale conosco</S.Link>
          </S.ContentContainer>
          <S.ContentContainer>
            <S.MediaContainer>
              <S.SocialLogo href="https://www.facebook.com/malasprontasviagens">
                <Image
                  height={70}
                  width={70}
                  src="/images/desktop/footer/facebook_logo.png"
                  alt="Redsterna logo "
                />
              </S.SocialLogo>
              <S.SocialLogo href="https://www.instagram.com/redsternaoficial/">
                <Image
                  height={70}
                  width={70}
                  src="/images/desktop/footer/instagram_logo.png"
                  alt="Redsterna logo "
                />
              </S.SocialLogo>
            </S.MediaContainer>
            <S.CopyContainer>
              <S.Copyright>© 2019-2021 Redsterna </S.Copyright>
            </S.CopyContainer>
          </S.ContentContainer>
        </S.List>
      </S.Container>
      <S.DesignCopyright>
        Design by Necta
        <Image
          height={12}
          width={12}
          src="/images/desktop/footer/necta_logo.png"
          alt="Redsterna logo "
        />
      </S.DesignCopyright>
    </S.Wrapper>
  );
};

export default Footer;
