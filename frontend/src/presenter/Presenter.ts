export interface View {
}

export class Presenter<V extends View> {
  constructor(protected view: V) {
  }
}
