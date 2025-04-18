export type StudyroomItemClickHandler<T extends HTMLElement> = (
  e: React.MouseEvent<T>,
  id: string
) => void;

export type StudyroomItemButtonHandler = StudyroomItemClickHandler<HTMLButtonElement>;
export type StudyroomItemGenericHandler = StudyroomItemClickHandler<HTMLElement>;
