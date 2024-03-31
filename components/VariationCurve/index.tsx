import * as echarts from 'echarts'
import { useEffect } from 'react'

const VariationCurve = () => {
  useEffect(() => {
    var myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
      color: ['#A68EFE'],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#454459'
          }
        }
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    })
  }, [])

  return (
    <div
      id="main"
      className="h-96"
    />
  )
}

export default VariationCurve
