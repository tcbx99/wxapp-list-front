export interface ISeeder<T, P> {
  seedOnce(param?: P): Array<T>
  seedManyTimes(times: number): Array<T>
  seedManyTimesWith(params: Array<P>): Array<T>
}

export abstract class SeederHelper<T, P> implements ISeeder<T, P> {
  abstract seedOnce(param?: P): Array<T>
  seedManyTimes(times: number): Array<T> {
    var res: Array<T> = []
    for (var i = 0; i < times; i++) {
      res.push(...this.seedOnce())
    }
    return res
  }
  seedManyTimesWith(params: Array<P>): Array<T> {
    var res: Array<T> = []
    for (var i in params) {
      res.push(...this.seedOnce(params[i]))
    }
    return res
  }
}

export var seed = {
  seedInt(floor: number, top: number): number {
    return Math.floor(Math.random() * (top - floor) + floor)
  },
  seedBool(): boolean {
    return Math.random() > 0.5;
  },
  seedCharFrom(seed: string): string {
    return seed.charAt(this.seedInt(0, seed.length))
  },
  seedStringWithLengthFrom(len: number, seed: string): string {
    var r: string = ''
    for (var i = 0; i < len; i++) {
      r += this.seedCharFrom(seed)
    }
    return r
  }
}