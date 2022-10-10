import styled from "styled-components";
import Typography from "@mui/material/Typography";

export const HiddenTitle = styled(Typography)`
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
  max-width: 300px;
`