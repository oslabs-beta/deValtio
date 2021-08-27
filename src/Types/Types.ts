export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};
export interface IState {
    name: string;
    value: any;
};

export interface IApplicationState {
    state: IState[];
};
