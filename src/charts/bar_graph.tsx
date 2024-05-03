import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { useEffect, useMemo, useRef } from 'react';

type ChartProps = {
  data: ChartData;
  loading: boolean;
  className?: any;
};

type ChartData = {
  name: string;
  data: Array<number>;
};
export const BarGraph = ({ data, loading, className }: ChartProps) => {
  const chartRef = useRef(null);
  const getOptions = (series: ChartData) => {
    return {
      chart: {
        type: 'column',
      },
      colors: ['#0080A7'],
      title: {
        text: 'Potential Profit Impact',
        align: 'left',
        style: {
          fontSize: '1.25em',
        },
      },
      subtitle: {
        text: 'Estimated impact of AI on four dimensions of profitability. Please see documentation for full definitions of Automation Risk Avoidance, Productivity, Incremental Innovation, and Company Specific Impact',
        align: 'left',
        style: {
          fontSize: '1rem',
        },
      },
      xAxis: {
        categories: [
          'Automation Risk Avoidance',
          'Labor Productivity',
          'Incremental Innovation',
          'Company Specific Impact',
        ],
        crosshair: true,
        accessibility: {
          description: 'Categories',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Profit ($ Millions)',
        },
      },
      tooltip: {
        valuePrefix: '$',
        valueSuffix: ' Million',
      },
      plotOptions: {
        column: {
          pointPadding: 0.01,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: series,
    };
  };

  const options = useMemo(() => {
    return getOptions(data);
  }, [data]);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.redraw();
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current?.chart) {
      if (loading) {
        chartRef.current.chart.showLoading('Loading...');
      } else {
        chartRef.current.chart.hideLoading();
      }
    }
  }, [loading, chartRef.current]);

  return (
    <div className={className}>
      <HighchartsReact
        containerProps={{ style: { display: 'flex' } }}
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};
