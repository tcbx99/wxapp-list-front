import { IList } from '../types'
import { SeederHelper, seed } from './seeder'

const SEED = "豫章故郡洪都新府星分翼轸地接衡庐襟三江而带五湖控蛮荆而引瓯越物华天宝龙光射牛斗之墟人杰地灵徐孺下陈蕃之榻雄州雾列俊采星驰台隍枕夷夏之交宾主尽东南之美都督阎公之雅望棨戟遥临宇文新州之懿范襜帷暂驻十旬休假胜友如云千里逢迎高朋满座腾蛟起凤孟学士之词宗紫电青霜王将军之武库家君作宰路出名区童子何知躬逢胜饯"

export class ListSeeder extends SeederHelper<IList, null> {
  id: number = 1
  seedOnce(): Array<IList> {
    var ac = seed.seedInt(30, 50)
    var pfc = seed.seedInt(0, 20)
    var fc = pfc + seed.seedInt(0, ac - pfc)
    var r: IList = {
      id: this.id++,
      name: seed.seedStringWithLengthFrom(seed.seedInt(1, 8), SEED),
      text: seed.seedStringWithLengthFrom(seed.seedInt(0, 30), SEED),
      items_info: {
        personal_finished_count: pfc,
        finished_count: fc,
        all_count: ac
      },
      is_admin: seed.seedBool()
    }
    return [r];
  }
}