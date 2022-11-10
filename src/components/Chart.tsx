import CanvasJSReact from '../assets/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props: { options: any; }) => {
  return (
    <CanvasJSChart
      options={props.options}
      containerProps={{ width: '75%', height: '20vw', marginTop: '2%' }}
    />
  );
};

export default Chart;