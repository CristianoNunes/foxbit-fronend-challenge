import * as S from "./style";

interface ListCardProps {
  children: JSX.Element[];
}

export default function ListCard({ children }: ListCardProps) {
  return <S.Wrapper>{children}</S.Wrapper>;
}
