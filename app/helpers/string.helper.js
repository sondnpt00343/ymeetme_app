import 'moment/locale/vi'
import moment from 'moment'

const StringHelper = {
  sub_string: (s, n, a) => {
    if (!(typeof s == 'string') || s == '') return ''

    const cut= s.indexOf(' ', n)
    if(cut== -1) return s + (a ? a : '')
    return s.substring(0, cut) + '...'
  },
  from_now: datetime => {
    return StringHelper.ucfirst(moment(datetime, 'YYYYMMDD').fromNow())
  },
  ucfirst: string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
}

export default StringHelper
