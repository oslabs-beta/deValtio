export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export interface IState {
  name: string;
  value: any;
}

export type ISnapShot = IState[];

export type ISnapShotList = ISnapShot[];
