import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker
import './CustomDatePicker.css'
import moment from 'moment'
import { AppContext } from 'src/Context/app.context'
import { useContext } from 'react'
import dayjs from 'dayjs'

function DatePickerCustomer() {
  const { timeConnect, setTimeConnect } = useContext(AppContext)
  const initialDateRange = [
    dayjs('2023-08-01 08:00:00'), // Ngày 1/8/2023, 08:00:00
    dayjs('2023-08-15 17:30:00') // Ngày 15/8/2023, 17:30:00
  ]
  const handleSelect = (e: any) => {
    if (e) {
      const formatOriginal = 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'
      const timeConvert = 'YYYY-MM-DD HH:mm:ssZZ'

      // Chuyển đổi thời gian ban đầu thành đối tượng Moment
      const moment1 = moment(e[0].$d, formatOriginal)
      const fromConnectTime = moment1.format(timeConvert)

      // Chuyển đổi thời gian ban đầu thành đối tượng Moment
      const moment2 = moment(e[1].$d, formatOriginal)
      const toConnectTime = moment2.format(timeConvert)

      setTimeConnect({ fromConnectTime, toConnectTime })
    }
  }

  return (
    <Space direction='vertical' size={14}>
      <RangePicker
        onChange={(e) => handleSelect(e)}
        value={initialDateRange}
        // showTime
        // showTime={{
        //   format: 'HH:mm:ss',
        //   defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')]
        // }}
        size='large'
        format='DD-MM-YYYY HH:mm:ss'
      />
    </Space>
  )
}

export default DatePickerCustomer
