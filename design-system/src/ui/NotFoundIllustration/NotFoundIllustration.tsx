import * as S from "./NotFoundIllustration.styled";

export function NotFoundIllustration() {
    return (
        <S.Wrapper>
            <S.Main>
                <S.Antenna>
                    <S.AntennaShadow />
                    <S.A1 />
                    <S.A1Dot />
                    <S.A2 />
                    <S.A2Dot />
                    <S.ABase />
                </S.Antenna>

                <S.TV>
                    <S.Curve>
                        <S.CurveSvg
                            xmlSpace="preserve"
                            viewBox="0 0 189.929 189.929"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                        >
                            <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13 C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
                        </S.CurveSvg>
                    </S.Curve>

                    <S.DisplayDiv>
                        <S.ScreenOut>
                            <S.ScreenOutInner>
                                <S.Screen>
                                    <S.NotFoundText>NOT FOUND</S.NotFoundText>
                                </S.Screen>
                            </S.ScreenOutInner>
                        </S.ScreenOut>
                    </S.DisplayDiv>

                    <S.Lines>
                        <S.Line1 />
                        <S.Line2 />
                        <S.Line3 />
                    </S.Lines>

                    <S.ButtonsDiv>
                        <S.B1>
                            <div />
                        </S.B1>

                        <S.B2 />

                        <S.Speakers>
                            <S.G1>
                                <S.G11 />
                                <S.G12 />
                                <S.G13 />
                            </S.G1>

                            <S.G />
                            <S.G />
                        </S.Speakers>
                    </S.ButtonsDiv>
                </S.TV>

                <S.Bottom>
                    <S.Base1 />
                    <S.Base2 />
                    <S.Base3 />
                </S.Bottom>
            </S.Main>

            <S.Text404>
                <S.Text404Digit>4</S.Text404Digit>
                <S.Text404Digit>0</S.Text404Digit>
                <S.Text404Digit>4</S.Text404Digit>
            </S.Text404>
        </S.Wrapper>
    );
}
