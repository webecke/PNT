export interface View {
}

export interface NavigableView extends View {
  navigateTo: (url: string) => void;
}

export class Presenter<V extends View> {
  constructor(protected view: V) {
  }
}
