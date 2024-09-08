import * as echarts from 'echarts';
import React, {
  type DOMAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as zrender from 'zrender';
import { isTest } from './Chart.utils';
import { ChartApi, ChartInitOptions, ChartProps, EChartInitOptions } from './Chart.types';
import { styled, useTheme } from '@mui/material';

// For testing purposes we render charts using the `svg` backend.
// That makes it easy to inspect chart's elements and verify correctness.
const isTestEnv = isTest();

export const testChartSize = {
  width: 400,
  height: 300,
};

const defaultInitOptions: ChartInitOptions = {
  renderer: 'canvas',
  // Setting explicit size here to prevent eCharts from logging a warning:
  // "Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
  //  They should not be 0. For example, you may need to call this in  the callback of window.onload."
  //
  // Using `minWidth` and `minHeight` on the `chartContainer` won't work for this purpose because
  // it won't affect container's `clientWidth` and `clientHeight`, because its DOM is still detached
  // at the time the chart is instantiated. Waiting to create the chart on first container resize event
  // is not really an option because it doesn't fire in Node environment:
  // https://github.com/jsdom/jsdom/issues/3368
  width: 50,
  height: 50,
};

const defaultSetOptions: echarts.SetOptionOpts = {
  replaceMerge: ['series', 'xAxis', 'yAxis'],
};

export const useChartApiRef = () => useRef<ChartApi>();

// The wrapper is configured to use the `replaceMerge` update strategy, meaning that series
// without the `id` field will be replaced on updates (which may cause visible flicker),
// and series with the `id` field will be merged with the new series config with the same ID.
const Chart = React.forwardRef<ChartApi, ChartProps>((props, ref) => {
  const uiTheme = useTheme();
  const {
    theme = uiTheme.palette.mode,
    initOptions: userInitOptions,
    className = '',
    overlay,
    setOptions,
    onResize,
    ...chartOptions
  } = props;
  const initOptions = userInitOptions || defaultInitOptions;
  const fixedWidth = userInitOptions?.width;
  const fixedHeight = userInitOptions?.height;
  const ssr = useRef(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setChartApi] = useState<ChartApi>();
  const chartApiRef = useRef<ChartApi>();
  const createChart = useCallback(() => {
    if (chartApiRef.current) {
      return chartApiRef.current;
    }
    // The chart theme and the rendering backend are only specified at instantiation time and cannot be changed on a live chart
    // after it's been created. This is the limitation of eCharts API, which we work around by reinstantiating the char
    // on `theme` and `initOptions` prop changes.
    const container = chartContainerRef.current as HTMLDivElement;
    const actualInitOptions: EChartInitOptions = isTestEnv
      ? {
          ...initOptions,
          renderer: 'svg',
          ssr: true,
          ...testChartSize,
        }
      : initOptions;
    ssr.current = Boolean(actualInitOptions?.ssr);
    const chart = echarts.init(ssr.current ? undefined : container, theme, actualInitOptions);
    chartApiRef.current = chart;
    setChartApi(chart);
    return chart;
  }, [initOptions, theme]);

  // Autosize the chart to fill the container div.
  const resizeObserver = useMemo<ResizeObserver>(() => {
    return new ResizeObserver((entries) => {
      const chart = chartApiRef.current;
      if (chart && (fixedWidth === undefined || fixedHeight === undefined)) {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          const size = { width, height };
          chart.resize(size);
          onResize?.(size);
        }
      }
    });
  }, [fixedWidth, fixedHeight, onResize]);

  useEffect(() => {
    if (fixedWidth !== undefined && fixedHeight !== undefined) {
      onResize?.({
        width: fixedWidth,
        height: fixedHeight,
      });
    }
  }, [fixedWidth, fixedHeight, onResize]);

  useImperativeHandle(ref, () => createChart(), [createChart]);

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return;

    resizeObserver.observe(chartContainer);
    const chart = createChart();

    return () => {
      resizeObserver.unobserve(chartContainer);
      chart.dispose();
      chartApiRef.current = undefined;
    };
  }, [createChart, resizeObserver]);

  let innerHTML: DOMAttributes<unknown>['dangerouslySetInnerHTML'] = undefined;

  const chart = chartApiRef.current;
  if (chart) {
    // Most Chart's props are effectively eCharts options, and we rely on eChart's internal option diffing.
    const actualChartOptions: echarts.EChartsOption = isTestEnv
      ? {
          ...chartOptions,
          /**
           * Override the default `true` value set in chart theme because in test environment we get the
           * `Cannot read properties of undefined (reading 'setAttribute')` error at line:
           * `dom.setAttribute('aria-label', ariaLabel)`
           */
          aria: {
            enabled: false,
          },
        }
      : chartOptions;

    chart.setOption(
      actualChartOptions,
      setOptions // avoid merging options unnecessarily
        ? {
            ...defaultSetOptions,
            ...setOptions,
          }
        : defaultSetOptions
    );

    const chartContainer = chartContainerRef.current;
    // `renderToSVGString` is teh way eCharts are meant to be rendered when server-side rendering is enabled:
    // https://apache.github.io/echarts-handbook/en/how-to/cross-platform/server/
    const svgString = ssr.current ? chart?.renderToSVGString() : undefined;
    if (chartContainer && svgString) {
      innerHTML = {
        __html: svgString,
      };
    }
  }

  return (
    <ChartRoot>
      <ChartContainer
        className={className}
        dangerouslySetInnerHTML={innerHTML}
        ref={chartContainerRef}
      ></ChartContainer>
      <ChartOverlay>{overlay}</ChartOverlay>
    </ChartRoot>
  );
});

Chart.displayName = 'Chart';

const ChartContainer = styled('div')(`
	width: 100%;
	height: 100%;
`);

const ChartRoot = styled('div')(`
	width: 100%;
	height: 100%;
	position: relative;
`);

const ChartOverlay = styled('div')(`
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	pointer-events: none;
	position: absolute;
`);

export { Chart, echarts, zrender };
