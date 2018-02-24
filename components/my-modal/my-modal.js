// components/my-modal/my-modal.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: '未命名的标题',
    },
    height: {
      type: String,
      value: '43%'
    },
    toggle: {
      type: Boolean,
      value: false
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
    handleTouchMove() {
      console.log('没有其他动作，阻止事件冒泡')
    }
  }
})

/**
 * 使用须知
 * properties:
 *  title: 标题
 *  height: 高度
 *  toggle: 开关
 */