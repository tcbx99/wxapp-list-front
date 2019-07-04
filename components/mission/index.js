// components/mission-box/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    naviid: String,
    name: String,
    desc: String,
    admin: {
      type: Boolean,
      value: false
    },
    isChecked: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(e) {
      console.log(this.data)
      this.triggerEvent ('change',{
        checked: this.data.isChecked
      },{})
    }
  }
})