<template>
  <table role="grid" style="width: 100%">
    <thead>
    <tr>
      <td>
        <btn block size="sm" style="border: none" @click="goPrevYear">
          <icon name="chevron-left"></icon>
        </btn>
      </td>
      <td colspan="4">
        <btn block size="sm" style="border: none" @click="changeView()">
          <b>{{year}}</b>
        </btn>
      </td>
      <td>
        <btn block size="sm" style="border: none" @click="goNextYear">
          <icon name="chevron-right"></icon>
        </btn>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, i) in rows">
      <td colspan="2" v-for="(month, j) in row" width="33.333333%">
        <btn
          block
          size="sm"
          style="border: none"
          :type="getBtnClass(i*3+j)"
          @click="changeView(i*3+j)">
          <span>{{tCell(month)}}</span>
        </btn>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import 'vue-awesome/icons/chevron-left'
  import 'vue-awesome/icons/chevron-right'
  import icon from 'vue-awesome/components/Icon'

  import Locale from '@/../node_modules/uiv/src/mixins/localeMixin'
  import Btn from '@/../node_modules/uiv/src/components/button/Btn'
  import {isExist} from '@/../node_modules/uiv/src/utils/objectUtils'

  export default {
    components: {
      Btn,
      icon
    },
    mixins: [Locale],
    props: {
      month: Number,
      year: Number,
      iconControlLeft: String,
      iconControlRight: String
    },
    data () {
      return {
        rows: []
      }
    },
    mounted () {
      for (let i = 0; i < 4; i++) {
        this.rows.push([])
        for (let j = 0; j < 3; j++) {
          this.rows[i].push(i * 3 + j + 1)
        }
      }
    },
    methods: {
      tCell (cell) {
        return this.t(`uiv.datePicker.month${cell}`)
      },
      getBtnClass (month) {
        if (month === this.month) {
          return 'primary'
        } else {
          return 'default'
        }
      },
      goPrevYear () {
        this.$emit('year-change', this.year - 1)
      },
      goNextYear () {
        this.$emit('year-change', this.year + 1)
      },
      changeView (monthIndex) {
        if (isExist(monthIndex)) {
          this.$emit('month-change', monthIndex)
          this.$emit('view-change', 'd')
        } else {
          this.$emit('view-change', 'y')
        }
      }
    }
  }
</script>
