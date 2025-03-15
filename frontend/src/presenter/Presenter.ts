export interface View {
  navigateTo: (url: string) => void;
}

export class Presenter<V extends View> {
  constructor(protected view: V) {
  }
}
